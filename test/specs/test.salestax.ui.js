import SalesTax from '../pageobjects/salestax.page.js'
const accentColor = '#003366'
const componentDescriptionText = 'The Sales Tax Calculator can compute any one of the following, given inputs for the remaining two: before-tax price, sale tax rate, and final, or after-tax price.'

describe('Locate the heading element used for the component title', () => {

    beforeEach(async () =>{
        await SalesTax.navigateToPage()
    })

    it('Should be the only instance of h1 tag', async () => {
        await SalesTax.countHeadingElements()
    })

    it('Should have text matching \'Sales Tax Calculator\'', async () => {
        await SalesTax.checkElementText('header','Sales Tax Calculator')
    })

    it('Should have text color of accentColor ', async () => {
        await SalesTax.checkCSSProperty('color', accentColor)
    })
})


describe('Locate the text element used for the component description', () => {

    beforeEach(async () =>{
        await SalesTax.navigateToPage()
    })

    it('Should have text matching component description text', async () => {
        await SalesTax.checkElementText('description',`${componentDescriptionText}`)
    })

})

// Locate the container element holding value inputs and function buttons.
// Enter a valid set of inputs and click Calculate to produce result section.
// Enter an invalid set of inputs and click Calculate to produce an error message.