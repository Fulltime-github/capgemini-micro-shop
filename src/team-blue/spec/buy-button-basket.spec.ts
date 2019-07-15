import {CpgmniBlueBasketTest} from "../basket/spec/cpgmni-blue-basket-test";
import {CpgmniBlueBuyButtonTest} from "../buy-button/spec/cpgmni-blue-buy-button-test";

describe("Basket Component", () => {
    it("Integrationtest Button - Basket ", async () => {
        const basketTest = new CpgmniBlueBasketTest();
        const buyButtonTest = new CpgmniBlueBuyButtonTest();
        await basketTest.setUp();
        await buyButtonTest.setUp();
        return buyButtonTest.act().then(() => {
            return basketTest.act().then(() => {
               return basketTest.assert();
            });
        });
    });
});
