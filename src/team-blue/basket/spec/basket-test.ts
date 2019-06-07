import {BlueBasket} from "../basket";
import {IComponentTest} from "../../../Test/IComponentTest";
import {TestUtils} from "../../../test-utils";

export class BasketTest implements IComponentTest {

    private basketCount: any = 0;
    private numberOfClicks: any = 3;
    private shadowRoot: any;

    private clickOnAddToCartNumberOfTimes() {
        for (let clickCount = 1; clickCount <= this.numberOfClicks; clickCount++) {
            const eventProperties = {bubbles: true, detail: { text: clickCount}, composed: true};
            const event = new CustomEvent("blue:basket:changed", eventProperties);
            document.dispatchEvent(event);
        }
    }

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
}
