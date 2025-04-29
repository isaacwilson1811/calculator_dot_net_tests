                                                                    /*
[calculator.net] Compound Interest Calculator | Input Boundaries
https://mtechqa.atlassian.net/browse/MTQA-2511
npx wdio run wdio.conf.js --spec test/specs/compound.iobound.js
                                                                    */
import Confirm from '../pageobjects/compound.page.js'
// Pre condition
describe ( 'Navigate to the page for the component being tested.', () => {
    it ( 'Component page should load.', async () => { 
        await Confirm.BROWSER[ 'Component page is loaded' ]()
    })
})
// 1.
describe ( 'Input min value Interest (0%). Calculate all combinations of both compound selections.', () => {
    it ( 'All results of output interest should be 0.0000000000% or 0% regardless of combination.', async () => {
        await Confirm.CALCULATE[ 'All combinations of min value calculate the same output value of 0' ]()
    })
})
// 2.
describe ( 'Input max value Interest (99%). Calculate all combinations of both compound selections.', () => {
    it ( 'Results should match expected results', async () => {
        await Confirm.CALCULATE[ 'All combinations of max value calculate' ]()
    })
})
