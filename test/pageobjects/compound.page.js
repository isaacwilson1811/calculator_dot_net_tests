import { $ } from '@wdio/globals'
import BasePage from './basepage.js';

class CompoundInterest extends BasePage {
    // Component Page
    endpoint = 'compound-interest-calculator.html'
    // Required Text Values
    requiredText = {
        title: 'Compound Interest Calculator',
        description: 'The Compound Interest Calculator below can be used to compare or convert the interest rates of different compounding periods. Please use our Interest Calculator to do actual calculations on compound interest.',
        instructions: 'Modify the values and click the calculate button to use',
        instructionsImgSrc: '//d26tpo4cm8sb6k.cloudfront.net/img/svg/insm.svg',
        errorMessages: [ 'Please provide a numeric input interest rate.' ],
        inputLabels: { inputInterest: 'Input Interest', outputInterest: 'Output Interest', compoundSelect: 'Compound' },
        compoundSelectValues: [ 'annually', 'semiannually', 'quarterly', 'monthly', 'semimonthly', 'biweekly', 'weekly', 'daily', 'continuously' ]
    }

    // Element Selectors
    get componentHeading () { return $('//h1') }
    get componentDescription () { return $('(//div[@id="content"]/p)[1]') }
    get arrayOfComponentHeading () { return $$('//h1') }
    get instructionHeadingImg () { return $('//div[@id="insmdc"]/img') }
    get inputPanel () { return $('//table[@class="panel"]') }
    get inputForm () { return $('//form[@name="calform"]') }
    get inputInterestRate () { return $('//input[@id="cinterestrate"]') }
    get selectInCompound () { return $('//select[@id="cincompound"]') }
    get selectOutCompound () { return $('//select[@id="coutcompound"]') }
    get buttonCalculate () { return $('//input[@type="submit"][@value="Calculate"]') }
    get buttonClear () { return $('//input[@type="button"][@value="Clear"]') }
    get resultHeading () { return $('//h2[@class="h2result"]') }
    get resultText () { return $('//p[@class="verybigtext"]') }
    get resultTextFont () { return $('//p[@class="verybigtext"]/b/font') }
    get outPutInterest () { return $('//td[@class="bigtext"][@align="center"]/font/b') }
    get outPutInterestFont () { return $('//td[@class="bigtext"][@align="center"]/font') }
    get errorSection () { return $('//div[@style="padding: 5px 0px 5px 30px;background-image: url(\'//d26tpo4cm8sb6k.cloudfront.net/img/svg/error.svg\');background-repeat: no-repeat;"]')}
    get errorMessage () { return this.errorSection.$('//div/font') }
    get inputInterestRateLabel () { return $(`//td[contains(text(),"${this.requiredText.inputLabels.inputInterest}")]`)}
    get outputInterestRateLabel () { return $(`//td[contains(text(),"${this.requiredText.inputLabels.outputInterest}")]`)}
    get inputCompound1Label () { return $(`(//td[contains(text(),"${this.requiredText.inputLabels.compoundSelect}")])[1]`)}
    get inputCompound2Label () { return $(`(//td[contains(text(),"${this.requiredText.inputLabels.compoundSelect}")])[2]`)}

    // Component functions
    async calculate ({interestRate, inCompound, outCompound}) {
        await this.inputInterestRate.setValue(interestRate)
        await this.selectInCompound.selectByAttribute('value', inCompound)
        await this.selectOutCompound.selectByAttribute('value', outCompound)
        await this.buttonCalculate.click()
    }
    async verifyResult({text, output}) {
        await this.assertText(this.resultText,{expectedText: text})
        await this.assertText(this.outPutInterest,{expectedText: output})
    }
    async verifyInputsClear () {
        await this.assertText(this.inputInterestRate,{expectedText: ''})
    }
    async calcCombo ({interestRate, inCompoundOption, expectedResults}) {
        const array = this.requiredText.compoundSelectValues
        await this.buttonClear.click()
        for (let i = 0; i < array.length; i++) {
            await this.calculate({ 
                interestRate: interestRate,
                inCompound: array[inCompoundOption],
                outCompound: array[i]
            })
            if (expectedResults.length == 1) { 
                await this.assertText(this.outPutInterest, {expectedText: expectedResults[0]})
            }
            else { 
                await this.assertText(this.outPutInterest, {expectedText: expectedResults[i]})
            }
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
            await this.calculate({interestRate: '4', inCompound: 'weekly', outCompound: 'quarterly'})
            await this.verifyResult({
                text: '4% compound weekly is equivalent to 4.01851% compound quarterly or 1.00463% interest every 3 months.',
                output: '4.01851%'
            })
        },
        'Positive test sample 2': async () => {
            await this.calculate({interestRate: '1.12', inCompound: 'daily', outCompound: 'semimonthly'})
            await this.verifyResult({
                text:'1.12% compound daily is equivalent to 1.12024% compound semimonthly or 0.04668% interest every half a month.',
                output:'1.12024%'
            })
        },
        'All annually combinations of min value calculate the same output value of 0': async () => {
            await this.calcCombo({
                interestRate: '0',
                inCompoundOption: 0,
                expectedResults: ['0.0000000000%']
            })
        },
        'All semiannually combinations of min value calculate the same output value of 0': async () => {
            await this.calcCombo({
                interestRate: '0',
                inCompoundOption: 1,
                expectedResults: ['0.0000000000%']
            })
        },
        'All quarterly combinations of min value calculate the same output value of 0': async () => {
            await this.calcCombo({
                interestRate: '0',
                inCompoundOption: 2,
                expectedResults: ['0.0000000000%']
            })
        },
        'All monthly combinations of min value calculate the same output value of 0': async () => {
            await this.calcCombo({
                interestRate: '0',
                inCompoundOption: 3,
                expectedResults: ['0.0000000000%']
            })
        },
        'All semimonthly combinations of min value calculate the same output value of 0': async () => {
            await this.calcCombo({
                interestRate: '0',
                inCompoundOption: 4,
                expectedResults: ['0.0000000000%']
            })
        },
        'All biweekly combinations of min value calculate the same output value of 0': async () => {
            await this.calcCombo({
                interestRate: '0',
                inCompoundOption: 5,
                expectedResults: ['0.0000000000%']
            })
        },
        'All weekly combinations of min value calculate the same output value of 0': async () => {
            await this.calcCombo({
                interestRate: '0',
                inCompoundOption: 6,
                expectedResults: ['0.0000000000%']
            })
        },
        'All daily combinations of min value calculate the same output value of 0': async () => {
            await this.calcCombo({
                interestRate: '0',
                inCompoundOption: 7,
                expectedResults: ['0.0000000000%']
            })
        },
        'All continuously combinations of min value calculate the same output value of 0': async () => {
            await this.calcCombo({
                interestRate: '0',
                inCompoundOption: 8,
                expectedResults: ['0.0000000000%']
            })
        },
        'All combinations of annually max value calculate': async () => {
            await this.calcCombo({
                interestRate: '99',
                inCompoundOption: 0,
                expectedResults: [
                    '99.00000%','82.13472%','75.08712%','70.82476%','69.80948%','69.73218%','69.27080%','68.87833%','68.81346%'
                ]
            })
        },
        'All combinations of semiannually max value calculate': async () => {
            await this.calcCombo({
                interestRate: '99',
                inCompoundOption: 1,
                expectedResults: [
                    '123.50250%','99.00000%','89.08077%','83.18156%','81.78797%','81.68206%','81.05040%','80.51385%','80.42524%'
                ]
            })
        },
        'All combinations of quarterly max value calculate': async () => {
            await this.calcCombo({
                interestRate: '99',
                inCompoundOption: 2,
                expectedResults: [
                    '142.19335%','111.25125%','99.00000%','91.79846%','90.10695%','89.97856%','89.21327%','88.56382%','88.45662%'
                ]
            })
        },
        'All combinations of monthly max value calculate': async () => {
            await this.calcCombo({
                interestRate: '99',
                inCompoundOption: 3,
                expectedResults: [
                    '158.90168%','121.80844%','107.39211%','99.00000%','97.03825%','96.88949%','96.00327%','95.25180%','95.12782%'
                ]
            })
        },
        'All combinations of semimonthly max value calculate': async () => {
            await this.calcCombo({
                interestRate: '99',
                inCompoundOption: 4,
                expectedResults: [
                    '163.82767%','124.85546%','109.78855%','101.04188%','99.00000%','98.84521%','97.92320%','97.14154%','97.01259%'
                ]
            })
        },
        'All combinations of biweekly max value calculate': async () => {
            await this.calcCombo({
                interestRate: '99',
                inCompoundOption: 5,
                expectedResults: [
                    '164.22138%','125.09776%','109.97863%','101.20356%','99.15527%','99.00000%','98.07512%','97.29106%','97.16171%'
                ]
            })
        },
        'All combinations of weekly max value calculate': async () => {
            await this.calcCombo({
                interestRate: '99',
                inCompoundOption: 6,
                expectedResults: [
                    '166.63057%','126.57653%','111.13719%','102.18816%','100.10063%','99.94240%','99.00000%','98.20116%','98.06939%'
                ]
            })
        },
        'All combinations of daily max value calculate': async () => {
            await this.calcCombo({
                interestRate: '99',
                inCompoundOption: 7,
                expectedResults: [
                    '168.76326%','127.88002%','112.15624%','103.05297%','100.93068%','100.76984%','99.81191%','99.00000%','98.86607%'
                ]
            })
        },
        'All combinations of continuously max value calculate': async () => {
            await this.calcCombo({
                interestRate: '99',
                inCompoundOption: 8,
                expectedResults: [
                    '169.12345%','128.09965%','112.32774%','103.19841%','101.07024%','100.90896%','99.94841%','99.13429%','99.00000%'
                ]
            })
        }
    }
    CLEAR = {
        'Inputs are empty after clicking Clear button': async () => {
            await this.inputInterestRate.setValue('100')
            await this.buttonClear.click()
            await this.verifyInputsClear()
        }
    }
    ERROR = {
        'Error displayed when no input is calculated': async () => {
            await this.calculate({interestRate: '', inCompound: 'daily', outCompound: 'semimonthly'})
            await this.assertExists(this.errorSection, true)
            await this.assertText(this.errorMessage, {expectedText: this.requiredText.errorMessages[0]})
            await this.assertAttributeValue(this.errorMessage,{
                attribute: 'color',
                expectedValue: this.requiredColorsFunctional.warning
            })
        },
        'Output Interest is displayed as ?%': async () => {
            await this.calculate({interestRate: 'wrong type', inCompound: 'quarterly', outCompound: 'monthly'})
            await this.assertText(this.outPutInterest,{expectedText: '?%'})
        }
    }
    UI = {
        'Heading element meets requirements': async () => {
            await this.assertArrayLength( this.arrayOfComponentHeading, { 
                expectedLength: 1 
            })
            await this.assertText( this.componentHeading, {
                expectedText: this.requiredText.title
            })
            await this.assertColor( this.componentHeading, {
                type: 'text', colorFormat: 'hex',
                expectedColor: this.requiredColors[0]
            })
        },
        'Description element meets requirements': async () => {
            await this.assertText( this.componentDescription,{
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
                expectedValue: this.requiredText.instructionsImgSrc
            })
            await this.assertAttributeValue( this.instructionHeadingImg, {
                attribute: 'alt',
                expectedValue: this.requiredText.instructions
            })
        },
        'Input container meets requirements': async () => {
            await this.assertAttributeValue( this.inputPanel, {
                attribute: 'align',
                expectedValue: 'center'
            })
            await this.assertColor( this.inputPanel, {
                type: 'background', colorFormat: 'hex',
                expectedColor: this.requiredColors[1]
            })
            await this.assertCSSBorder( this.inputPanel, {
                expectedColor: this.requiredColors[2],
                expectedStyle: this.requiredLineProperties[1],
                expectedWidth: this.requiredLineProperties[0]
            })
        },
        'Interest Input and Label meet requirements': async () => {
            await this.assertDisplayed(this.inputInterestRateLabel)
            await this.assertBackgroundImage(this.inputInterestRate,{
                expectedImageURL: this.requiredSymbols[0],
                expectedPosition: '100% 50%'
            })
        },
        'Compound 1 dropdown and Label meet requirements': async () => {
            await this.assertDisplayed(this.inputCompound1Label)
            for (const option of this.requiredText.compoundSelectValues) {
                await this.selectInCompound.selectByAttribute('value', option)
            }
        },
        'Output Interest element and label meet requirements': async () => {
            await this.assertDisplayed(this.outputInterestRateLabel)
            await this.assertText(this.outPutInterest, {expectedText: expect.stringContaining('%')})
            await this.assertAttributeValue(this.outPutInterestFont,{
                attribute: 'color',
                expectedValue: this.requiredColorsFunctional.success
            })
        },
        'Compound 2 dropdown and Label meet requirements': async () => {
            await this.assertDisplayed(this.inputCompound2Label)
            for (const option of this.requiredText.compoundSelectValues) {
                await this.selectOutCompound.selectByAttribute('value', option)
            }
        },
        'Instruction heading is removed after calculating valid input': async () => {
            await this.openComponentPage(this.endpoint)
            await this.calculate({interestRate: '10', inCompound: 'monthly', outCompound: 'daily' })
            await this.assertExists(this.instructionHeadingImg, false)
        },
        'Result Heading meets requirements': async () => {
            await this.assertText ( this.resultHeading, {
                expectedText: this.requiredOutputLabels.Res
            })
            await this.assertColor ( this.resultHeading, {
                type: 'text', colorFormat: 'hex',
                expectedColor: this.requiredColorsFunctional.important
            })
            await this.assertColor ( this.resultHeading, {
                type: 'background', colorFormat: 'hex',
                expectedColor: this.requiredColors[6]
            })
        },
        'Result text meets requirements': async () => {
            await this.assertDisplayed(this.resultText)
            await this.assertAttributeValue(this.resultTextFont, {
                attribute: 'color',
                expectedValue: this.requiredColorsFunctional.success
            })
        },
        'Instruction heading is removed after producing error': async () => {
            await this.openComponentPage(this.endpoint)
            await this.calculate({interestRate: '', inCompound: 'monthly', outCompound: 'annually' })
            await this.assertExists(this.instructionHeadingImg, false)
        },
        'Error section meets display requirement': async () => {
            await this.assertDisplayed(this.errorSection)
            await this.assertOrderInDOM({
                elementFirst: this.errorSection,
                elementSecond: this.inputPanel
            })
            await this.assertDisplayed(this.errorMessage)
        },
        'Error message meets color requirement': async () => {
            await this.assertAttributeValue(this.errorMessage,{
                attribute: 'color',
                expectedValue: this.requiredColorsFunctional.warning
            })
        },
        'Output Interest meets error display requirement': async () => {
            await this.assertText(this.outPutInterest,{expectedText: '?%'})
        }
    }
}

export default new CompoundInterest()