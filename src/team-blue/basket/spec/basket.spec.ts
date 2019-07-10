import {CpgmniBlueBasketTest} from "./cpgmni-blue-basket-test";

describe("Basket Component", () => {
  it("clicking buy button add Elements to Basket", async () => {
     const basketTest = new CpgmniBlueBasketTest();
      // ARRANGE - SETUP
     await basketTest.setUp();
      // ARRANGE - MOCK
     basketTest.arrange().then(() => {
         // ACT
         basketTest.act().then(() => {
             // ASSERT
             basketTest.assert();
         });
     });
  }) ;
});
