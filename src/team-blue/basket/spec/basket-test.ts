import {BlueBasket} from "../basket";
import {IComponentTest} from "../../../Test/IComponentTest";
import {TestUtils} from "../../../test-utils";

export class BasketTest implements IComponentTest {

    private basketCount: any = 0;
    private numberOfClicks: any = 0;

    private static clickOnAddToCartNumberOfTimes(numberOfClicks: any) {
        for (let clickCount = 1; clickCount <= numberOfClicks; clickCount++) {
            const eventProperties = {bubbles: true, detail: { text: clickCount}, composed: true};
            const event = new CustomEvent("blue:basket:changed", eventProperties);
            window.dispatchEvent(event);
        }
    }

    public async act() {
        const { shadowRoot }: any  = await TestUtils.render(BlueBasket.tag);
        const div = shadowRoot.querySelector( "div > div" );
        this.basketCount = Number(div.innerText.replace(/[^0-9]/g, ""));

    }

    public async arrange() {
        this.numberOfClicks = 3;
        BasketTest.clickOnAddToCartNumberOfTimes(this.numberOfClicks);
    }

    public assert = async () => {
        expect(this.basketCount).toEqual(this.numberOfClicks);
    }
}
