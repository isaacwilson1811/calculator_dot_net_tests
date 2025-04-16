import SalesTax from '../pageobjects/salestax.page.js'
import { $, expect } from '@wdio/globals'
const accentColor = '#003366'

// Locate the heading element used for the component title.
describe('Locate the heading element used for the component title', () => {
    beforeEach(async ()=>{
        await SalesTax.navigateToPage()
        // await expect($('//sdkjfhsdkfjhsdfkjh')).toBeExisitng()
    })
    
    it('Should be the only instance of h1 tag', async () => {
        SalesTax.countHeadingElements()
        // throw new Error('Explicit failure')
    })

    it('Should have text matching \'Sales Tax Calculator\'', async () => {
        SalesTax.checkElementText('Sales Tax Calculator')
    })

    it('Should have text color of accentColor ', async () => {
        SalesTax.checkCSSProperty('color', 'brown')
    })
})




// Locate the text element used for the component description.
// Locate the container element holding value inputs and function buttons.
// Enter a valid set of inputs and click Calculate to produce result section.
// Enter an invalid set of inputs and click Calculate to produce an error message.