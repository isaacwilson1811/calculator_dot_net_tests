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
// 1.
describe ( 'Calculate with values: Salary ($80,000) per [Year], Hours(40), Days(5), Holidays(12), Vacation days(25)', () => {
    it ( 'Displays correct results.', async () => {
        await Confirm.CALCULATE[ 'Positive test sample 1' ]()
    })
})
// 2.
describe ( 'Calculate with values: Salary ($11) per [Hour], Hours(45), Days(6), Holidays(5), Vacation days(0)', () => {
    it ( 'Displays correct results.', async () => {
        await Confirm.CALCULATE[ 'Positive test sample 2' ]()
    })
})
// 3.
describe ( 'After entering any values Click Clear button', () => {
    it ( 'Inputs should be empty.', async () => {
        await Confirm.CLEAR[ 'Inputs are empty after clicking Clear button' ]()
    })
})