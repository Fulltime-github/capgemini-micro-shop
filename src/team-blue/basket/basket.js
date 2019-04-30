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

  class BlueBasket extends HTMLElement {
    shadowRoot = this.attachShadow({mode: 'open'});
    constructor() {
      super(); // always call super() first in the constructor.
    }
    connectedCallback() {
      this.refresh = this.refresh.bind(this);
      this.log('connected');
      this.render();
      window.addEventListener('blue:basket:changed', this.refresh);
    }
    refresh(e) {
      this.log('event recieved "blue:basket:changed"');
      state.count = e.detail.text;
      this.render();
    }
    render() {
      const classname = state.count === 0 ? 'empty' : 'filled';
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="team-blue/basket/styles.css">
        
        <div class="${classname} title">
            <slot id="title" class="title" name="title"></slot> 
            <slot id="title-default" class="title">basket: </slot> 
            ${state.count} item(s)
        </div>
      `;
    }
    disconnectedCallback() {
      window.removeEventListener('blue:basket:changed', this.refresh);
      this.log('disconnected');
    }
    log(...args) {
      console.log('🛒 blue-basket', ...args);
    }
  }
  window.customElements.define('cpgmni-blue-basket', BlueBasket);
}());
