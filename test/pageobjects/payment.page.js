import { $ } from '@wdio/globals'
import BasePage from './basepage.js'

class Payment extends BasePage {
    // Component Page
    endpoint = 'payment-calculator.html'
    // Required Text Values
    requiredText = {
        title: 'Payment Calculator',
        description: 'The Payment Calculator can determine the monthly payment amount or loan term for a fixed interest loan. Use the "Fixed Term" tab to calculate the monthly payment of a fixed-term loan. Use the "Fixed Payments" tab to calculate the time to pay off a loan with a fixed monthly payment. For more information about or to do calculations specifically for car payments, please use the Auto Loan Calculator. To find net payment of salary after taxes and deductions, use the Take-Home-Pay Calculator.',
        inputLabels: { loanAmount: 'Loan Amount', loanTerm: 'Loan Term', monthlyPay: 'Monthly Pay' }
    }
    // Element Selectors
    get componentHeading () { return $('//h1') }
    get arrayOfComponentHeading () { return $$('//h1') }
    get componentDescriptionParagraph () { return $('(//div[@id="content"]/p)[1]') }
    get instructionHeadingImg () { return $('//div[@id="insmdc"]/img') }
    get buttonFixTerm () { return $('//a[@onclick="popNMenu(\'fixterm\',1);"]') }
    get inputLoanTerm () { return $('//input[@id="cloanterm"]') }
    get inputLoanTermLabel () { return $(`//td[contains(text(),"${this.requiredText.inputLabels.loanTerm}")]`) }
    get buttonFixPay () { return $('//a[@onclick="popNMenu(\'fixpay\',1);"]') }
    get inputMonthlyPay () { return $('//input[@id="cmonthlypay"]') }
    get inputMonthlyPayLabel () { return $(`//td[contains(text(),"${this.requiredText.inputLabels.monthlyPay}")]`) }
    get inputLoanAmount () { return $('//input[@id="cloanamount"]') }
    get inputLoanAmountLabel () { return $(`//td[contains(text(),"${this.requiredText.inputLabels.loanAmount}")]`) }
    get inputInterestRate () { return $('//input[@id="cinterestrate"]') }
    get buttonCalculate () { return $('//input[@type="submit"][@value="Calculate"]') }
    get buttonClear () { return $('//input[@type="button"][@value="Clear"]')}
    get resultContainer () { return $('//div[@class="rightresult"]') }
    get resultHeader () { return $('//h2[@class="h2result"]') }
    get resultText () { return $('(//div[@class="rightresult"]/div)[2]') }
    get resultTableRows () { return $$('(//table[@class="cinfoT"]/tbody)[1]/tr')}
    get errorSection () { return $('//div[@style="padding: 5px 0px 5px 30px;background-image: url(\'//d26tpo4cm8sb6k.cloudfront.net/img/svg/error.svg\');background-repeat: no-repeat;"]')}
    get errorMessages () { return $$('//div[@style="padding: 5px 0px 5px 30px;background-image: url(\'//d26tpo4cm8sb6k.cloudfront.net/img/svg/error.svg\');background-repeat: no-repeat;"]/div/font')}
    get inputContainer () { return $('//div[@class="panel2"]/table') }
    get inputForm () { return $('//form[@name="calform"]') }

    // Component functions
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
    async verifyErrors(expectedErrors) { 
        let count = 0
        for (const message in this.errorMessages) {
            const text = await message.getHTML()
            await expect(text).toBe(expectedErrors[count])
            count++
        }
    }

    // Test logic
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
        },
        'Fixed Term MIN': async () => {
            await this.calculate({
                mode: 'Fixed Term',
                loanTerm: '1',
                loanAmount: '1',
                interestRate: '0'
            })
            await this.verifyResults({
                mode: 'Fixed Term',
                header: 'Monthly Payment:   $0.08',
                body: 'You will need to pay $0.08 every month for 1 years to payoff the debt.',
                tableData: ['Total of 12 Payments','$1.00','Total Interest','$0.00']
            })
        },
        'Fixed Payments MIN': async () => {
            await this.calculate({
                mode: 'Fixed Payments',
                monthlyPay: '1',
                loanAmount: '1',
                interestRate: '0'
            })
            await this.verifyResults({
                mode: 'Fixed Payments',
                header: 'Payoff: 1.00 months',
                body: 'You will need to pay $1.00 every month for 1.00 months to payoff the debt.',
                tableData: ['Time Required to Clear Debt','0.08 years','Total of 1 Payments','$1.00','Total Interest','$0.00']
            })
        },
        'Fixed Term MAX': async () => {
            await this.calculate({
                mode: 'Fixed Term',
                loanTerm: '100',
                loanAmount: '100,000,000,000',
                interestRate: '99'
            })
            await this.verifyResults({
                mode: 'Fixed Term',
                header: 'Monthly Payment:   $8,250,000,000.00',
                body: 'You will need to pay $8,250,000,000.00 every month for 100 years to payoff the debt.',
                tableData: ['Total of 1,200 Payments','$9,900,000,000,000.00','Total Interest','$9,800,000,000,000.00']
            })
        },
        'Fixed Payments MAX': async () => {
            await this.calculate({
                mode: 'Fixed Payments',
                monthlyPay: '8,250,000,001.00',
                loanAmount: '100,000,000,000',
                interestRate: '99'
            })
            await this.verifyResults({
                mode: 'Fixed Payments',
                header: 'Payoff: 24 years 0.04 months',
                body: 'You will need to pay $8,250,000,001.00 every month for 24 years 0.04 months to payoff the debt.',
                tableData: ['Time Required to Clear Debt','24.00 years','Total of 288.04 Payments','$2,376,291,677,694.53','Total Interest','$2,276,291,677,694.53']
            })
        }
    }
    CLEAR = {
        'Inputs are empty after clicking Clear button': async () => {
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
    ERROR = {
        'Fixed Term and all -1 values produces specific errors': async () => {
            await this.calculate({
                mode: 'Fixed Term',
                loanTerm: '-1',
                loanAmount: '-1',
                interestRate: '-1'
            })
            await this.verifyErrors([
                'Please provide a positive loan amount value.',
                'Please provide a positive interest rate value.',
                'Please provide a positive loan term value.'
            ])
        },
        'Fixed Payments and all -1 values produces specific errors': async () => {
            await this.calculate({
                mode: 'Fixed Payments',
                monthlyPay: '-1',
                loanAmount: '-1',
                interestRate: '-1'
            })
            await this.verifyErrors([
                'Please provide a positive loan amount value.',
                'Please provide a positive interest rate value.',
                'Please provide a positive monthly pay amount value.'
            ])
        }
    }
    UI = {
        'Component title heading meets requirements': async () => {
            await this.assertArrayLength( this.arrayOfComponentHeading, { expectedLength: 1 })
            await this.assertText( this.componentHeading, { expectedText: this.requiredText.title })
            await this.assertColor( this.componentHeading, {
                type: 'text', colorFormat: 'hex',
                expectedColor: this.requiredColors[0]
            })
        },
        'Description element meets requirements': async () => {
            await this.assertText ( this.componentDescriptionParagraph, { 
                expectedText: this.requiredText.description
            })
        },
        'Instruction heading meets requirements': async () => {
            await this.assertOrderInDOM({
                elementFirst: this.instructionHeadingImg,
                elementSecond: this.inputForm
            })
            await this.assertAttributeValue( this.instructionHeadingImg, {
                attribute: 'src',
                expectedValue: '//d26tpo4cm8sb6k.cloudfront.net/img/svg/insm.svg'
            })
            await this.assertAttributeValue( this.instructionHeadingImg, {
                attribute: 'alt',
                expectedValue: 'Modify the values and click the calculate button to use'
            })
        },
        'Input container meets requirements': async () => {
            await this.assertOrderInDOM({
                elementFirst: this.inputContainer,
                elementSecond: this.resultContainer
            })
        },
        '2 Tab buttons labeled Fixed Term and Fixed Payments are present': async () => {
            await this.assertExists(this.buttonFixPay)
            await this.assertExists(this.buttonFixTerm)
        },
        'Loan Amount input and label meet requirements': async () => {
            await this.assertDisplayed(this.inputLoanAmountLabel)
            await this.assertBackgroundImage(this.inputLoanAmount, {
                expectedImageURL: this.requiredSymbols[1],
                expectedPosition: '0% 50%'
            })
        },
        'Loan Term input and label meet requirements': async () => {
            await this.assertDisplayed(this.inputLoanTermLabel)
            await this.assertDisplayed(this.inputLoanTerm)
            await this.assertExists($('//span[@class="inuiyearspan"][contains(text(),"years")]'))
        },
        'Interest Rate input and label meet requirements': async () => {
            await this.assertExists($('//td[contains(text(),"Interest Rate")]'))
            await this.assertExists(this.inputInterestRate)
            await this.assertBackgroundImage(this.inputInterestRate, {
                expectedImageURL: this.requiredSymbols[0],
                expectedPosition: '100% 50%'
            })
        },
        'Calculate button meets requirements': async () => {
            const button = this.buttonCalculate
            await this.assertAttributeValue ( button, {
                attribute: 'value',
                expectedValue: this.requiredButtonLabels.Calc
            })
            await this.assertHoverEffectBGC ( button, { expectedBGColorOnHover: this.requiredColors[4]})
            await this.assertBackgroundImage ( button, {
                expectedImageURL: this.requiredSymbols[2],
                expectedPosition: '0%'
            })
        },
        'Clear button meets requirements': async () => {
            const button = this.buttonClear
            await this.assertAttributeValue ( button, {
                attribute: 'value',
                expectedValue: this.requiredButtonLabels.Clr
            })
            await this.assertHoverEffectBGC ( button, { expectedBGColorOnHover: this.requiredColors[4] })
        },
        'Fixed Payment button meets hover and active requirements': async () => {
            // inactive state
            await this.assertColor(this.buttonFixPay, {expectedColor: '#ffffff', type:'text', colorFormat: 'hex'})
            await this.assertColor(this.buttonFixPay, {expectedColor: '#336699', type:'background', colorFormat: 'hex'})
            // hover state
            await this.assertHoverEffectBGC(this.buttonFixPay,{
                expectedBGColorOnHover: '#eeeeee'
            })
            // click
            await this.buttonFixPay.click()
            // active state
            await this.assertColor(this.buttonFixPay, {expectedColor: '#000000', type:'text', colorFormat: 'hex'})
            await this.assertColor(this.buttonFixPay, {expectedColor: '#eeeeee', type:'background', colorFormat: 'hex'})
        },
        'After clicking Fixed Payments. Fixed Payment mode inputs are visible, and Fixed Term inputs are hidden': async () => {
            await this.buttonFixPay.click()
            await this.assertDisplayed(this.inputLoanTerm, false)
            await this.assertDisplayed(this.inputLoanTermLabel, false)
            await this.assertDisplayed(this.inputMonthlyPay)
            await this.assertDisplayed(this.inputMonthlyPayLabel)
            // await expect($('//td[contains(text(),"Monthly Pay")]')).toBeDisplayed()
        },
        'Fixed Term button meets hover and active requirements': async () => {
            // inactive state
            await this.assertColor(this.buttonFixTerm, {expectedColor: '#ffffff', type:'text', colorFormat: 'hex'})
            await this.assertColor(this.buttonFixTerm, {expectedColor: '#336699', type:'background', colorFormat: 'hex'})
            // hover state
            await this.assertHoverEffectBGC(this.buttonFixTerm,{
                expectedBGColorOnHover: '#eeeeee'
            })
            // click
            await this.buttonFixTerm.click()
            // active state
            await this.assertColor(this.buttonFixTerm, {expectedColor: '#000000', type:'text', colorFormat: 'hex'})
            await this.assertColor(this.buttonFixTerm, {expectedColor: '#eeeeee', type:'background', colorFormat: 'hex'})
        },
        'After clicking Fixed Term. Fixed Term mode inputs are visible, and Fixed Payments inputs are hidden': async () => {
            await this.buttonFixTerm.click()
            await expect(this.inputMonthlyPay).not.toBeDisplayed()
            await expect($('//td[contains(text(),"Monthly Pay")]')).not.toBeDisplayed()
            await this.assertDisplayed(this.inputLoanTerm)
            await this.assertDisplayed(this.inputLoanTermLabel)
        },
        'Result section is placed to the right of inputs': async () => {
            await this.assertOrderInDOM({
                elementFirst: this.inputContainer,
                elementSecond: this.resultContainer
            })
        },
        'Results heading meets requirments': async () => {
            await expect(this.resultHeader).toBeDisplayed()
            await this.assertText(this.resultHeader,{expectedText: expect.stringContaining('Monthly Payment:')})
        },
        'Results text meest requirements': async () => {
            await expect(this.resultText).toBeDisplayed()
            await this.assertText(this.resultText,{expectedText: expect.stringContaining('You will need to pay $')})
        },
        'Result table meets requirements': async () => {
            await this.verifyResults({
                mode: 'Fixed Term',
                header: expect.stringContaining('Monthly Payment:'),
                body: expect.stringContaining('You will need to pay'),
                tableData: ['Total of 180 Payments',expect.stringContaining('$'),'Total Interest',expect.stringContaining('$')]
            })
        },
        'Valid inputs update results': async () => {
            await this.calculate({
                mode: 'Fixed Term',
                loanTerm: '15',
                loanAmount: '200,000',
                interestRate: '6'
            })
            await this.verifyResults({
                mode: 'Fixed Term',
                header: 'Monthly Payment:   $1,687.71',
                body: 'You will need to pay $1,687.71 every month for 15 years to payoff the debt.',
                tableData: ['Total of 180 Payments','$303,788.46','Total Interest','$103,788.46']
            })
        },
        'Description paragraph is no longer on the page': async () => {
            await expect($('(//div[@id="content"]/p)[1][contains(text(),"The Payment Calculator can determine")]')).not.toBeExisting()
        },
        'Fixed Payments results meet requirements': async () => {
            await this.buttonFixPay.click()
            await this.calculate({
                mode: 'Fixed Payments',
                monthlyPay: '1',
                loanAmount: '1',
                interestRate: '0'
            })
            await this.verifyResults({
                mode: 'Fixed Payments',
                header: expect.stringContaining('Payoff:'),
                body: expect.stringContaining('month'),
                tableData: [
                    'Time Required to Clear Debt',
                    expect.stringContaining('years'),
                    expect.stringContaining('Total'),
                    expect.stringContaining('$'),
                    'Total Interest',
                    expect.stringContaining('$')
                ]
            })
        },
        'Error replaces results section. Error text meets requirements': async () => {
            await this.calculate({
                mode: 'Fixed Payments',
                monthlyPay: '',
                loanAmount: '',
                interestRate: ''
            })
            await expect(this.resultHeader).not.toBeDisplayed()
            await this.assertAttributeValue(this.errorMessages[0],{
                attribute: 'color',
                expectedValue: this.requiredColorsFunctional.warning
            })
        }
    }
}

export default new Payment();
