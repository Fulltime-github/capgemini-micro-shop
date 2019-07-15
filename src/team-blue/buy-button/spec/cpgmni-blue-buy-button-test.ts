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

    public async setUp() {
        let buyButtonModel = new RenderModel(BlueBuy.tag, {sku: "t_eicher"});
        await TestUtils.addRender(buyButtonModel);
    }

    public async act() {
        const buyButton:any = await TestUtils.getComponent(BlueBuy.tag);
        const buyButtonButton = buyButton.shadowRoot.querySelector( "button" );
        await buyButtonButton.click();
    }

    public async arrange() {
        document.addEventListener("blue:basket:changed", this.spy);
    }

    public assert = async () => {
        expect(this.spy.calls.count()).toEqual(1);
    }
}
