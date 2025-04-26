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
describe ( '', () => {
    it ( '', async () => {})
})