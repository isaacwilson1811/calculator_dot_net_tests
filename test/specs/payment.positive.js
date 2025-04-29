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
describe ( 'Calculate with values: Fixed Term, Loan Term(5 years), Loan Amount(30,000), Interest Rate(7)', () => {
    it ( 'Should calculate and display results correctly.', async () => {
        await Confirm.CALCULATE[ 'Positive test sample 1' ]()
    })
})
// 2.
describe ( 'Calculate with values: Fixed Payments, Monthly Pay(38), Loan Amount(800), Interest Rate(13)', () => {
    it ( 'Should calculate and display results correctly.', async () => {
        await Confirm.CALCULATE[ 'Positive test sample 2' ]()
    })
})
// 3.
describe ( 'Enter any values and click Clear Button', () => {
    it ( 'Inputs should be empty', async () => {

    })
})