import SalesTax from '../pageobjects/salestax.page.js'
import GUI from '../requirements/GUI.js'

// To run this test:
// npx wdio run wdio.conf.js --spec test/specs/test.salestax.ui.js

describe ( 'Heading element used for the component\'s title', () => {
    beforeEach ( async () => { await SalesTax.openComponentPage () } )

    it ( 'Should be the only instance of an h1 tag following semantic correctness', async () => {
        await SalesTax.checkElementCount ({ element: 'heading list', expectedCount: 1 })
    })

    it ( 'Should have text matching the component\'s title text', async () => {
        await SalesTax.checkElementText ({ element: 'heading', expectedText: GUI['Design Requirements'].language.approvedAppNames.calculators['Sales Tax Calculator'] })
    })

    it ( 'Should have text color of pre-defined accent color', async () => {
        await SalesTax.checkElementColor ({ element: 'heading', expectedColor: GUI['Design Requirements'].visuals.approvedColors.accentText['Silian Grail'] })
    })
})

describe ( 'Text element used for the component description', () => {
    beforeEach ( async () => { await SalesTax.openComponentPage () })

    it ( 'Should have text matching component description', async () => {
        await SalesTax.checkElementText ({ element: 'description', expectedText: GUI['Design Requirements'].language.approvedDescriptiveText.appID34534535 })
    })

})

describe ( 'Container element holding value inputs and function buttons', () => {
    beforeEach ( async () => { await SalesTax.openComponentPage () })

    it ( 'Should be horizontally centered in the layout', async () => {
        await SalesTax.checkElementAlign ({ element: 'input container children', expectedAlign: 'center' })
    })

    it ( 'Should have appropriate background color', async () => {
        await SalesTax.checkElementBackgroundColor ({ element: 'input container', expectedColor: GUI['Design Requirements'].visuals.approvedColors.backgrounds['Bone'] })
    })

    it ( 'Should have appropriate border stylings applied', async () => {
        await SalesTax.checkElementBorder ({
            element: 'input container', edgesToCheck: ['top', 'bottom', 'left', 'right'],
            expectedColor: GUI['Design Requirements'].visuals.approvedColors.borders['Eggshell'],
            expectedWidth: GUI['Design Requirements'].visuals.lines['primary line width'],
            expectedStyle: GUI['Design Requirements'].visuals.lines['primary line style']
        })
    })

    it ( 'Should contain an input labeled \'Before Tax Price\' with a dollar symbol on the left side of the input area', async () => {
        await SalesTax.checkElementExists ({ element: 'before tax price input' })
        await SalesTax.checkElementText ({ element: 'before tax price label', expectedText: 'Before Tax Price' })
        await SalesTax.checkElementBackgroundImage ({
            element: 'before tax price input',
            expectedImage: GUI['Design Requirements'].visuals.symbols.localizations['USA'].dollar,
            expectedPosition: '0% 50%'
        })
    })

})

// Locate the container element holding value inputs and function buttons.
// Enter a valid set of inputs and click Calculate to produce result section.
// Enter an invalid set of inputs and click Calculate to produce an error message.