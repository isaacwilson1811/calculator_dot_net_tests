                                                                    /*
[calculator.net] Compound Interest Calculator | Error Message Handling
https://mtechqa.atlassian.net/browse/MTQA-2578
npx wdio run wdio.conf.js --spec test/specs/compound.error.js
                                                                    */
import Confirm from '../pageobjects/compound.page.js'
// Pre condition
describe ( 'Navigate to the page for the component being tested.', () => {
    it ( 'Component page should load.', async () => { 
        await Confirm.BROWSER[ 'Component page is loaded' ]()
    })
})
// 1.
describe ( 'Click Clear button, then Click Calculate button to produce error message.', () => {
    it ( 'Displays Caution image and error message with text "Please provide a numeric input interest rate."', async () => {

    })
})
// 2.
describe ( 'Enter any string of text for Input Interest, any option for compound1 and compound2', () => {
    it ( 'Output Interest is displayed with text "?%"', async () => {

    })
    it ( 'Displays Caution image and error message with text "Please provide a numeric input interest rate."', async () => {

    })
})