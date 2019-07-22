import Spy = jasmine.Spy;
import {RenderModel} from "../../../testTool/render-model";
import {TestUtils} from "../../../testTool/test-utils";
import {BlueBuy} from "../cpgmni-blue-buy-button";

describe("Buy-Button Event Test", () => {

    beforeEach(async () => {
        const buyButtonModel = new RenderModel(BlueBuy.tag, {sku: "t_eicher"});
        await TestUtils.render(buyButtonModel);
    });

    afterEach(async () => {
        TestUtils.close();
    });

    it("clicking buy button fires event", async () => {

        // ARRANGE - MOCK
        const spy: Spy = jasmine.createSpy();
        document.addEventListener("blue:basket:changed", spy);

        // ACT
        const buyButton: any = await TestUtils.getComponent(BlueBuy.tag);
        const buyButtonButton = buyButton.shadowRoot.querySelector("button");
        buyButtonButton.click();

        // ASSERT
        expect(spy.calls.count()).toEqual(1);
    });
});
