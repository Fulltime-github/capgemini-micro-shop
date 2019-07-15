import {TestUtils} from "../../../testTool/test-utils";
import {RenderModel} from "../../../testTool/render-model";
import {BlueBasket} from "../cpgmni-blue-basket";

describe("Basket Component", () => {

    const numberOfClicks: any = 1;
    const sku: any = 't_eicher';

    beforeEach(async () => {
        await TestUtils.render(new RenderModel(BlueBasket.tag, {}));
    });

    afterEach(() => {
        TestUtils.close();
    });

    it("clicking buy button add Elements to Basket", async () => {

        // ARRANGE - MOCK
        const eventProperties = {bubbles: true, detail: { count: numberOfClicks, sku: sku}, composed: true};
        const event = new CustomEvent("blue:basket:changed", eventProperties);
        await document.dispatchEvent(event);

        // ACT
        const basket:any = await TestUtils.getComponent(BlueBasket.tag);
        const div = await basket.shadowRoot.querySelector("#items").innerHTML;
        const basketCount = await Number(div.replace(/[^0-9]/g, ""));

        // ASSERT
        expect(basketCount).toEqual(numberOfClicks);
    });
});
