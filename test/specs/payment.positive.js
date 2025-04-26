                                                                    /*
[calculator.net] Payment Calculator | Expected Functional Behavior
https://mtechqa.atlassian.net/browse/MTQA-2573
npx wdio run wdio.conf.js --spec test/specs/payment.positive.js
                                                                    */
import Confirm from '../pageobjects/payment.page.js'
// Pre condition
describe ( 'Navigate to the page for the component being tested.', () => {
    it ( 'Component page should load.', async () => { 
        await Confirm.BROWSER[ 'Component page is loaded' ]()
    })
})
// 1.
describe ( '', () => {
    it ( '', async () => {})
})