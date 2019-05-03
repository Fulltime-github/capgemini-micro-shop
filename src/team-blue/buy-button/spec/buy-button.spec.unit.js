import { BlueBuy } from "../buy-button.js";
import { TestUtils } from "../../../test-utils.js";

describe("Buy Button Component", () => {
  it("clicking buy button fires event", async () => {
    const { shadowRoot } = await TestUtils.render(BlueBuy.tag);
    var spy = jasmine.createSpy();
    window.addEventListener("blue:basket:changed", spy);
    shadowRoot.querySelector("button").click();
    shadowRoot.querySelector("button").click();
    expect(spy.calls.count()).toEqual(2);
  });
});
