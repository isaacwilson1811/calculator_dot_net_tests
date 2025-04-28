                                                                    /*
[calculator.net] Compound Interest Calculator | Expected Functional Behavior
https://mtechqa.atlassian.net/browse/MTQA-2574
npx wdio run wdio.conf.js --spec test/specs/compound.positive.js
                                                                    */
import Confirm from '../pageobjects/compound.page.js'
// Pre condition
describe ( 'Navigate to the page for the component being tested.', () => {
    it ( 'Component page should load.', async () => { 
        await Confirm.BROWSER[ 'Component page is loaded' ]()
    })
})
// 1.
describe ( 'Calculate with values: Interest(4%), [Weekly] - [Quarterly]', () => {
    it ( '', async () => {

    })
    // result matches screenshot in test case
})
// 2.
describe ( 'Calculate with values: Interest(1.12%), [Daily] - [Semimonthly]', () => {
    it ( '', async () => {
        
    })
    // result matches screenshot in test case
})
// 3.
describe ( 'Enter any values and click Clear', () => {
    it ( 'All values are cleared and empty.', async () => {

    })
})