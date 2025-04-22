                                                                    /*
[calculator.net] Sales Tax Calculator | UI Layout and Display
https://mtechqa.atlassian.net/browse/MTQA-2503
npx wdio run wdio.conf.js --spec test/specs/test.salestax.ui.js
                                                                    */
import SalesTax from '../pageobjects/salestax.page.js'

describe ( 'Navigate to the page for the component being tested.', () => {
    it ( 'Component page should be loaded.', async () => { await SalesTax.openComponentPage() })
})

// 1.
describe ( 'Heading element used for the component\'s title.', () => {

    it ( 'Should be the only instance of an h1 tag.', async () => {
        await SalesTax.checkElementCount (
            { 
                count: SalesTax.requiredCount,
                element: await SalesTax.locate ('heading as list')
            }
        )
    })

    it ( 'Should have text matching the component\'s title text.', async () => {
        await SalesTax.checkElementText (
            {
                text: SalesTax.requiredText.title,
                element: await SalesTax.locate ('heading')
            }
        )
    })

    it ( 'Should have text color of pre-defined accent color.', async () => {
        await SalesTax.checkElementColor (
            {
                color: SalesTax.requiredColors[0],
                element: await SalesTax.locate ('heading')
            }
        )
    })
})

// 2.
describe ( 'Text element used for the component description.', () => {

    it ( 'Should have text matching component description.', async () => {
        await SalesTax.checkElementText (
            {
                text: SalesTax.requiredText.description,
                element: await SalesTax.locate ('description')
            }
        )
    })
})

// 3.
describe ( 'Container element holding value inputs and function buttons.', () => {

    it ( 'Should have the assigned background color.', async () => {
        await SalesTax.checkElementBackgroundColor (
            {
                color: SalesTax.requiredColors[1],
                element: await SalesTax.locate ('input container')
            }
        )
    })

    it ( 'Should have appropriate border stylings applied.', async () => {
        await SalesTax.checkElementBorder (
            {
                color: SalesTax.requiredColors[2],
                width: SalesTax.requiredLineProperties[0],
                style: SalesTax.requiredLineProperties[1],
                edgesToCheck: ['top', 'bottom', 'left', 'right'],
                element: await SalesTax.locate ('input container'),
            }
        )
    })

    it ( 'Should be horizontally centered in the layout.', async () => {
        await SalesTax.checkElementAlign (
            {
                align: 'center',
                element: await SalesTax.locate ('input container children')
                
            }
        )
    })

    it ( 'Should contain an input labeled \'Before Tax Price\' with a dollar symbol on the left side of the input area.', async () => {
        const inputBeforeTax = await SalesTax.locate ('before tax price input'), labelBeforeTax = await SalesTax.locate ('before tax price label')
        await SalesTax.checkElementExists (
            { element: inputBeforeTax }
        )
        await SalesTax.checkElementText (
            {
                element: labelBeforeTax,
                text: SalesTax.requiredText.inputLabels[0]
            }
        )
        await SalesTax.checkElementBackgroundImage (
            {
                element: inputBeforeTax,
                image: SalesTax.requiredSymbols[1],
                position: '0% 50%'
            }
        )
    })

    it ( 'Should contain an input labeled \'Sales Tax Rate\' with a percentage symbol on the right side of the input area.', async () => {
        const inputSalesTax = SalesTax.locate ('sales tax rate input'), labelSalesTax = SalesTax.locate ('sales tax rate label')
        await SalesTax.checkElementExists (
            { element: inputSalesTax }
        )
        await SalesTax.checkElementText (
            {
                element: labelSalesTax,
                text: SalesTax.requiredText.inputLabels[1]
            }
        )
        await SalesTax.checkElementBackgroundImage (
            { 
                element: inputSalesTax,
                image: SalesTax.requiredSymbols[0],
                position: '100% 50%'
            }
        )
    })

    it ( 'Should contain an input labeled \'After Tax Price\' with a dollar symbol on the left side of the input area.', async () => {
        const inputAfterTax = SalesTax.locate ('after tax price input'), labelAfterTax = SalesTax.locate ('after tax price label')
        await SalesTax.checkElementExists (
            { element: inputAfterTax }
        )
        await SalesTax.checkElementText (
            {
                element: labelAfterTax,
                text: SalesTax.requiredText.inputLabels[2]
            }
        )
        await SalesTax.checkElementBackgroundImage (
            {
                element: inputAfterTax,
                image: SalesTax.requiredSymbols[1],
                position: '0% 50%'
            }
        )
    })

    it ( 'Should contain button labeled \'Calculate\' with a functioning hover state, appropriate colors, and play-arrow icon.', async () => {
        const button = await SalesTax.locate ('calculate button')
        await SalesTax.checkElementExists (
            { element: button }
        )
        await SalesTax.checkElementAttribute (
            {
                element: button,
                attribute: 'value',
                value: SalesTax.requiredText.inputLabels[3]
            }
        )
        await SalesTax.checkElementHoverStates (
            {
                element: button,
                before: SalesTax.requiredColors[3],
                after: SalesTax.requiredColors[4]
            }
        )
        await SalesTax.checkElementBackgroundImage (
            {
                element: button,
                image: SalesTax.requiredSymbols[2],
                position: '0%'
            }
        )
    })

    it ( 'Should contain a button labeled \'Clear\' with a functioning hover state and appropriate colors.', async () => {
        const button = await SalesTax.locate ('clear button')
        await SalesTax.checkElementExists (
            { element: button }
        )
        await SalesTax.checkElementAttribute (
            {
                element: button,
                attribute: 'value',
                value: SalesTax.requiredText.inputLabels[4]
            }
        )
        await SalesTax.checkElementHoverStates (
            {
                element: button,
                before: SalesTax.requiredColors[5],
                after: SalesTax.requiredColors[4]
            }
        )
    })

})

// 4.
describe ( 'Enter a valid set of inputs and click Calculate to produce result section.', () => {

    beforeEach( async () => {
        await SalesTax.calculate ({ beforeTax: 100, taxRate: 6.5 })
    })

    it ( 'Should Display an h2 heading element with text \'Result\' appropriate color and background color applied.', async () => {
        const heading = await SalesTax.locate ('result heading')
        await SalesTax.checkElementExists (
            { element: heading }
        )
        await SalesTax.checkElementText (
            {
                element: heading,
                text: SalesTax.requiredText.outputLabels[0]
            }
        )
        await SalesTax.checkElementColor (
            {
                element: heading,
                color: SalesTax.requiredColorsFunctional.important
            }
        )
        await SalesTax.checkElementBackgroundColor (
            {
                element: heading,
                color: SalesTax.requiredColors[6]
            }
        )
    })

    it ( 'Result Heading should contain Save Icon Button aligned to the right side of heading.', async () => {
        const icon = await SalesTax.locate ('save icon')
        await SalesTax.checkElementExists (
            { element: icon}
        )
        await SalesTax.checkElementCSSProperty (
            {
                element: icon,
                property: 'float',
                value: 'right'
            }
        )
    })

    it ( 'Should display 3 lines of large text describing results, one description per line with calculated values highlighted in appropriate color.', async () => {
        await SalesTax.checkElementCount (
            {
                count: 3,
                element: await SalesTax.locate ('results as list'),
            }
        )
        await SalesTax.checkElementAttribute (
            {
                element: await SalesTax.locate ('result line 2 value'),
                attribute: 'color',
                value: SalesTax.requiredColorsFunctional.success
            }
        )
        await SalesTax.checkElementAttribute (
            {
                element: await SalesTax.locate ('result line 3 value'),
                attribute: 'color',
                value: SalesTax.requiredColorsFunctional.success
            }
        )
    })

})

// 5.
describe ( 'Enter an invalid set of inputs and click Calculate to produce an error message.', () => { 

    beforeEach( async () => {
        await SalesTax.calculate ({ })
    })

    it ('An error message should appear, and the error text should be highlighted in the appropriate error color.', async () => {
        const message = await SalesTax.locate ('error message')
        await SalesTax.checkElementExists (
            { element: message }
        )
        await SalesTax.checkElementAttribute (
            {
                element: message,
                attribute: 'color',
                value: SalesTax.requiredColorsFunctional.warning
            }
        )
    })

})