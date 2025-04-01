import { expect, browser } from '@wdio/globals'
import SalesTax from '../pageobjects/salestax.page.js'
import Salary from '../pageobjects/salary.page.js'
import Payment from '../pageobjects/payment.page.js'
import CompoundInterest from '../pageobjects/compoundinterest.page.js'

describe('Sales Tax Calculator', () => {
    it('Go to page', async () => {
        await SalesTax.navigateToPage()
        const currentUrl = await browser.getUrl()
        await expect(currentUrl).toBe('https://www.calculator.net/sales-tax-calculator.html')
    })
    it('Enter no values', async () => {
        await SalesTax.calculate({})
    })
    it('Enter 1 value', async () => {
        await SalesTax.calculate({afterTax:'300'})
    })
    it('Enter 3 values where after tax is less than before tax', async () => {
        await SalesTax.calculate({beforeTax:'200', taxRate:'10', afterTax:'100'})
    })
    it('Enter 2 values where after tax is less than before tax', async () => {
        await SalesTax.calculate({beforeTax:'200', afterTax:'100'})
    })
    it('Enter 3 values where before tax is zero', async () => {
        await SalesTax.calculate({beforeTax:'0', taxRate:'10', afterTax:'100'})
    })
    it('Enter 2 values where before tax is zero', async () => {
        await SalesTax.calculate({beforeTax:'0', taxRate:'10'})
    })
    it('Enter 1 value where before tax is zero', async () => {
        await SalesTax.calculate({beforeTax:'0'})
    })
})

// describe('Salary Calculator', () => {
//     it('Go to page', async () => {
//         await Salary.navigateToPage()
//         const currentUrl = await browser.getUrl()
//         await expect(currentUrl).toBe('https://www.calculator.net/salary-calculator.html')
//     })
//     it('Enter a value and calculate', async () => {
//         await Salary.calculate({salaryAmount:'18'})
//         await expect(Salary.annualUnadjusted).toHaveText('$37,440')
//     })
// })

// describe('Payment Calculator', () => {
//     it('Go to page', async () => {
//         await Payment.navigateToPage()
//         const currentUrl = await browser.getUrl()
//         await expect(currentUrl).toBe('https://www.calculator.net/payment-calculator.html')
//     })
//     it('Enter a value and calculate', async () => {
//         await Payment.calculate({loanAmount:'100'})
//         await expect(Payment.monthlyPayment).toHaveText('Monthly Payment:   $0.84')
//     })
// })

// describe('Compound Interest Calculator', () => {
//     it('Go to page', async () => {
//         await CompoundInterest.navigateToPage()
//         const currentUrl = await browser.getUrl()
//         await expect(currentUrl).toBe('https://www.calculator.net/compound-interest-calculator.html')
//     })
//     it('Enter a value and calculate', async () => {
//         await CompoundInterest.calculate({interestRate:'2'})
//         await expect(CompoundInterest.result).toHaveText('2.01844%')
//     })
// })
