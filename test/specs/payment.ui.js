                                                                    /*
[calculator.net] Payment Calculator | UI Layout and Display
https://mtechqa.atlassian.net/browse/MTQA-2506
npx wdio run wdio.conf.js --spec test/specs/payment.ui.js
                                                                    */
import Confirm from '../pageobjects/payment.page.js'
// Pre condition
describe ( 'Navigate to the page for the component being tested.', () => {
    it ( 'Component page should load.', async () => { 
        await Confirm.BROWSER[ 'Component page is loaded' ]()
    })
})