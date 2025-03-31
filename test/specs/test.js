import { expect, browser } from '@wdio/globals'
import SalesTax from '../pageobjects/salestax.page.js'

describe('Sales Tax Calculator', () => {
    it('Go to page', async () => {
        await SalesTax.navigateToPage()
        const currentUrl = await browser.getUrl()
        await expect(currentUrl).toBe('https://www.calculator.net/sales-tax-calculator.html')
    })
    it('Enter a value and calculate', async () => {
        await SalesTax.calculate({beforeTax:'200'})
        await expect(SalesTax.result).toHaveText('$213.00')
    })
})

