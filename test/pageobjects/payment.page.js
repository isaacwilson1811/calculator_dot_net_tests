import { $ } from '@wdio/globals'
import BasePage from './basepage.js'

class Payment extends BasePage {
    endpoint = 'payment-calculator.html'

    get buttonFixTerm () { return $('//a[@onclick="popNMenu(\'fixterm\',1);"]') }
    get inputLoanTerm () { return $('//input[@id="cloanterm"]') }
    get buttonFixPay () { return $('//a[@onclick="popNMenu(\'fixpay\',1);"]') }
    get inputMonthlyPay () { return $('//input[@id="cmonthlypay"]') }
    get inputLoanAmount () { return $('//input[@id="cloanamount"]') }
    get inputInterestRate () { return $('//input[@id="cinterestrate"]') }
    get buttonCalculate () { return $('//input[@type="submit"][@value="Calculate"]') }
    get resultHeader () { return $('//h2[@class="h2result"]') }

    async calculate ({mode, loanTerm, monthlyPay, loanAmount, interestRate}) {
        if (mode == 'Fixed Term'){
            await this.buttonFixTerm.click()
            await this.inputLoanTerm.setValue(loanTerm)
        } else if (mode == 'Fixed Payments') {
            await this.buttonFixPay.click()
            await this.inputMonthlyPay.setValue(monthlyPay)
        }
        await this.inputLoanAmount.setValue(loanAmount)
        await this.inputInterestRate.setValue(interestRate)
        await this.buttonCalculate.click()
    }


    BROWSER = {
        'Component page is loaded': async () => {
            await this.openComponentPage(this.endpoint)
        }
    }
    CALCULATE = {
        'Positive test sample 1': async () => {
            await this.calculate({
                mode: 'Fixed Term',
                loanTerm: '5',
                loanAmount: '30,000',
                interestRate: '7'
            })
            await this.assertText(this.resultHeader,{expectedText:'Monthly Payment:   $594.04'})
            // Need to assert the rest of the results. this is just a wip
        },
        'Positive test sample 2': async () => {
            await this.calculate({
                mode: 'Fixed Payments',
                monthlyPay: '38',
                loanAmount: '800',
                interestRate: '13'
            })
            await this.assertText(this.resultHeader,{expectedText:'Payoff: 2 years 0.02 months'})
            // Need to assert the rest of the results. this is just a wip
        }
    }
}

export default new Payment();
