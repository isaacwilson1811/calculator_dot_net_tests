import SalesTax from '../pageobjects/salestax.page.js'
import GUI from '../requirements/GUI.js'

const requiredColors = [
    GUI['Design Requirements'].visuals.approvedColors.accentText['Silian Grail'],
    GUI['Design Requirements'].visuals.approvedColors.backgrounds['Bone'],
    GUI['Design Requirements'].visuals.approvedColors.borders['Eggshell']
]
const requiredText = [
    GUI['Design Requirements'].language.approvedApps.appID34534535.title,
    GUI['Design Requirements'].language.approvedApps.appID34534535.description,
    GUI['Design Requirements'].language.approvedApps.appID34534535.inputLabels
]
const requiredSymbols = [
    GUI['Design Requirements'].visuals.symbols.percentage,
    GUI['Design Requirements'].visuals.symbols.localizations['USA'].dollar
]
const requiredLimits = [
    GUI['Design Requirements'].semantics.elementLimits.h1
]

/* [calculator.net] Sales Tax Calculator | UI Layout and Display */
// To manually and locally run test:
// npx wdio run wdio.conf.js --spec test/specs/test.salestax.ui.js

describe ( 'Heading element used for the component\'s title', () => {
    beforeEach ( async () => { await SalesTax.openComponentPage () } )

    it ( 'Should be the only instance of an h1 tag', async () => {
        await SalesTax.checkElementCount ({ element: 'heading list', count: requiredLimits[0] })
    })

    it ( 'Should have text matching the component\'s title text', async () => {
        await SalesTax.checkElementText ({ element: 'heading', text: requiredText[0] })
    })

    it ( 'Should have text color of pre-defined accent color', async () => {
        await SalesTax.checkElementColor ({ element: 'heading', color: requiredColors[0]})
    })
})

describe ( 'Text element used for the component description', () => {
    beforeEach ( async () => { await SalesTax.openComponentPage () })

    it ( 'Should have text matching component description', async () => {
        await SalesTax.checkElementText ({ element: 'description', text: requiredText[1] })
    })

})

describe ( 'Container element holding value inputs and function buttons', () => {
    beforeEach ( async () => { await SalesTax.openComponentPage () })

    it ( 'Should be horizontally centered in the layout', async () => {
        await SalesTax.checkElementAlign ({ element: 'input container children', align: 'center' })
    })

    it ( 'Should have appropriate background color', async () => {
        await SalesTax.checkElementBackgroundColor ({ element: 'input container', color: requiredColors[1] })
    })

    it ( 'Should have appropriate border stylings applied', async () => {
        await SalesTax.checkElementBorder ({
            element: 'input container', edgesToCheck: ['top', 'bottom', 'left', 'right'],
            color: requiredColors[2],
            width: GUI['Design Requirements'].visuals.lines['primary line width'],
            style: GUI['Design Requirements'].visuals.lines['primary line style']
        })
    })

    it ( 'Should contain an input labeled \'Before Tax Price\' with a dollar symbol on the left side of the input area', async () => {
        await SalesTax.checkElementExists ({ element: 'before tax price input' })
        await SalesTax.checkElementText ({ element: 'before tax price label', text: requiredText[2][0] })
        await SalesTax.checkElementBackgroundImage ({
            element: 'before tax price input', image: requiredSymbols[1], position: '0% 50%'
        })
    })

    it ( 'Should contain an input labeled \'Sales Tax Rate\' with a percentage symbol on the right side of the input area', async () => {
        await SalesTax.checkElementExists ({ element: 'sales tax rate input' })
        await SalesTax.checkElementText ({ element: 'sales tax rate label', text: requiredText[2][1] })
        await SalesTax.checkElementBackgroundImage ({
            element: 'sales tax rate input', image: requiredSymbols[0], position: '100% 50%'
        })
    })

    it ( 'Should contain an input labeled \'After Tax Price\' with a dollar symbol on the left side of the input area', async () => {
        await SalesTax.checkElementExists ({ element: 'after tax price input' })
        await SalesTax.checkElementText ({ element: 'after tax price label', text: requiredText[2][2] })
        await SalesTax.checkElementBackgroundImage ({
            element: 'after tax price input',
            image: requiredSymbols[1],
            position: '0% 50%'
        })
    })

    it ( 'Should contain a Calculate button with a functioning hover state, appropriate colors, and play-arrow icon.', async () => {
        await SalesTax.checkElementExists ({element: 'calculate button'})
        await SalesTax.checkElementAttribute ({element: 'calculate button', attribute: 'value', value: requiredText[2][3] })
    })

})

// Locate the container element holding value inputs and function buttons.
// Enter a valid set of inputs and click Calculate to produce result section.
// Enter an invalid set of inputs and click Calculate to produce an error message.