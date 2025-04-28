                                                                    /*
[calculator.net] Payment Calculator | Error Message Handling
https://mtechqa.atlassian.net/browse/MTQA-2577
npx wdio run wdio.conf.js --spec test/specs/payment.error.js
                                                                    */
import Confirm from '../pageobjects/payment.page.js'
// Pre condition
describe ( 'Navigate to the page for the component being tested.', () => {
    it ( 'Component page should load.', async () => { 
        await Confirm.BROWSER[ 'Component page is loaded' ]()
    })
})
// 1.
describe ( 'Select Fixed Term tab. Calculate with all values set to (-1)', () => {
    it ( '', async () => {

    })
    // results in screenshot from test case
})

// 2.
describe ( 'Select Fixed Payments tab. Calculate with all values set to (-1)', () => {
    it ( '', async () => {

    })
    // results in screenshot from test case
})