import {TestUtils} from "../../testTool/test-utils";
import {RenderModel} from "../../testTool/render-model";
import {BlueBuy} from "../buy-button/cpgmni-blue-buy-button";
import {BlueBasket} from "../basket/cpgmni-blue-basket";

describe("Integration Test Button - Basket", () => {

    beforeEach(async () => {
        let buyButtonModel = new RenderModel(BlueBuy.tag, {sku: "t_eicher"});
        let basketModel = new RenderModel(BlueBasket.tag, {});

        await TestUtils.addRender(buyButtonModel);
        await TestUtils.addRender(basketModel);
    });

    afterEach(async () => {
        TestUtils.close();
    });

    it("Integration Test Button - Basket Kommunikation ", async () => {

        //ACT BUY-BUTTON
        const buyButton:any = await TestUtils.getComponent(BlueBuy.tag);
        const buyButtonButton = buyButton.shadowRoot.querySelector( "button" );
        await buyButtonButton.click();

        // ACT BASKET
        const basket:any = await TestUtils.getComponent(BlueBasket.tag);
        const div = await basket.shadowRoot.querySelector( "#items" ).innerHTML;
        const basketCount:number = await Number(div.replace(/[^0-9]/g, ""));

        // ASSERT BASKET
        expect(basketCount).toEqual(1);
    });
});
