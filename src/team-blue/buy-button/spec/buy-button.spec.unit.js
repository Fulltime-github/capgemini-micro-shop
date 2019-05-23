import { BlueBuy } from "../buy-button.js";
import { TestUtils } from "../../../test-utils.js";

describe("Buy Button Component", () => {
  it("clicking buy button fires event", async () => {

    // ARRANGE - MOCK
    const { shadowRoot } = await TestUtils.render(BlueBuy.tag);
    var spy = jasmine.createSpy();
    window.addEventListener("blue:basket:changed", spy);

    //ACT
    var numberOfClicks = 3;
    var buyButton = shadowRoot.querySelector("button")
    for(var clickCount = 1; clickCount <= numberOfClicks; clickCount++) {
      buyButton.click();
    }

    //ASSERT
    expect(spy.calls.count()).toEqual(numberOfClicks);
  });

  function clickOnAddToCartNumberOfTimes(numberOfClicks) {
    for(var clickCount = 1; clickCount <= numberOfClicks; clickCount++) {
      var eventProperties = {bubbles: true, detail: { text: clickCount}, composed: true};
      var event = new CustomEvent('blue:basket:changed', eventProperties);
      window.dispatchEvent(event);
    }
  }
});
