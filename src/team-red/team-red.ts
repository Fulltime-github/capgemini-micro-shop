/* eslint-disable no-use-before-define */
/* globals document */
const $app = document.getElementById("app");

// data
const product = {
  name: "Tractor",
  variants: [
    {
      color: "blue",
      image: "./team-red/images/tractor-blue.jpg",
      name: "Eicher Diesel 215/16",
      price: "58,00 €",
      sku: "t_eicher",
      thumb: "./team-red/images/tractor-blue-thumb.jpg",
    },
    {
      color: "green",
      image: "./team-red/images/tractor-green.jpg",
      name: "Fendt F20 Dieselroß",
      price: "54,00 €",
      sku: "t_fendt",
      thumb: "./team-red/images/tractor-green-thumb.jpg",
    },
    {
      color: "red",
      image: "./team-red/images/tractor-red.jpg",
      name: "Porsche-Diesel Master 419",
      price: "66,00 €",
      sku: "t_porsche",
      thumb: "./team-red/images/tractor-red-thumb.jpg",
    },
  ],
};

const state = {
  variant: "t_porsche",
};

function renderOption(variant: any) {
  const active = state.variant === variant.sku ? "active" : "";
  return `
    <button class="${active}" type="button" data-sku="${variant.sku}">
      <img src="${variant.thumb}" alt="${variant.name}" />
    </button>
  `;
}

function renderPage() {
  const variant = product.variants.find((v) => state.variant === v.sku);
  if ( $app == null ) {
    return;
  }
  $app.innerHTML = `
    <h1 id="store">The Model Store</h1>
    <cpgmni-blue-basket id="cpgmni-blue-basket"><div slot="title">Slot basket: </div></cpgmni-blue-basket>
    <div id="image"><div><img src="${variant ? variant.image : ""}" alt="${variant ? variant.name : ""}" /></div></div>
    <h2 id="name">${product.name} <small>${variant ? variant.name : ""}</small></h2>
    <div id="options">${product.variants.map(renderOption).join("")}</div>
    <cpgmni-blue-buy id="cpgmni-blue-buy" sku="${variant ? variant.sku : ""}"></cpgmni-blue-buy>
    <cpgmni-green-reco id="cpgmni-green-reco" sku="${variant ? variant.sku : ""}"></cpgmni-green-reco>
  `;
}

function rerender() {
  removeListeners();
  renderPage();
  addListeners();
}

function handleClickOption(e: any) {
  const sku = e.currentTarget.getAttribute("data-sku");
  state.variant = sku;
  rerender();
}

function addListeners() {
  const $btns = document.querySelectorAll("#options button");
  Array.prototype.forEach.call($btns, ($btn: any) => (
     $btn.addEventListener("click", handleClickOption)
  ));
}

function removeListeners() {
  const $btns = document.querySelectorAll("#options button");
  Array.prototype.forEach.call($btns, ($btn: any) => (
     $btn.removeEventListener("click", handleClickOption)
  ));
}

renderPage();
addListeners();
