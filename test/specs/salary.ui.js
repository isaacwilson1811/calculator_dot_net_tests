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
describe ( 'Input container holding the following elements and buttons.', () => {
    it ( 'Should be displayed to the left of Result section, with required background color and border.', async () => {
        await Confirm.UI[ 'Input container meets requirements' ]()
    })
    it ( 'Input and label with text: "Salary amount[newline] per". has a dollar symbol backgound image aligned to the left', async () => {

    })
    it ( 'Unit selection dropdown list defaulting to "Hour". Contains options: Hour, Day, Week, Bi-Week, Semi-month, Month, Quarter, Year', async () => {

    })
    it ( 'Input and label with text: "Hours per week"', async () => {

    })
    it ( 'Input and label with text: "Days per week"', async () => {

    })
    it ( 'Input and label with text: "Holidays per year"', async () => {

    })
    it ( 'Input and label with text: "Vacation days per year"', async () => {

    })
    it ( 'Calculate button with a functioning hover state, appropriate colors, and play-arrow icon.', async () => {

    })
    it ( 'Clear button with a functioning hover state and appropriate colors applied.', async () => {

    })
})
// 5.
describe( 'Result section and data table', () => {
    it ( '', async () => {

    })
// Result section is displayed to the right of input container
// * h2 heading element with text 'Result' and appropriate text / background color applied.
// * Save Icon aligned to the right side of heading. Hover effect changes the cursor style only.
// * Table with 3 columns, 1 heading row and 8 data rows:
// * Table heading row displays column labels (blank), “Unadjusted”, and “Holidays & vacation days adjusted”. Accent color and background color is applied.
// * 8 Table data rows with alternating background color and cell borders applied.
// * The column layout of the data rows are 1st column: Labels, 2nd column: dollar amounts, 3rd column: dollar amounts.
// * Labels in 1st column are: Hourly, Daily, Weekly, Bi-weekly, Semi-monthly, Monthly, Quarterly, Annual
})
// 6.
describe( 'Additional information text element', () => {
    it ( '', async () => {
    })
//     Additional information Paragraph element displayed below the inputs and results taking the full content width.
// Contains the text: “This salary calculator assumes the hourly and daily salary inputs to be unadjusted values. All other pay frequency inputs are assumed…“
// * Passes spelling checks or exactly matches pre approved text content.
})
// 7.
describe( 'Enter a valid set of inputs and click Calculate to populate results table.', () => {
    it ( '', async () => {
    })
//     After clicking Calculate, the description paragraph from step 2 should disappear
// * The result data table is updated.
})
// 8.
describe( 'Enter an invalid set of inputs and click Calculate to produce an error message.', () => {
    it ( '', async () => {
    })
//     After clicking Calculate, the description paragraph from step 2 should disappear.
// * A single Caution Icon and error message(s) should replace the entire result section.
// * The error text should be highlighted in the appropriate color.
})