"use strict";

const showroom = require('showroom/puppeteer')({headless:true});
var chai = require('chai');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();


describe('BuyButton Test', () => {

  before(async function () {
    await showroom.start();
  });

  after(async function () {
    //await showroom.stop();
  });

  beforeEach(async function () {
    await showroom.setTestSubject('cpgmni-blue-buy')
  });

  it('test Buy Button event firing', async function () {
      const button = await showroom.find('// button');
      await button.click();
      await button.click();
      await button.click();
      const events = await showroom.getEventList();
      console.log(events.length);
      expect(events.length).to.equal(3);
  });
});





