import { BlueBuy } from "../buy-button.js";
import { TestUtils } from "../../../test-utils.js";

describe("Buy Button Component", () => {

  it("clicking buy button fires event", async () => {
    const { shadowRoot } = await TestUtils.render(BlueBuy.tag);
    var o = { countFunc(){} };
    spyOn(o, "countFunc"); //.and.callThrough();
    window.addEventListener("blue:basket:changed", o.countFunc);
    shadowRoot.querySelector("button").click();
    shadowRoot.querySelector("button").click();
    expect(o.countFunc).toHaveBeenCalledTimes(2);

  });

});
