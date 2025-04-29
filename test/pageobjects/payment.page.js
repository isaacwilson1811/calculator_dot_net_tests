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
    get buttonClear () { return $('//input[@type="button"][@value="Clear"]')}
    get resultHeader () { return $('//h2[@class="h2result"]') }
    get resultText () { return $('(//div[@class="rightresult"]/div)[2]') }
    get resultTableRows () { return $$('(//table[@class="cinfoT"]/tbody)[1]/tr')}

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
    async verifyResults({mode, header, body, tableData}){
        await this.assertText( this.resultHeader, { expectedText: header })
        await this.assertText( this.resultText, { expectedText: body })
        let dataIndex = 0; let numColumns = 2; let numRows = (mode == 'Fixed Term')? 2 : 3;
        for (let row = 1; row < numRows+1; row++) {
            for (let column = 1; column < numColumns+1; column++){
                const currentCell = $(`(((//table[@class="cinfoT"])[1]/tbody/tr)[${row}]/td)[${column}]`)
                await this.assertText( currentCell, { expectedText: tableData[dataIndex] })
                dataIndex++
            }
        }
    }
    async verifyClear(){

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
            await this.verifyResults({
                mode: 'Fixed Term',
                header: 'Monthly Payment:   $594.04',
                body: 'You will need to pay $594.04 every month for 5 years to payoff the debt.',
                tableData: ['Total of 60 Payments','$35,642.16','Total Interest','$5,642.16']
            })
        },
        'Positive test sample 2': async () => {
            await this.calculate({
                mode: 'Fixed Payments',
                monthlyPay: '38',
                loanAmount: '800',
                interestRate: '13'
            })
            await this.verifyResults({
                mode: 'Fixed Payments',
                header: 'Payoff: 2 years 0.02 months',
                body: 'You will need to pay $38.00 every month for 2 years 0.02 months to payoff the debt.',
                tableData: ['Time Required to Clear Debt','2.00 years','Total of 24.02 Payments','$912.92','Total Interest','$112.92']
            })
        }
    }
    CLEAR = {
        'Inputs empty after clicking Clear Button': async () => {
            await this.buttonFixTerm.click()
            await this.inputLoanTerm.setValue('10')
            await this.buttonFixPay.click()
            await this.inputMonthlyPay.setValue('10')
            await this.inputLoanAmount.setValue('10')
            await this.inputInterestRate.setValue('10')
            await this.buttonClear.click()
            await this.assertText(this.inputMonthlyPay, {expectedText: ''})
            await this.buttonFixTerm.click()
            await this.assertText(this.inputLoanTerm, {expectedText: ''})
            await this.assertText(this.inputLoanAmount, {expectedText: ''})
            await this.assertText(this.inputInterestRate, {expectedText: ''})
        }
    }
}

export default new Payment();
