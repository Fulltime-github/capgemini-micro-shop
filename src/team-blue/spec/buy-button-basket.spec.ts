import {CpgmniBlueBasketTest} from "../basket/spec/cpgmni-blue-basket-test";
import {CpgmniBlueBuyButtonTest} from "../buy-button/spec/cpgmni-blue-buy-button-test";

describe("Basket Component", () => {
    it("Integrationtest Button - Basket ", async () => {
        const basketTest = new CpgmniBlueBasketTest();
        const buyButtonTest = new CpgmniBlueBuyButtonTest();
        await basketTest.setUp();
        await buyButtonTest.setUp();
        await buyButtonTest.arrange();
        buyButtonTest.act().then(() => {
            basketTest.act().then(() => {
                basketTest.assert();
            });
        });
    });
});
