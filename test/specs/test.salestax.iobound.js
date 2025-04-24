                                                                    /*
[calculator.net] Sales Tax Calculator | Input Boundaries and Output Limits
https://mtechqa.atlassian.net/browse/MTQA-2508
npx wdio run wdio.conf.js --spec test/specs/test.salestax.iobound.js
                                                                    */
import Confirm from '../pageobjects/salestax.page.js'
// Pre condition
describe ( 'Navigate to the page for the component being tested.', () => {
    it ( 'Component page should load.', async () => { 
        await Confirm.BROWSER[ 'Component page is loaded' ]()
    })
})
// 1.
describe ('Calculate minimum values: Before Tax Price ($0.01), Sales Tax Rate (0%)', () => {
    it ('Should display correctly calculated values', async () => {
        await Confirm.CALCULATE[ 'With minumum values BT TR' ]()
    })
})
describe ('Calculate minimum values: Before Tax Price ($0.01), After Tax Price ($0.02)', () => {
    it ('Should display correctly calculated values', async () => {
        await Confirm.CALCULATE[ 'With minumum values BT AT' ]()
    })
})
// describe ('_', () => {
//     it ('_', async () => {

//     })
// })