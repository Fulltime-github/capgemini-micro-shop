import {RenderModel}from "../../../testTool/render-model";
import {TestUtils}from "../../../testTool/test-utils";
import {CpgmniBlueBuyButtonEventTest} from "./cpgmni-blue-buy-button-event-test";

describe(" Integration - cpgmni-blue-basket1767540968", () => {

    beforeEach(async () => {
        await TestUtils.addRenderHtml("<cpgmni-blue-basket id=\"cpgmni-blue-basket\"><div slot=\"title\">basket: </div></cpgmni-blue-basket>", "cpgmni-blue-basket");
    });

    afterEach(async () => {
        TestUtils.close();
    });

    it("cpgmni-blue-buy-button1501920856 - blue:basket:changed1501920856", async () => {
        let noError = true;
        try {
            const CpgmniBlueBuyButtonEventTest1501920856 = new CpgmniBlueBuyButtonEventTest();
            await CpgmniBlueBuyButtonEventTest1501920856.setup();
            await CpgmniBlueBuyButtonEventTest1501920856.act();
        } catch (err) {
            noError = false;
        }

        expect(noError).toBe(true);
    });
});
