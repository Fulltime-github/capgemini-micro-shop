import {TestUtils} from "../../../test-utils";
import {IComponentTest} from "../../../Test/IComponentTest";
import {BlueBasket} from "../cpgmni-blue-basket";

/**
 * @event=blue:basket:changed
 * @type=input
 * @dataObject={text:int}
 */
export class CpgmniBlueBasketTest implements IComponentTest {

    private basketCount: any = 0;
    private numberOfClicks: any = 3;
    private shadowRoot: any;

    public async act() {
        const div = await this.shadowRoot.querySelector( "#items" );
        this.basketCount = Number(div.innerText.replace(/[^0-9]/g, ""));
    }

    public async arrange() {
        const { shadowRoot }: any = await TestUtils.render(BlueBasket.tag);
        this.shadowRoot = shadowRoot;
        this.clickOnAddToCartNumberOfTimes();
    }

    public assert = async () => {
        expect(this.basketCount).toEqual(this.numberOfClicks);
    }

    private clickOnAddToCartNumberOfTimes() {
        for (let clickCount: number = 1; clickCount <= this.numberOfClicks; clickCount++) {
            const eventProperties = {bubbles: true, detail: { text: clickCount}, composed: true};
            const event = new CustomEvent("blue:basket:changed", eventProperties);
            document.dispatchEvent(event);
        }
    }
}
