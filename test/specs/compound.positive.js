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