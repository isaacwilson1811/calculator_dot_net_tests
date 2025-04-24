                                                                    /*
[calculator.net] Sales Tax Calculator | UI Layout and Display
https://mtechqa.atlassian.net/browse/MTQA-2503
npx wdio run wdio.conf.js --spec test/specs/test.salestax.ui.js
                                                                    */
import Confirmation from '../pageobjects/salestax.page.js'
// Pre condition
describe ( 'Navigate to the page for the component being tested.', () => {
    it ( 'Component page should load.', async () => { 
        await Confirmation[ 'Component page is loaded' ]()
    })
})
// 1.
describe ( 'Heading element used for the component\'s title.', () => {
    it ( 'Should be the only instance of an h1 tag.', async () => {
        await Confirmation [ 'Heading element is the only h1 on the page' ]()
    })
    it ( 'Should have text matching the component\'s title text.', async () => {
        await Confirmation [ 'Heading text content matches requirement' ]()
    })
    it ( 'Should have text color of pre-defined accent color.', async () => {
        await Confirmation [ 'Heading text color matches requirement' ]()
    })
})
// 2.
describe ( 'Text element used for the component description.', () => {
    it ( 'Should have text matching component description.', async () => {
        await Confirmation[ 'Description element text matches requirement' ]()
    })
})
// 3.
describe ( 'Container element holding value inputs and function buttons.', () => {
    it ( 'Should have the assigned background color.', async () => {
        await Confirmation[ 'Container has required background color' ]()
    })
    it ( 'Should have appropriate border stylings applied.', async () => {
        await Confirmation[ 'Container has required CSS border' ]()
    })
    it ( 'Should be horizontally centered in the layout.', async () => {
        await Confirmation[ 'Container is centered horizontally' ]()
    })
    it ( 'Should contain an input labeled \'Before Tax Price\' with a dollar symbol on the left side of the input area.', async () => {
        await Confirmation [ 'Before Tax Price input and label meet requirements' ]()
    })
    it ( 'Should contain an input labeled \'Sales Tax Rate\' with a percentage symbol on the right side of the input area.', async () => {
        await Confirmation [ 'Sales Tax Rate input and label meet requirements' ]()
    })
    it ( 'Should contain an input labeled \'After Tax Price\' with a dollar symbol on the left side of the input area.', async () => {
        await Confirmation [ 'After Tax Price input and label meet requirements' ]()  
    })
    it ( 'Should contain button labeled \'Calculate\' with a functioning hover state, appropriate colors, and play-arrow icon.', async () => {
        await Confirmation [ 'Calculate button meets requirements' ]()
    })
    it ( 'Should contain a button labeled \'Clear\' with a functioning hover state and appropriate colors.', async () => {
        await Confirmation [ 'Clear button meets requirments' ]()
    })
})
// 4.
describe ( 'Enter a valid set of inputs and click Calculate to produce result section.', () => {
    it ( 'Should calculate valid inputs', async () => {
        await Confirmation[ 'Valid inputs calculated' ]()
    })
    it ( 'Should Display an h2 heading element with text \'Result\' appropriate color and background color applied.', async () => {
        await Confirmation [ 'Result Heading meets requirements' ]()
    })
    it ( 'Result Heading should contain Save Icon Button aligned to the right side of heading.', async () => {
        await Confirmation [ 'Save Icon is aligned to the right' ]()
    })
    it ( 'Should display 3 lines of large text describing results, one description per line with calculated values highlighted in appropriate color.', async () => {
        await Confirmation [ 'Result text lines meet requirements' ]()
    })
})
// 5.
describe ( 'Enter an invalid set of inputs and click Calculate to produce an error message.', () => { 
    it( 'Should produce error when calculating invalid input', async () => {
        await Confirmation [ 'Invalid inputs produced an error message' ]()
    })
    it ('An error message should appear, and the error text should be highlighted in the appropriate error color.', async () => {
        await Confirmation [ 'Error message is displayed and using required color' ]()
    })
})