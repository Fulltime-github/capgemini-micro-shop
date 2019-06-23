import {CpgmniBlueBuyButtonTest} from "./cpgmni-blue-buy-button-test";

describe("Buy Button Component", () => {

  it("clicking buy button fires event", async () => {

    const buyButtonTest = new CpgmniBlueBuyButtonTest();
    // ARRANGE - MOCK
    await buyButtonTest.arrange();

    // ACT
    await buyButtonTest.act();

    // ASSERT
    await buyButtonTest.assert();
  });
});
