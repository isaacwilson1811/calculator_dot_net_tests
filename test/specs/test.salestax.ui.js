import SalesTax from '../pageobjects/salestax.page.js'
import GUI from '../requirements/GUI.js'

const requiredLimits = [GUI['Design Requirements'].semantics.elementLimits.h1]
const requiredLineProperties = [GUI['Design Requirements'].visuals.lines['primary line width'], GUI['Design Requirements'].visuals.lines['primary line style']]
const requiredColors = [
    GUI['Design Requirements'].visuals.approvedColors.accentText['Silian Grail'],
    GUI['Design Requirements'].visuals.approvedColors.backgrounds['Bone'],
    GUI['Design Requirements'].visuals.approvedColors.borders['Eggshell'],
    GUI['Design Requirements'].visuals.approvedColors.backgrounds['Go Money Green'],
    GUI['Design Requirements'].visuals.approvedColors.backgrounds['Luxurious Granite'],
    GUI['Design Requirements'].visuals.approvedColors.backgrounds['Mistake Grey']
]
const requiredText = [
    GUI['Design Requirements'].language.approvedApps.appID34534535.title,
    GUI['Design Requirements'].language.approvedApps.appID34534535.description,
    GUI['Design Requirements'].language.approvedApps.appID34534535.inputLabels
]
const requiredSymbols = [
    GUI['Design Requirements'].visuals.symbols.percentage,
    GUI['Design Requirements'].visuals.symbols.localizations['USA'].dollar,
    GUI['Design Requirements'].visuals.symbols.start_play_go_execute
]

/* [calculator.net] Sales Tax Calculator | UI Layout and Display */
// https://mtechqa.atlassian.net/browse/MTQA-2503

// To manually and locally run test:
// npx wdio run wdio.conf.js --spec test/specs/test.salestax.ui.js

//Pre condition
describe ('Pre condition to navigate to component page', () => {
    it ('Should be on component page', async () => {
        await SalesTax.openComponentPage()
    })
})


describe ( 'Heading element used for the component\'s title', () => {
    
    const title = 'heading'

    it ( 'Should be the only instance of an h1 tag', async () => {
        await SalesTax.checkElementCount (
            {
                element: `${title} list`,
                count: requiredLimits[0]
            }
        )
    })

    it ( 'Should have text matching the component\'s title text', async () => {
        await SalesTax.checkElementText (
            {
                element: title,
                text: requiredText[0]
            }
        )
    })

    it ( 'Should have text color of pre-defined accent color', async () => {
        await SalesTax.checkElementColor (
            {
                element: title,
                color: requiredColors[0]
            }
        )
    })
})

describe ( 'Text element used for the component description', () => {
    it ( 'Should have text matching component description', async () => {
        await SalesTax.checkElementText (
            {
                element: 'description',
                text: requiredText[1]
            }
        )
    })
})

describe ( 'Container element holding value inputs and function buttons', () => {

    const panel = 'input container'

    it ( 'Should be horizontally centered in the layout', async () => {
        await SalesTax.checkElementAlign (
            {
                element: `${panel} children`,
                align: 'center' 
            }
        )
    })

    it ( 'Should have appropriate background color', async () => {
        await SalesTax.checkElementBackgroundColor (
            {
                element: panel,
                color: requiredColors[1]
            }
        )
    })

    it ( 'Should have appropriate border stylings applied', async () => {
        await SalesTax.checkElementBorder (
            {
                element: panel,
                edgesToCheck: ['top', 'bottom', 'left', 'right'],
                color: requiredColors[2],
                width: requiredLineProperties[0],
                style: requiredLineProperties[1]
            }
        )
    })

    it ( 'Should contain an input labeled \'Before Tax Price\' with a dollar symbol on the left side of the input area', async () => {
        await SalesTax.checkElementExists (
            {
                element: 'before tax price input'
            }
        )
        // await SalesTax.checkElementIsChildOfParent({child: 'before tax price input',parent: panel})
        await SalesTax.checkElementText (
            {
                element: 'before tax price label',
                text: requiredText[2][0]
            }
        )
        await SalesTax.checkElementBackgroundImage (
            {
                element: 'before tax price input',
                image: requiredSymbols[1],
                position: '0% 50%' 
            }
        )
    })

    it ( 'Should contain an input labeled \'Sales Tax Rate\' with a percentage symbol on the right side of the input area', async () => {
        await SalesTax.checkElementExists ({ element: 'sales tax rate input' })
        await SalesTax.checkElementText ({ element: 'sales tax rate label', text: requiredText[2][1] })
        await SalesTax.checkElementBackgroundImage (
            {
                element: 'sales tax rate input',
                image: requiredSymbols[0],
                position: '100% 50%'
            }
        )
    })

    it ( 'Should contain an input labeled \'After Tax Price\' with a dollar symbol on the left side of the input area', async () => {
        const input = 'after tax price'
        await SalesTax.checkElementExists ({ element: `${input} input` })
        await SalesTax.checkElementText ({ element: `${input} label`, text: requiredText[2][2] })
        await SalesTax.checkElementBackgroundImage (
            {
                element: `${input} input`,
                image: requiredSymbols[1],
                position: '0% 50%'
            }
        )
    })

    it ( 'Should contain button labeled \'Calculate\' with a functioning hover state, appropriate colors, and play-arrow icon.', async () => {
        const button = 'calculate button'
        await SalesTax.checkElementExists (
            { element: button }
        )
        await SalesTax.checkElementAttribute (
            {
                element: button,
                attribute: 'value',
                value: requiredText[2][3]
            }
        )
        await SalesTax.checkElementHoverBackgroundColor (
            {
                element: button,
                before: requiredColors[3],
                after: requiredColors[4]
            }
        )
        await SalesTax.checkElementBackgroundImage (
            {
                element: button,
                image: requiredSymbols[2],
                position: '0%'
            }
        )
    })

    it ( 'Should contain a button labeled \'Clear\' with a functioning hover state and appropriate colors', async () => {
        const button = 'clear button'
        await SalesTax.checkElementExists (
            { element: button }
        )
        await SalesTax.checkElementAttribute (
            {
                element: button,
                attribute: 'value',
                value: requiredText[2][4]
            }
        )
        await SalesTax.checkElementHoverBackgroundColor (
            {
                element: button,
                before: requiredColors[5],
                after: requiredColors[4]
            }
        )
    })

})
describe ( 'Enter a valid set of inputs and click Calculate to produce result section', () => {
    it ('Calculates a Result', async () => {
        await SalesTax.calculate({beforeTax: 1, afterTax: 2})
    })
    it ('Displays h2 heading element with text \'Result\' appropriate color and background color applied', async () => {
        // WORK IN PROGRESS
    })
})


// Enter a valid set of inputs and click Calculate to produce result section.
// Enter an invalid set of inputs and click Calculate to produce an error message.