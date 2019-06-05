import {TestUtils} from "../../../test-utils";
import {BlueBuy} from "../buy-button";
import {BuyButtonTest} from "./buy-button-test";

describe("Buy Button Component", () => {
  it("clicking buy button fires event", async () => {

    const buyButtonTest = new BuyButtonTest();
    // ARRANGE - MOCK
    await buyButtonTest.arrange();

    // ACT
    await buyButtonTest.act();

    // ASSERT
    await buyButtonTest.assert();
  });
});
