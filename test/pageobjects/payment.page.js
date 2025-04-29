import { $ } from '@wdio/globals'
import BasePage from './basepage.js'

class Payment extends BasePage {
    endpoint = 'payment-calculator.html'

    get inputLoanAmount () {
        return $('//input[@id="cloanamount"]')
    }

    get buttonCalculate () {
        return $('//input[@type="submit"][@value="Calculate"]');
    }

    get monthlyPayment () {
        return $('//h2[@class="h2result"]')
    }

    async calculate ({mode, loanTerm, monthlyPay, loanAmount, interestRate}) {
        if (mode == 'Fixed Term'){
            await this.buttonFixTerm.click()
            await this.inputLoanTerm.setValue(loanTerm)
        } else if (mode == 'Fixed Payments') {
            await this.buttonFixPay.click()
            await this.inputmonthlyPay.setValue()
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
}

export default new Payment();
