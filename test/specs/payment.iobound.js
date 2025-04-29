                                                                    /*
[calculator.net] Payment Calculator | Input Boundaries
https://mtechqa.atlassian.net/browse/MTQA-2510
npx wdio run wdio.conf.js --spec test/specs/payment.iobound.js
                                                                    */
import Confirm from '../pageobjects/payment.page.js'
// Pre condition
describe ( 'Navigate to the page for the component being tested.', () => {
    it ( 'Component page should load.', async () => { 
        await Confirm.BROWSER[ 'Component page is loaded' ]()
    })
})
// 1.
describe ( 'Calculate with Fixed Term and MIN values: Loan amount(1), Loan Term(1), Interest Rate(0)', () => {
    it ( 'Should calculate and display results correctly.', async () => {
        await Confirm.CALCULATE[ 'Fixed Term MIN' ]()
    })
})
// 2.
describe ( 'Calculate with Fixed Payments and MIN values: Loan amount(1), Monthly Pay(1), Interest Rate(0)', () => {
    it ( 'Should calculate and display results correctly.', async () => {
        await Confirm.CALCULATE[ 'Fixed Payments MIN' ]()
    })
})
// 3.
describe ( 'Calculate with Fixed Term and MAX values: Loan Amount(100,000,000,000), Loan Term(100), Interest Rate(99)', () => {
    it ( 'Should calculate and display results correctly.', async () => {
        await Confirm.CALCULATE[ 'Fixed Term MAX' ]()
    })
})
// 4.
describe ( 'Calculate with Fixed Payments and MAX values: Loan Amount(100,000,000,000), Monthly Pay(8,250,000,001.00), Interest Rate(99%', () => {
    it ( 'Should calculate and display results correctly.', async () => {
        await Confirm.CALCULATE[ 'Fixed Payments MAX' ]()
    })
})