import {IComponentTest} from "../../../Test/IComponentTest";
import {RenderModel} from "../../../testTool/render-model";
import {TestUtils} from "../../../testTool/test-utils";
import {BlueBasket} from "../cpgmni-blue-basket";
/**
 * @event=blue:basket:changed
 * @type=input
 * @dataObject={text:int}
 */
export class CpgmniBlueBasketTest implements IComponentTest {

    private basketCount: any = 0;
    private numberOfButtonClicks: any = 1;
    private sku: any = 't_eicher';

    public async setUp() {
        let basketModel = new RenderModel(BlueBasket.tag, {});
        await TestUtils.addRender(basketModel);
    }

    public async act() {
        const basket:any = await TestUtils.getComponent(BlueBasket.tag);
        const div = await basket.shadowRoot.querySelector( "#items" ).innerHTML;
        this.basketCount = await Number(div.replace(/[^0-9]/g, ""));
    }

    public async arrange() {
        const eventProperties = {bubbles: true, detail:
                                {count: this.numberOfButtonClicks, sku: this.sku}
                                ,composed: true};
        const event = new CustomEvent("blue:basket:changed", eventProperties);
        document.dispatchEvent(event);
    }

    public assert = async () => {
        expect(this.basketCount).toEqual(this.numberOfButtonClicks);
    };
}
