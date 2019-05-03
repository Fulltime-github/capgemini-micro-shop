"use strict";
require('chromedriver/lib/chromedriver');

var chrome = require('selenium-webdriver/chrome');
const {Builder, By, until} = require('selenium-webdriver');

const screen = {
  width: 1920,
  height: 1080
};
var driver;

describe('BuyButton Test', () => {
  var baskedChangedSpy ;

  beforeEach(function () {

    driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().windowSize(screen))
        .build();
    driver.get('http://localhost:3000');
  }, 20000);

  afterEach(function () {
    return driver.quit();
  });

  it('test Buy Button event firing', async function () {
    var numberOfEvents = '3';
    baskedChangedSpy = jasmine.createSpy();

    await start('blue:basket:changed', 'hiddenTriggerElement', baskedChangedSpy, numberOfEvents);
    var buttonBuy = await findShadowDomElement("cpgmni-blue-buy","#buy");
    var numberOfEventsFired;

    buttonBuy.click();
    buttonBuy.click();
    buttonBuy.click();

    await driver.wait(until.elementLocated(By.id('hiddenTriggerElement')));
    numberOfEventsFired = await driver.findElement(By.id('hiddenTriggerElement')).getText();
    expect(numberOfEventsFired).toEqual(numberOfEvents);
  }, 20000);

  async function start(name, target, spy, countUntil) {
    driver.executeScript(`            
            function _trackEvent(e){
                var target = document.getElementById('${target}');
                if( !target && JSON.stringify(e.detail.text) == ${countUntil}){
                    var resultDiv = document.createElement('div');
                    resultDiv.id = '${target}'; 
                     resultDiv.innerHTML = JSON.stringify(e.detail.text);
                    document.body.appendChild( resultDiv ); 
                }               
            }
            window.addEventListener("${name}", _trackEvent);            
        `);
  }

  async function findShadowDomElement(microfrontend, shadowDomElement) {
    let shadowRoot;
    let element;
    await (shadowRoot = getExtShadowRoot(microfrontend));
    await shadowRoot.then(async (result) => {
      await (element = result.findElement(By.css(shadowDomElement)));
    });

    return element;
  }

  async function getExtShadowRoot(microfrontend) {
    let shadowHost;
    await (shadowHost = driver.findElement(By.css(microfrontend)));
    return driver.executeScript("return arguments[0].shadowRoot", shadowHost);
  }

});





