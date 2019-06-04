/* eslint-disable no-use-before-define, no-console, class-methods-use-this */
/* globals HTMLElement, window, CustomEvent */

export class BlueBasket extends HTMLElement {
  prices = {
    t_eicher: "58,00 €",
    t_fendt: "54,00 €",
    t_porsche: "66,00 €",
  };

  state = {
    count: 0,
  };

  static get tag() {
    return "cpgmni-blue-basket";
  }

  shadowRoot = this.attachShadow({mode: "open"});
  constructor() {
    super(); // always call super() first in the constructor.
  }

  connectedCallback() {
    this.refresh = this.refresh.bind(this);
    this.log("connected");
    this.render();
    window.addEventListener("blue:basket:changed", this.refresh);
  }

  refresh(e) {
    this.log('event recieved "blue:basket:changed"');
    this.state.count = e.detail.text;
    this.render();
  }

  render() {
    const classname = this.state.count === 0 ? "empty" : "filled";
    this.shadowRoot.innerHTML = `

      <link rel="stylesheet" href="team-blue/basket/basket.css">
      <div class="${classname} title">
          <slot class="title" name="title">Basket: </slot>
          <div class="title">${this.state.count} item(s)</div>
      </div>
    `;
  }

  disconnectedCallback() {
    window.removeEventListener("blue:basket:changed", this.refresh);
    this.log("disconnected");
  }

  log(...args) {
    // tslint:disable-next-line:no-console
    console.log("🛒 blue-basket", ...args);
  }
}
window.customElements.define("cpgmni-blue-basket", BlueBasket);
