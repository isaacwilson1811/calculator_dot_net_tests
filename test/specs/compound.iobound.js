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
    it ( 'All combinations of annually results of output interest should be 0.0000000000% or 0% regardless of combination.', async () => {
        await Confirm.CALCULATE[ 'All annually combinations of min value calculate the same output value of 0' ]()
    })
    it ( 'All combinations of semiannually results of output interest should be 0.0000000000% or 0% regardless of combination.', async () => {
        await Confirm.CALCULATE[ 'All semiannually combinations of min value calculate the same output value of 0' ]()
    })
    it ( 'All combinations of quarterly results of output interest should be 0.0000000000% or 0% regardless of combination.', async () => {
        await Confirm.CALCULATE[ 'All quarterly combinations of min value calculate the same output value of 0' ]()
    })
    it ( 'All combinations of monthly results of output interest should be 0.0000000000% or 0% regardless of combination.', async () => {
        await Confirm.CALCULATE[ 'All monthly combinations of min value calculate the same output value of 0' ]()
    })
    it ( 'All combinations of semimonthly results of output interest should be 0.0000000000% or 0% regardless of combination.', async () => {
        await Confirm.CALCULATE[ 'All semimonthly combinations of min value calculate the same output value of 0' ]()
    })
    it ( 'All combinations of biweekly results of output interest should be 0.0000000000% or 0% regardless of combination.', async () => {
        await Confirm.CALCULATE[ 'All biweekly combinations of min value calculate the same output value of 0' ]()
    })
    it ( 'All combinations of weekly results of output interest should be 0.0000000000% or 0% regardless of combination.', async () => {
        await Confirm.CALCULATE[ 'All weekly combinations of min value calculate the same output value of 0' ]()
    })
    it ( 'All combinations of daily results of output interest should be 0.0000000000% or 0% regardless of combination.', async () => {
        await Confirm.CALCULATE[ 'All daily combinations of min value calculate the same output value of 0' ]()
    })
    it ( 'All combinations of continuously results of output interest should be 0.0000000000% or 0% regardless of combination.', async () => {
        await Confirm.CALCULATE[ 'All continuously combinations of min value calculate the same output value of 0' ]()
    })
})
// 2.
describe ( 'Input max value Interest (99%). Calculate all combinations of both compound selections.', () => {
    it ( 'All combinations of annually should match expected results', async () => {
        await Confirm.CALCULATE[ 'All combinations of annually max value calculate' ]()
    })
    it ( 'All combinations of semiannually should match expected results', async () => {
        await Confirm.CALCULATE[ 'All combinations of semiannually max value calculate' ]()
    })
    it ( 'All combinations of quarterly should match expected results', async () => {
        await Confirm.CALCULATE[ 'All combinations of quarterly max value calculate' ]()
    })
    it ( 'All combinations of monthly should match expected results', async () => {
        await Confirm.CALCULATE[ 'All combinations of monthly max value calculate' ]()
    })
    it ( 'All combinations of semimonthly should match expected results', async () => {
        await Confirm.CALCULATE[ 'All combinations of semimonthly max value calculate' ]()
    })
    it ( 'All combinations of biweekly should match expected results', async () => {
        await Confirm.CALCULATE[ 'All combinations of biweekly max value calculate' ]()
    })
    it ( 'All combinations of weekly should match expected results', async () => {
        await Confirm.CALCULATE[ 'All combinations of weekly max value calculate' ]()
    })
    it ( 'All combinations of daily should match expected results', async () => {
        await Confirm.CALCULATE[ 'All combinations of daily max value calculate' ]()
    })
    it ( 'All combinations of continuously should match expected results', async () => {
        await Confirm.CALCULATE[ 'All combinations of continuously max value calculate' ]()
    })
})
