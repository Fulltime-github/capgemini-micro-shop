import {CpgmniBlueBasketEventTest} from "../basket/spec/cpgmni-blue-basket-event-test";
import {CpgmniBlueBuyButtonEventTest} from "../buy-button/spec/cpgmni-blue-buy-button-event-test";

describe("Basket Component", () => {
    it("Integrationtest Button - Basket ", async () => {
        const basketTest = new CpgmniBlueBasketEventTest();
        const buyButtonTest = new CpgmniBlueBuyButtonEventTest();
        await basketTest.setup();
        await buyButtonTest.setup();
        return buyButtonTest.act().then(() => {
            return basketTest.act().then(() => {
               return basketTest.assert();
            });
        });
    });
});
