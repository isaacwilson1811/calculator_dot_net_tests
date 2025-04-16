import { $ } from '@wdio/globals'
import BasePage from './basepage.js'

class Payment extends BasePage {

    get inputLoanAmount () {
        return $('//input[@id="cloanamount"]')
    }

    get buttonCalculate () {
        return $('//input[@type="submit"][@value="Calculate"]');
    }

    get monthlyPayment () {
        return $('//h2[@class="h2result"]')
    }

    async calculate ({loanAmount}) {
        await this.inputLoanAmount.setValue(loanAmount)
        await this.buttonCalculate.click()
    }

    navigateToPage () {
        return super.open('payment-calculator.html')
    }
}

export default new Payment();
