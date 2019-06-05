import {BlueBuy} from "../buy-button";
import {IComponentTest} from "../../../Test/IComponentTest";
import Spy = jasmine.Spy;
import {TestUtils} from "../../../test-utils";

export class BuyButtonTest implements IComponentTest {

    public numberOfClicks = 3;
    public spy: Spy = jasmine.createSpy();

    public async act() {
        const { shadowRoot }: any = await TestUtils.render(BlueBuy.tag);
        const buyButton = shadowRoot.querySelector("button");
        for (let clickCount = 1; clickCount <= this.numberOfClicks; clickCount++) {
            buyButton.click();
        }
    }

    public async arrange() {
        window.addEventListener("blue:basket:changed", this.spy);
    }

    public assert = async () => {
        expect(this.spy.calls.count()).toEqual(this.numberOfClicks);
    }
}
