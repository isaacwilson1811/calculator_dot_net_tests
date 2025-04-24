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
    it ('After Tax Price should equal ($0.01) ', async () => {
        await Confirm.CALCULATE[ 'With minimum values' ]()
    })
})
// describe ('_', () => {
//     it ('_', async () => {

//     })
// })