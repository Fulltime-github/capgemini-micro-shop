/* eslint-disable no-use-before-define, no-console, class-methods-use-this */
/* globals HTMLElement, window, CustomEvent */

  export class BlueBuy extends HTMLElement {

    static get tag() {
        return "cpgmni-blue-buy";
    }
    static get observedAttributes() {
      return ["sku"];
    }
    static log(...args) {
      console.log("🔘 blue-buy", ...args);
    }
    prices = {
      t_porsche: "66,00 €",
      t_fendt: "54,00 €",
      t_eicher: "58,00 €",
    };

    state = {
      count: 0,
    };

    shadowRoot = this.attachShadow({mode: "open"});
    constructor() {
      super(); // always call super() first in the constructor.
    }
    connectedCallback() {
      this.addToCart = this.addToCart.bind(this);
      const sku = this.getAttribute("sku");
      BlueBuy.log("connected", sku);
      this.render();
      const button = this.shadowRoot.getElementById("buy");
      button.addEventListener("click", this.addToCart);
    }
    addToCart() {
      BlueBuy.log('event sent "blue:basket:changed"');
      this.state.count += 1;
      const eventProperties = {bubbles: true, detail: { text: this.state.count}, composed: true};
      const event = new CustomEvent("blue:basket:changed", eventProperties);
      window.dispatchEvent(event);
    }
    render() {
      const sku = this.getAttribute("sku");
      const price = this.prices[sku];
      this.shadowRoot.innerHTML = ` <link rel="stylesheet" href="team-blue/buy-button/buy-button.css"><button id="buy" type="button">buy for ${price}</button>`;
    }
    attributeChangedCallback(attr, oldValue, newValue) {
      BlueBuy.log("attributeChanged", attr, oldValue, newValue);
      this.render();
    }
    disconnectedCallback() {
      const button = this.shadowRoot.getElementById("buy");
      button.removeEventListener("click", this.addToCart);
      const sku = this.getAttribute("sku");
      BlueBuy.log("disconnected", sku);
    }
  }

  window.customElements.define(BlueBuy.tag, BlueBuy);
