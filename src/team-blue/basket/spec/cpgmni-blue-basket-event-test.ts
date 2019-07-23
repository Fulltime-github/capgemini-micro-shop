import {IComponentTest} from "../../../Test/IComponentTest";
import {RenderModel} from "../../../testTool/render-model";
import {TestUtils} from "../../../testTool/test-utils";
import {BlueBasket} from "../cpgmni-blue-basket";
/**
 * @event=blue:basket:changed
 * @type=input
 * @dataObject={text:int}
 */
export class CpgmniBlueBasketEventTest implements IComponentTest {

    private basketCount: any = 0;
    private numberOfButtonClicks: any = 1;
    private sku: any = "t_eicher";
    private basket: any;

    public async setup() {
        const basketModel = new RenderModel(BlueBasket.tag, {});
        await TestUtils.addRender(basketModel);
    }

    public async act() {
    }

    public async arrange() {
        this.basket = await TestUtils.getComponent(BlueBasket.tag);
        const eventProperties = {bubbles: true, detail:
                {sku: "t_eicher", priceDetail: {price: 57.99, currency: "EUR"}}
            , composed: true};
        const event = new CustomEvent("blue:basket:changed", eventProperties);
        document.dispatchEvent(event);
    }

    public assert = async () => {
        const basket: any = await TestUtils.getComponent(BlueBasket.tag);
        const div = await basket.shadowRoot.querySelector( "#items" ).innerHTML;
        this.basketCount = await Number(div.replace(/[^0-9]/g, ""));

        expect(this.basketCount).toEqual(this.numberOfButtonClicks);
    }

    public teardown() {
        TestUtils.close();
    }
}
