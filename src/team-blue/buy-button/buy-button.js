/* eslint-disable no-use-before-define, no-console, class-methods-use-this */
/* globals HTMLElement, window, CustomEvent */

  export class BlueBuy extends HTMLElement {
    prices = {
      t_porsche: '66,00 €',
      t_fendt: '54,00 €',
      t_eicher: '58,00 €',
    };

    state = {
      count: 0,
    };


      static get tag() {
          return "cpgmni-blue-buy";
      }

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
      BlueBuy.log('asasas connected', sku);
      this.render();
      let button = this.shadowRoot.getElementById("buy");
      button.addEventListener('click', this.addToCart);
    }
    addToCart() {
      BlueBuy.log('event sent "blue:basket:changed"');
      state.count += 1;
      var eventProperties = {bubbles: true, detail: { text: state.count}, composed: true};
      var event = new CustomEvent('blue:basket:changed', eventProperties);
      window.dispatchEvent(event);
    }
    render() {
      const sku = this.getAttribute('sku');
      const price = prices[sku];
      this.shadowRoot.innerHTML = ` <link rel="stylesheet" href="team-blue/buy-button/buy-button.css"><button id="buy" type="button">buy for ${price}</button>`;
    }
    attributeChangedCallback(attr, oldValue, newValue) {
      BlueBuy.log('attributeChanged', attr, oldValue, newValue);
      this.render();
    }
    disconnectedCallback() {
      let button = this.shadowRoot.getElementById("buy");
      button.removeEventListener('click', this.addToCart);
      const sku = this.getAttribute('sku');
      BlueBuy.log('disconnected', sku);
    }
    static log(...args) {
      console.log('🔘 blue-buy', ...args);
    }
  }

  window.customElements.define(BlueBuy.tag, BlueBuy);

