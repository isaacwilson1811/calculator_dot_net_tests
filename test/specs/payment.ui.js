                                                                    /*
[calculator.net] Payment Calculator | UI Layout and Display
https://mtechqa.atlassian.net/browse/MTQA-2506
npx wdio run wdio.conf.js --spec test/specs/payment.ui.js
                                                                    */
import Confirm from '../pageobjects/payment.page.js'
// Pre condition
describe ( 'Navigate to the page for the component being tested.', () => {
    it ( 'Component page should load.', async () => { 
        await Confirm.BROWSER[ 'Component page is loaded' ]()
    })
})
// 1.
describe ( 'Component title heading element.', () => {
    it ( 'Single instance of h1 heading element with the text "Payment Calculator" and appropriate text color applied.', async () => {
        await Confirm.UI[ 'Component title heading meets requirements' ]()
    })
})
// 2.
describe ( 'Component description text element.', () => {
    it ( 'Paragraph element containing the description text, "The Payment Calculator can determine..."', async () => {
        await Confirm.UI[ 'Description element meets requirements' ]()
    })
})
// 3.
describe ( 'Usage instruction heading image.', () => {
    it ( 'Usage instruction heading image is visible above input container and result section.', async () => {
        await Confirm.UI[ 'Instruction heading meets requirements' ]()
    })
})
// 4.
describe ( 'Input container element.', () => {
    it ( 'Container should be displayed on the left hand side of the content area.', async () => {
        await Confirm.UI[ 'Input container meets requirements' ]()
    })
    it ( '2 Tabs labeled Fixed Term and Fixed Payments', async () => {
        await Confirm.UI[ '2 Tab buttons labeled Fixed Term and Fixed Payments are present' ]()
    })
    it ( 'Loan Amount label and input field with dollar symbol on the left side.', async () => {
        await Confirm.UI[ 'Loan Amount input and label meet requirements' ]()
    })
    it ( 'Loan Term label and input field with faded background text "years" on the right side.', async () => {
        await Confirm.UI[ 'Loan Term input and label meet requirements' ]()
    })
    it ( 'Interest Rate label and input field with percentage symbol on the right side.', async () => {
        await Confirm.UI[ 'Interest Rate input and label meet requirements' ]()
    })
    it ( 'Calculate button with hover state, play-arrow icon, appropriate colors applied.', async () => {
        await Confirm.UI[ 'Calculate button meets requirements' ]()
    })
    it ( 'Clear button with hover state and appropriate colors applied.', async () => {
        await Confirm.UI[ 'Clear button meets requirements' ]()
    })
})
// 5.
describe ( 'Hover over, then click Fixed Payments tab', () => {
    it ( 'Fixed Payment tab has an inactive, hover, and active state.', async () => {
        await Confirm.UI[ 'Fixed Payment button meets hover and active requirements' ]()
    })
    it ( 'After Clicked: Loan Term label and input are replaced with Monthly Pay label and input with dollar symbol on the left.', async () => {
        await Confirm.UI[ 'After clicking Fixed Payments. Fixed Payment mode inputs are visible, and Fixed Term inputs are hidden' ]()
    })
})
// 6.
describe ( 'Hover over, then click Fixed Term tab', () => {
    it ( 'Fixed Term tab has an inactive, hover, and active state.', async () => {
        await Confirm.UI[ 'Fixed Term button meets hover and active requirements' ]()
    })
    it ( 'After Clicked: Monthly Pay label and input are replaced with Loan Term from step 4.', async () => {
        await Confirm.UI[ 'After clicking Fixed Term. Fixed Term mode inputs are visible, and Fixed Payments inputs are hidden' ]()
    })
})
// 7.
describe ( 'Result section', () => {
    it ( 'Payment results section is displayed to the right side of input container:', async () => {
        await Confirm.UI[ 'Result section is placed to the right of inputs' ]()
    })
    it ( 'h2 heading element with text "Monthly Payment: $..." and appropriate text / background color applied.', async () => {
        await Confirm.UI['Results heading meets requirments']()
    })
    it ( 'Text paragraph displaying “You will need to pay $...”', async () => {
        await Confirm.UI[ 'Results text meest requirements' ]()
    })
    it ( '2x2 Table displaying Total of __ Payments, dollar amount, Total Interest, dollar amount. Table rows alternate background color and have cell borders applied.', async () => {
        await Confirm.UI['Result table meets requirements']()
    })
})
// 8.
describe ( 'Enter a valid set of inputs with Fixed Term tab selected and click Calculate.', () => {
    it ( 'The values in the payment results are updated.', async () => {
        await Confirm.UI[ 'Valid inputs update results' ]()
    })
    it ( 'The description paragraph from step 2 disappears.', async () => {
        await Confirm.UI[ 'Description paragraph is no longer on the page' ]()
    })
})
// 9.
describe ( 'Enter a valid set of inputs with Fixed Payments tab selected and click Calculate.', () => {
    it ( 'Monthly Payment Heading text is replaced with “Payoff: _ years _ months“ \n A new table row is added to the top of the 2x2 table from step 7.\n Cells in the row display as “Time Required to Clear Debt“ and “_ years”\n The data in the results is updated.', async () => {
        await Confirm.UI[ 'Fixed Payments results meet requirements' ]()
    })
})
// 10.
describe ( 'Enter an invalid set of inputs with either tab selected and click Calculate to produce error message(s).', () => {
    it ( 'Error message(s) should replace the result section and error text should be highlighted in the appropriate color.', async () => {
        await Confirm.UI[ 'Error replaces results section. Error text meets requirements' ]()
    })
})