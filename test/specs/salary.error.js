                                                                    /*
[calculator.net] Salary Calculator | Error Message Handling
https://mtechqa.atlassian.net/browse/MTQA-2576
npx wdio run wdio.conf.js --spec test/specs/salary.error.js
                                                                    */
import Confirm from '../pageobjects/salary.page.js'
// Pre condition
describe ( 'Navigate to the page for the component being tested.', () => {
    it ( 'Component page should load.', async () => { 
        await Confirm.BROWSER[ 'Component page is loaded' ]()
    })
})