                                                                    /*
[calculator.net] Salary Calculator | Input Boundaries
https://mtechqa.atlassian.net/browse/MTQA-2509
npx wdio run wdio.conf.js --spec test/specs/salary.iobound.js
                                                                    */
import Confirm from '../pageobjects/salary.page.js'
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