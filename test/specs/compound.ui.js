                                                                    /*
[calculator.net] Compound Interest Calculator | UI Layout and Display
https://mtechqa.atlassian.net/browse/MTQA-2507
npx wdio run wdio.conf.js --spec test/specs/compound.ui.js
                                                                    */
import Confirm from '../pageobjects/compound.page.js'
// Pre condition
describe ( 'Navigate to the page for the component being tested.', () => {
    it ( 'Component page should load.', async () => { 
        await Confirm.BROWSER[ 'Component page is loaded' ]()
    })
})
// 1.
describe ( 'Component title heading element.', () => {
    it ( 'Single h1 heading element with the text "Compound Interest Calculator" and appropriate text color applied.', async () => {
        await Confirm.UI[ 'Heading element meets requirements' ]()
    })
})
// 2.
describe ( 'Component description text element.', () => {
    it ( 'Paragraph element containing the full description text, “The Compound Interest Calculator below can...“', async () => {
        await Confirm.UI[ 'Description element meets requirements' ]()
    })
})
// 3.
describe ( 'Instructional heading image.', () => {
    it ( 'Instructional heading is displayed above input container, with correct img source and alt tag', async () => {
        await Confirm.UI[ 'Instruction heading meets requirements' ]()
    })
})
// 4.
describe ( 'Container element holding value inputs and function buttons.', () => {
    it ( 'The container should be horizontally centered in the content column with the appropriate background color and border applied.', async () => {
        await Confirm.UI[ 'Input container meets requirements' ]()
    })
    it ( 'Input Interest label with text input field below it. Percentage symbol on the right of the input area.', async () => {
        await Confirm.UI[ 'Interest Input and Label meet requirements' ]()
    })
    it ( 'Compound label with Dropdown selection list below it. List of Options Annually (APR), Semiannually, Quarterly, Monthly (APR), Semimonthly, Biweekly, Weekly, Daily, Continuously', async () => {
        await Confirm.UI[ 'Compound 1 dropdown and Label meet requirements' ]()
    })
    it ( 'Output Interest label with non interactive highlighted number as a percentage below it.', async () => {
        await Confirm.UI['Output Interest element and label meet requirements']()
    })
    it ( 'A second Compound label with a Dropdown selection list below it that is identical to the first.', async () => {
        await Confirm.UI[ 'Compound 2 dropdown and Label meet requirements' ]()
    })
})
// 5.
describe ( 'Enter a valid set of inputs and click Calculate to produce result section.', () => {
    it ( 'The instructional image heading disappears.', async () => {})
    it ( 'h2 heading element with text \'Result\' and appropriate text / background color applied.', async () => {})
    it ( 'Lines of large result description text with calculated values highlighted in appropriate color.', async () => {})
})
// 6.
describe ( 'Enter an invalid set of inputs and click Calculate to produce an error message.', () => {
    it ( 'The instructional image heading disappears.', async () => {})
    it ( 'A single Caution icon and error message(s) are displayed above the input container.', async () => {})
    it ( 'Text is highlighted in appropriate error color.', async () => {})
    it ( 'Text below Output Interest is displayed as “?%“', async () => {})
})