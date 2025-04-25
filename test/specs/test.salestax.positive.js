                                                                    /*
[calculator.net] Sales Tax Calculator | Expected Functional Behavior
https://mtechqa.atlassian.net/browse/MTQA-2571
npx wdio run wdio.conf.js --spec test/specs/test.salestax.positive.js
                                                                    */
import Confirm from '../pageobjects/salestax.page.js'
// Pre condition
describe ( 'Navigate to the page for the component being tested.', () => {
    it ( 'Component page should load.', async () => { 
        await Confirm.BROWSER[ 'Component page is loaded' ]()
    })
})
// 1.
describe ( 'Calculate: Before Tax Price ($4.99), Sales Tax Rate (6.1%) After Tax Price (Leave Blank)', () => {
    it ( 'Should display correctly calculated results', async () => { 
        await Confirm.CALCULATE[ 'BT (4.99), TR (6.1), AT (_)' ]()
    })
})
// 2.
describe ( 'Calculate: Before Tax Price ($49.99), Sales Tax Rate (Leave Blank) After Tax Price ($56.01)', () => {
    it ( 'Should display correctly calculated results', async () => { 
        await Confirm.CALCULATE[ 'BT (49.99), TR (_), AT (56.01)' ]()
    })
})
// 3.
describe ( 'Calculate: Before Tax Price (Leave Blank), Sales Tax Rate (8.5%) After Tax Price ($215.90)', () => {
    it ( 'Should display correctly calculated results', async () => { 
        await Confirm.CALCULATE[ 'BT (_), TR (8.5), AT (215.90)' ]()
    })
})
// 4.
describe ( 'Enter any values then click Clear button', () => {
    it ( 'Inputs should be empty', async () => { 
        await Confirm.CLEAR[ 'Inputs are empty after clicking Clear button' ]()
    })
})