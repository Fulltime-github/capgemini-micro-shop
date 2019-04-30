"use strict";
require('chromedriver/lib/chromedriver');
var chrome = require('selenium-webdriver/chrome');
const {Builder, By, Key, until} = require('selenium-webdriver');
var chai = require('chai');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style

const screen = {
    width: 640,
    height: 480
};
var driver;


describe('Microfrontend', async function () {

    beforeEach(function () {
        driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options().headless().windowSize(screen))
            .build();
        return driver.get('http://localhost/Microfrontend/')
    });

    afterEach(function () {
        return driver.quit();
    });


    it('check if active clicked image is also big sized visible', async function () {
        var imgSmall = await driver.findElement(By.css("button.active[data-sku] > img"));
        var mainImg = await driver.findElement(By.css("div#image > div > img"));
        var imageNameSmall = await imgSmall.getAttribute("alt");
        var imageNameBig = await mainImg.getAttribute("alt");
        imageNameBig.should.equal(imageNameSmall);
    });


    it('validate basket Item count', async function () {

        var buttonBuy = await driver.findElement(By.css("cpgmni-blue-buy > button"));
        await buttonBuy.click();
        await buttonBuy.click();
        await buttonBuy.click();

        var basket = await driver.findElement(By.css("cpgmni-blue-basket > div"));
        var textBasket = await basket.getText();
        var numberBasketItems = textBasket.substr("basket: ".length, textBasket.indexOf(" item(s)") - "basket: ".length);


        numberBasketItems.should.equal("3");
    })
});





