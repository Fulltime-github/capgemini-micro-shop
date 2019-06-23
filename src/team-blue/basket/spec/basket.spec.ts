import {CpgmniBlueBasketTest} from "./cpgmni-blue-basket-test";

describe("Basket Component", () => {
  it("clicking buy button add Elements to Basket", async () => {
     const basketTest = new CpgmniBlueBasketTest();
    // ARRANGE - MOCK
     await basketTest.arrange();
    // ACT
     await basketTest.act();
    // ASSERT
     await basketTest.assert();
  }) ;
});
