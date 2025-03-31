import { expect, browser } from '@wdio/globals'
import SalesTax from '../pageobjects/salestax.page.js'
import Salary from '../pageobjects/salary.page.js'
import Payment from '../pageobjects/payment.page.js'

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

describe('Salary Calculator', () => {
    it('Go to page', async () => {
        await Salary.navigateToPage()
        const currentUrl = await browser.getUrl()
        await expect(currentUrl).toBe('https://www.calculator.net/salary-calculator.html')
    })
    it('Enter a value and calculate', async () => {
        await Salary.calculate({salaryAmount:'18'})
        await expect(Salary.annualUnadjusted).toHaveText('$37,440')
    })
})

describe('Payment Calculator', () => {
    it('Go to page', async () => {
        await Payment.navigateToPage()
        const currentUrl = await browser.getUrl()
        await expect(currentUrl).toBe('https://www.calculator.net/payment-calculator.html')
    })
    it('Enter a value and calculate', async () => {
        await Payment.calculate({loanAmount:'100'})
        await expect(Payment.monthlyPayment).toHaveText('Monthly Payment:   $0.84')
    })
})

