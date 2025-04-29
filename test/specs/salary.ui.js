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
    it ( 'Input and label containing text text: "Salary amount". Input has dollar sign background image aligned to the left.', async () => {
        await Confirm.UI[ 'Salary ammount input and label meet requirements' ]()
    })
    it ( 'Unit selection dropdown list defaulting to "Hour". Contains options: Hour, Day, Week, Bi-Week, Semi-month, Month, Quarter, Year', async () => {
        await Confirm.UI[ 'Unit select meets requirments' ]()
    })
    it ( 'Input and label with text: "Hours per week"', async () => {
        await Confirm.UI[ 'Hours per week input and label meet requirements' ]()
    })
    it ( 'Input and label with text: "Days per week"', async () => {
        await Confirm.UI[ 'Days per week input and label meet requirements' ]()
    })
    it ( 'Input and label with text: "Holidays per year"', async () => {
        await Confirm.UI[ 'Holidays per year input and label meet requirements' ]()
    })
    it ( 'Input and label with text: "Vacation days per year"', async () => {
        await Confirm.UI[ 'Vacation days per year input and label meet requirements' ]()
    })
    it ( 'Calculate button with a functioning hover state, appropriate colors, and play-arrow icon.', async () => {
        await Confirm.UI[ 'Calculate button meets requirements' ]()
    })
    it ( 'Clear button with a functioning hover state and appropriate colors applied.', async () => {
        await Confirm.UI[ 'Clear button meets requirments' ]()
    })
})
// 5.
describe( 'Result section and data table', () => {
    it ( 'Result section is displayed to the right of input container', async () => {
        await Confirm.UI[ 'Results are displayed to the right of inputs' ]()
    })
    it ( 'h2 heading element with text "Result" and appropriate text / background color applied.', async () => {
        await Confirm.UI[ 'Result Heading meets requirements' ]()
    })
    it ( 'Save Icon aligned to the right side of heading.', async () => {
        await Confirm.UI[ 'Save Icon is aligned to the right' ]()
    })
    it ( 'Result Table with 3 columns, 1 heading row and 8 data rows:', async () => {
        await Confirm.UI[ 'Result Table row and column count meets requirements' ]()
    })
    it ( 'Table heading row displays column labels (blank), “Unadjusted”, and “Holidays & vacation days adjusted”. Required text color and background color are applied.', async () => {
        await Confirm.UI[ 'Top row of results table meets requirements' ]()
    })
    it ( '8 Table data rows with alternating background color and cell borders applied.\n The column layout of the data rows are 1st column: Labels, 2nd column: dollar amounts, 3rd column: dollar amounts.\n Labels in 1st column are: Hourly, Daily, Weekly, Bi-weekly, Semi-monthly, Monthly, Quarterly, Annual', async () => {
        await Confirm.UI[ 'Data rows of result table meet background color and border requirements. Columns are labeled and meet text requirments.' ]()
    })
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