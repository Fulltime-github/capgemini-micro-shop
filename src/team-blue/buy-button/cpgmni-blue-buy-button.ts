/* eslint-disable no-use-before-define, no-console, class-methods-use-this */
/* globals HTMLElement, window, CustomEvent */
  export class BlueBuy extends HTMLElement {

    static get tag() {
        return "cpgmni-blue-buy-button";
    }
    static get observedAttributes() {
      return ["sku"];
    }
    public static log(...args: any) {
      console.log("🔘 blue-buy", ...args);
    }

    public shadowRootBuyButton: any = this.attachShadow({mode: "open"});
    private sku: any;
    private products: any = {
      t_eicher: {price: 57.99, currency: "EUR"},
      t_fendt: {price: 54.99, currency: "EUR"},
      t_porsche: {price: 66.99, currency: "EUR"},
    };

    constructor() {
      super(); // always call super() first in the constructor.
    }

    public connectedCallback() {
      this.addToCart = this.addToCart.bind(this);
      this.sku = this.getAttribute("sku");
      BlueBuy.log("connected", this.sku);
      this.render();
      const button = this.shadowRootBuyButton.getElementById("buy");
      if (button != null) {
          button.addEventListener("click", this.addToCart);
        }
    }
    public addToCart() {
      BlueBuy.log('event sent "blue:basket:changed"');
      const sku = this.sku;
      if (sku != null) {
        const eventProperties = {bubbles: true, detail: {sku, priceDetail: this.products[sku]}, composed: true};
        const event = new CustomEvent("blue:basket:changed", eventProperties);
        document.dispatchEvent(event);
      }
    }
    public render() {
      const sku = this.sku;
      const price = this.products[sku].price + " " + this.products[this.sku].currency;
      this.shadowRootBuyButton.innerHTML = ` <link rel="stylesheet" href="team-blue/buy-button/buy-button.css">
                                            <button id="buy" type="button">buy for ${price}</button>`;
    }
    public attributeChangedCallback(attr: any, oldValue: any, newValue: any) {
      BlueBuy.log("attributeChanged", attr, oldValue, newValue);
      this.sku = this.getAttribute("sku");
      this.render();
    }
    public disconnectedCallback() {
        const button = this.shadowRootBuyButton.getElementById("buy");
        if (button != null) {
          button.removeEventListener("click", this.addToCart);
        }
        this.sku = this.getAttribute("sku");

        BlueBuy.log("disconnected", this.sku);
    }
  }

  window.customElements.define(BlueBuy.tag, BlueBuy);
