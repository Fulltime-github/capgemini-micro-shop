/* eslint-disable no-use-before-define, no-console, class-methods-use-this */
/* globals HTMLElement, window, CustomEvent */

export class BlueBasket extends HTMLElement {

  static get tag() {
    return "cpgmni-blue-basket";
  }

  public shadowRootBasket: any = this.attachShadow({mode: "open"});

  private state: {count: number, sku: string, basketPrice: any, currency: string} = {
    count: 0,
    sku: "",
    basketPrice: 0,
    currency: ""
  };
  constructor() {
    super(); // always call super() first in the constructor.
  }

  public connectedCallback() {
    this.refresh = this.refresh.bind(this);
    this.log("connected");
    this.render();
    document.addEventListener("blue:basket:changed", this.refresh);
  }

  public refresh(e: CustomEvent) {
    this.log('event recieved "blue:basket:changed"');
    this.updateState(e.detail);
    this.render();

  }

  public updateState(eventData: {sku: string, priceDetail: {price: number, currency: string}}) {
    this.state.count += 1;
    console.log("eventData");
    console.log(eventData);
    this.state.basketPrice += eventData.priceDetail.price;
    this.state.currency = eventData.priceDetail.currency;
    this.state.sku = eventData.sku;
  }

  public render() {
    const classname = this.state.count === 0 ? "empty" : "filled";
    this.shadowRootBasket.innerHTML = `

      <link rel="stylesheet" href="team-blue/basket/basket.css">
      <div class="${classname} title">
          <slot class="title" name="title">Basket: </slot>
          <div class="title" id="items">
            ${this.state.count} item(s) ${this.state.sku ? "of " + this.state.sku : ""}
          </div>
          <div class="title">
            Price: ${this.state.basketPrice.toFixed(2) + " " + this.state.currency}
          </div>
      </div>
    `;
  }

  public disconnectedCallback() {
    document.removeEventListener("blue:basket:changed", this.refresh);
    this.log("disconnected");
  }

  private log(...args: any) {
    // tslint:disable-next-line:no-console
    console.log("🛒 blue-basket", ...args);
  }
}
window.customElements.define("cpgmni-blue-basket", BlueBasket);
