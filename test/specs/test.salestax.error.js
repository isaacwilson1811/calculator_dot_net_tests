                                                                    /*
[calculator.net] Sales Tax Calculator | Error Message Handling
https://mtechqa.atlassian.net/browse/MTQA-2575
npx wdio run wdio.conf.js --spec test/specs/test.salestax.error.js
                                                                    */
import Confirm from '../pageobjects/salestax.page.js'
// Pre condition
describe ( 'Navigate to the page for the component being tested.', () => {
    it ( 'Component page should load.', async () => { 
        await Confirm.BROWSER[ 'Component page is loaded' ]()
    })
})
// 1.
describe ( 'Calculate with no values entered.', () => {
    it ( 'Should display error with text: "Please provide at least two values to calculate."', async () => { 
        await Confirm.ERROR[ 'Error message when given no values' ]()
    })
})
// 2.
describe ( 'Calculate with only one input filled, having a value greater than 0', () => {
    it ( 'Should display error with text: "Please provide at least two values to calculate."', async () => { 
        await Confirm.ERROR[ 'Error message when given only 1 value greater than 0' ]()
    })
})
// 3.
describe ( 'Calculate with Before Tax Price ($0), Other inputs empty', () => {
    it ( 'Should display error with text: "Please provide a valid before tax price."', async () => { 
        await Confirm.ERROR[ 'Error message when given only Before Tax Price ($0)' ]()
    })
})
// 4.
describe ( 'Calculate with Before Tax Price ($0), Sales Tax Rate (text characters not numeric)', () => {
    it ( 'Should display 2 errors with text: "Please provide a valid before tax price." and "Please provide a valid sales tax rate."', async () => { 
        await Confirm.ERROR[ 'Error message when given Before Tax Price ($0), Sales Tax Rate (text characters not numeric)' ]()
    })
})
// 5.
describe ( 'Calculate with Before Tax Price ($1), After Tax Price ($0)', () => {
    it ( 'Should display error with text: "After tax price can not be smaller than before tax price."', async () => { 
        await Confirm.ERROR[ 'Error message when given Before Tax Price ($1), After Tax Price ($0)' ]()
    })
})
// 6.
describe ( 'Calculate with Before Tax Price ($ -1), Sales Tax Rate (text not numeric), After Tax Price ($ -1)', () => {
    it ( 'Should display 3 errors with text: "Please provide a valid before tax price.", "Please provide a valid sales tax rate.", "Please provide a valid after tax price."', async () => { 
        await Confirm.ERROR[ 'Error message when given BT (-1), TR (txt), AT (-1)' ]()
    })
})