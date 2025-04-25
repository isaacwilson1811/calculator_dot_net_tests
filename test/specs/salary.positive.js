                                                                    /*
[calculator.net] Salary Calculator | Expected Functional Behavior
https://mtechqa.atlassian.net/browse/MTQA-2572
npx wdio run wdio.conf.js --spec test/specs/salary.positive.js
                                                                    */
import Confirm from '../pageobjects/salary.page.js'
// Pre condition
describe ( 'Navigate to the page for the component being tested.', () => {
    it ( 'Component page should load.', async () => { 
        await Confirm.BROWSER[ 'Component page is loaded' ]()
    })
})