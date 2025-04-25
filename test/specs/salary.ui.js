                                                                    /*
[calculator.net] Salary Calculator | UI Layout and Display
https://mtechqa.atlassian.net/browse/MTQA-2505
npx wdio run wdio.conf.js --spec test/specs/salary.ui.js
                                                                    */
import Confirm from '../pageobjects/salary.page.js'
// Pre condition
describe ( 'Navigate to the page for the component being tested.', () => {
    it ( 'Component page should load.', async () => { 
        await Confirm.BROWSER[ 'Component page is loaded' ]()
    })
})
// 1.
describe ( 'Heading element used for the component title', () => {
    it ( 'Should be the only instance of an h1 tag.', async () => {
        await Confirm.UI[ 'Heading element is the only h1 on the page' ]()
    })
    it ( 'Should have text matching component title', async () => {
        await Confirm.UI[ 'Heading text content matches requirement' ]()
    })
    it ( 'Should have appropriate text color applied', async () => {
        await Confirm.UI[ 'Heading text color matches requirement' ]()
    })
})
// 2.
describe ( 'Text element used for the component description.', () => {
    it ( 'Should have text matching component description.', async () => {
        await Confirm.UI[ 'Description element text matches requirement' ]()
    })
})
// 3.
describe ( 'Usage instructions heading image.', () => {
    it ( 'Should be visible above input container and result section', async () => {
        await Confirm.UI[ 'Usage Instruction image meets requirements' ]()
    })
})
// 4.
describe ('Container holding value inputs and function buttons.', () => {
    it ('Should be displayed to the left of Result section, with required background color and border.', async () => {
        await Confirm.UI[ 'Input container meets requirements' ]()
    })
})
// * The following UI elements are present in the container:
// * Input labeled ‘Salary amount’ with a dollar symbol on the left side of the input area.
// *Dropdown selection list labeled ‘per’ defaulting to ‘Hour’ and list contains the choices:
//        Hour, Day, Week, Bi-Week, Semi-month, Month, Quarter, Year
// * Input labeled Hours per week
// * Input labeled Days per week
// * Input labeled Holidays per year
// * Input labeled Vacation days per year
// * Calculate button with a functioning hover state, appropriate colors, and play-arrow icon.
// * Clear button with a functioning hover state and appropriate colors applied.

// 5.
// Result section and data table

// 6.
// Additional information text element

// 7.
// Enter a valid set of inputs and click Calculate to populate results table.

// 8.
// Enter an invalid set of inputs and click Calculate to produce an error message.