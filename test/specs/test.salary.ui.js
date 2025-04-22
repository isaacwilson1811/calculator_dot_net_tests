                                                                    /*
[calculator.net] Salary Calculator | UI Layout and Display
https://mtechqa.atlassian.net/browse/MTQA-2505
npx wdio run wdio.conf.js --spec test/specs/test.salary.ui.js
                                                                    */
import Salary from '../pageobjects/salary.page.js'

describe ( 'Navigate to the page for the component being tested.', () => {
    it ( 'Component page should be loaded.', async () => { await Salary.openComponentPage() })
})

// 1.
describe ( 'Heading element used for the component title', () => {

    it ( 'Should be the only instance of an h1 tag.', async () => {
            await Salary.checkElementCount (
                { 
                    count: Salary.requiredCount,
                    element: await Salary.locate ('heading as list')
                }
            )
    })

    it ( 'Should have text matching component title', async () => {
        await Salary.checkElementText (
            { 
                text: 'Salary Calculator',
                element: await Salary.locate ('heading')
            }
        )
    })

    // 
    // and appropriate text color applied.

})


// Text element used for the component description.

// Usage instructions heading image.

// Container holding value inputs and function buttons.

// Result section and data table

// Additional information text element

// Enter a valid set of inputs and click Calculate to populate results table.

// Enter an invalid set of inputs and click Calculate to produce an error message.