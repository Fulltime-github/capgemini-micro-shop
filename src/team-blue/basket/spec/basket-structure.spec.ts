import {CpgmniBlueBasketEventTest} from "./cpgmni-blue-basket-event-test";

describe("Basket Component", () => {
    const basketEventTest: CpgmniBlueBasketEventTest  = new CpgmniBlueBasketEventTest();

    beforeEach(async () => {
        await basketEventTest.setup();
    });

    afterEach(() => {
        basketEventTest.teardown();
    });

    it("clicking buy button add Elements to Basket", async () => {

        // ARRANGE - MOCK
        await basketEventTest.arrange();

        // ACT
        await basketEventTest.act();

        // ASSERT
        await basketEventTest.assert();
    });
});
