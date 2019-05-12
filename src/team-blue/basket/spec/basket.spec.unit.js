import { BlueBasket } from "../basket.js";
import { TestUtils } from "../../../test-utils.js";

describe("Basket Component", () => {
  it("clicking buy button add Elements to Basket", async () => {
    var numberOfClicks = 3;
    console.log(BlueBasket.tag);
    const { shadowRoot } = await TestUtils.render(BlueBasket.tag);
    clickOnAddToCartNumberOfTimes(numberOfClicks);
    var div = shadowRoot.querySelector("div > div");
    var basketCount = Number(div.innerText.replace(/[^0-9]/g,''));
    expect(basketCount).toEqual(numberOfClicks);
  });

  function clickOnAddToCartNumberOfTimes(numberOfClicks) {
    for(var clickCount = 1; clickCount <= numberOfClicks; clickCount++) {
      var eventProperties = {bubbles: true, detail: { text: clickCount}, composed: true};
      var event = new CustomEvent('blue:basket:changed', eventProperties);
      window.dispatchEvent(event);
    }
  }
});
