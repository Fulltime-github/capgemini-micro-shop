import Spy = jasmine.Spy;
import {TestUtils} from "../../../test-utils";
import {IComponentTest} from "../../../Test/IComponentTest";
import {BlueBuy} from "../cpgmni-blue-buy-button";
/**
 * @event=blue:basket:changed
 * @type=output
 * @dataObject={text:int}
 */
export class CpgmniBlueBuyButtonTest implements IComponentTest {

    public numberOfClicks = 3;
    public spy: Spy = jasmine.createSpy();

    public async act() {
        const { shadowRoot }: any = await TestUtils.render(BlueBuy.tag, {sku: "t_eicher"});
        const buyButton = shadowRoot.querySelector("button");
        for (let clickCount = 1; clickCount <= this.numberOfClicks; clickCount++) {
            buyButton.click();
        }
    }

    public async arrange() {
        document.addEventListener("blue:basket:changed", this.spy);
    }

    public assert = async () => {
        expect(this.spy.calls.count()).toEqual(this.numberOfClicks);
    }
}
