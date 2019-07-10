import Spy = jasmine.Spy;
import {IComponentTest} from "../../../Test/IComponentTest";
import {RenderModel} from "../../../testTool/render-model";
import {TestUtils} from "../../../testTool/test-utils";
import {BlueBuy} from "../cpgmni-blue-buy-button";
/**
 * @event=blue:basket:changed
 * @type=output
 * @dataObject={text:int}
 */
export class CpgmniBlueBuyButtonTest implements IComponentTest {

    public spy: Spy = jasmine.createSpy();
    private shadowRoot: any;

    public async setUp() {
        const { shadowRoot }: any = await TestUtils.render(new RenderModel(BlueBuy.tag, {sku: "t_eicher"}));
        this.shadowRoot = shadowRoot;
    }

    public async act() {
        const buyButton = this.shadowRoot.querySelector("button");
        buyButton.click();
    }

    public async arrange() {
        document.addEventListener("blue:basket:changed", this.spy);
    }

    public assert = async () => {
        expect(this.spy.calls.count()).toEqual(1);
    }
}
