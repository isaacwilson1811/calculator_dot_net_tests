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
describe ( 'Calculate once per Unit Option with values: Salary amount ($0). Other values random.', () => {
    it ( 'Results are all $0.00 or $0 regardless of per unit selection', async () => {
        await Confirm.CALCULATE[ 'Each unit option results in all 0s when salary amount is 0' ]()
    })
})
// 2.
describe ( 'Calculate once per Unit Option with min values: Salary($1), hours(1), days(1), holidays(0), vacation(0)', () => {
    it ( 'Results per unit option are calculated correctly', async () => {
        await Confirm.CALCULATE[ 'Each unit option is calculated correctly with min values' ]()
    })
})
// 3.
describe ( 'Calculate once per Unit Option with Salary($1) and max values: hours(160), days(7), holidays(59), vacation(200)', () => {
    it ( 'Results per unit option are calculated correctly', async () => {
        await Confirm.CALCULATE[ 'Each unit option is calculated correctly with max values' ]()
    })
})