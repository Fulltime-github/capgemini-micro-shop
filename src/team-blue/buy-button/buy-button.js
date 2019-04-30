/* eslint-disable no-use-before-define, no-console, class-methods-use-this */
/* globals HTMLElement, window, CustomEvent */
(function fragments() {
  const prices = {
    t_porsche: '66,00 €',
    t_fendt: '54,00 €',
    t_eicher: '58,00 €',
  };

  const state = {
    count: 0,
  };

  class BlueBuy extends HTMLElement {
    shadowRoot = this.attachShadow({mode: 'open'});
    constructor() {
      super(); // always call super() first in the constructor.
    }
    static get observedAttributes() {
      return ['sku'];
    }
    connectedCallback() {
      this.addToCart = this.addToCart.bind(this);
      const sku = this.getAttribute('sku');
      this.log('asasas connected', sku);
      this.render();
      let button = this.shadowRoot.getElementById("buy");
      button.addEventListener('click', this.addToCart);
    }
    addToCart() {
      this.log('event sent "blue:basket:changed"');
      state.count += 1;
      var eventProperties = {bubbles: true, detail: { text: state.count}, composed: true};
      var event = new CustomEvent('blue:basket:changed', eventProperties);
      window.dispatchEvent(event);
    }
    render() {
      const sku = this.getAttribute('sku');
      const price = prices[sku];
      this.shadowRoot.innerHTML = ` <link rel="stylesheet" href="team-blue/buy-button/styles.css"><button id="buy" type="button">buy for ${price}</button>`;
    }
    attributeChangedCallback(attr, oldValue, newValue) {
      this.log('attributeChanged', attr, oldValue, newValue);
      this.render();
    }
    disconnectedCallback() {
      let button = this.shadowRoot.getElementById("buy");
      button.removeEventListener('click', this.addToCart);
      const sku = this.getAttribute('sku');
      this.log('disconnected', sku);
    }
    log(...args) {
      console.log('🔘 blue-buy', ...args);
    }
  }
  window.customElements.define('cpgmni-blue-buy', BlueBuy);
}());
