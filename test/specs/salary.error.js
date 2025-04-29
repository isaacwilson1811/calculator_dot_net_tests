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
// 1.
describe ( 'Delete all default input values or Click Clear. Click Calculate.', () => {
    it ( 'Should display the appropriate errors', async () => {
        await Confirm.ERROR[ 'Blank values and random unit choice produce required errors' ]()
    })
})
// 2.
describe ( 'Calculate with incorrect values: Salary ($1), per [any], Days(1), Holidays(365), Vacation(365),', () => {
    it ( 'Should display the appropriate error', async () => {
        await Confirm.ERROR[ 'Holidays and Vacation over the limit results in specific error' ]()
    })
})