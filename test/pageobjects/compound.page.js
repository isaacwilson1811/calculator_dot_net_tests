import { $, expect } from '@wdio/globals'
import BasePage from './basepage.js';

class CompoundInterest extends BasePage {
    endpoint = 'compound-interest-calculator.html'
    // Element Selectors
    get componentHeading () { return $('//h1') }
    get componentDescription () { return $('(//div[@id="content"]/p)[1]') }
    get arrayOfComponentHeading () { return $$('//h1') }
    get instructionHeadingImg () { return $('//div[@id="insmdc"]/img') }
    get inputPanel () { return $('//table[@class="panel"]') }
    get inputInterestRate () { return $('//input[@id="cinterestrate"]') }
    get selectInCompound () { return $('//select[@id="cincompound"]') }
    get selectOutCompound () { return $('//select[@id="coutcompound"]') }
    get buttonCalculate () { return $('//input[@type="submit"][@value="Calculate"]') }
    get buttonClear () { return $('//input[@type="button"][@value="Clear"]') }
    get resultHeading () { return $('//h2[@class="h2result"]') }
    get resultText () { return $('//p[@class="verybigtext"]') }
    get outPutInterest () { return $('//td[@class="bigtext"][@align="center"]/font/b') }
    get outPutInterestFont () { return $('//td[@class="bigtext"][@align="center"]/font') }
    get errorSection () { return $('//div[@style="padding: 5px 0px 5px 30px;background-image: url(\'//d26tpo4cm8sb6k.cloudfront.net/img/svg/error.svg\');background-repeat: no-repeat;"]')}
    get errorMessage () { return this.errorSection.$('//div/font') }

    selectCompoundValues = [ 'annually', 'semiannually', 'quarterly', 'monthly', 'semimonthly', 'biweekly', 'weekly', 'daily', 'continuously']
    
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

    BROWSER = {
        'Component page is loaded': async () => {
            await this.openComponentPage(this.endpoint)
        }
    }
    ERROR = {
        'Error displayed when no input is calculated': async () => {
            await this.calculate({interestRate: '', inCompound: 'daily', outCompound: 'semimonthly'})
            await expect(this.errorSection).toBeExisting()
            await this.assertText(this.errorMessage,{expectedText:'Please provide a numeric input interest rate.'})
            await this.assertAttributeValue(this.errorMessage,{
                attribute: 'color',
                expectedValue: 'red'
            })
        },
        'Output Interest is displayed as ?%': async () => {
            await this.calculate({interestRate: 'wrong type', inCompound: 'quarterly', outCompound: 'monthly'})
            await this.assertText(this.outPutInterest,{expectedText: '?%'})
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
        'Inputs empty after clicking Clear Button': async () => {
            await this.inputInterestRate.setValue('100')
            await this.buttonClear.click()
            await this.verifyInputsClear()
        },
        'All combinations of min value calculate the same output value of 0': async () => {
            const array = this.selectCompoundValues
            for (let c1 = 0; c1 < array.length; c1++) {
                for (let c2 = 0; c2 < array.length; c2++) {
                    await this.calculate({
                        interestRate: '0',
                        inCompound: array[c1],
                        outCompound: array[c2]
                    })
                    await this.assertText(this.outPutInterest,{expectedText: '0.0000000000%'})
                }
            }
        },
        'All combinations of max value calculate': async () => {
            const expectedOutPut= [
                '99.00000%','82.13472%','75.08712%','70.82476%','69.80948%','69.73218%','69.27080%','68.87833%','68.81346%',
                '123.50250%','99.00000%','89.08077%','83.18156%','81.78797%','81.68206%','81.05040%','80.51385%','80.42524%',
                '142.19335%','111.25125%','99.00000%','91.79846%','90.10695%','89.97856%','89.21327%','88.56382%','88.45662%',
                '158.90168%','121.80844%','107.39211%','99.00000%','97.03825%','96.88949%','96.00327%','95.25180%','95.12782%',
                '163.82767%','124.85546%','109.78855%','101.04188%','99.00000%','98.84521%','97.92320%','97.14154%','97.01259%',
                '164.22138%','125.09776%','109.97863%','101.20356%','99.15527%','99.00000%','98.07512%','97.29106%','97.16171%',
                '166.63057%','126.57653%','111.13719%','102.18816%','100.10063%','99.94240%','99.00000%','98.20116%','98.06939%',
                '168.76326%','127.88002%','112.15624%','103.05297%','100.93068%','100.76984%','99.81191%','99.00000%','98.86607%',
                '169.12345%','128.09965%','112.32774%','103.19841%','101.07024%','100.90896%','99.94841%','99.13429%','99.00000%'
            ]
            let calcCount = 0
            const array = this.selectCompoundValues
            for (let c1 = 0; c1 < array.length; c1++) {
                for (let c2 = 0; c2 < array.length; c2++) {
                    await this.calculate({
                        interestRate: '99',
                        inCompound: array[c1],
                        outCompound: array[c2]
                    })
                    await this.assertText(this.outPutInterest,{expectedText: expectedOutPut[calcCount]})
                    calcCount++
                }
            }
        }
    }
    UI = {
        'Heading element meets requirements': async () => {
            await this.assertArrayLength( this.arrayOfComponentHeading, { 
                expectedLength: 1 
            })
            await this.assertText( this.componentHeading, {
                expectedText: 'Compound Interest Calculator'
            })
            await this.assertColor( this.componentHeading, {
                type: 'text', colorFormat: 'hex',
                expectedColor: '#003366'
            })
        },
        'Description element meets requirements': async () => {
            await this.assertText( this.componentDescription,{
                expectedText: 'The Compound Interest Calculator below can be used to compare or convert the interest rates of different compounding periods. Please use our Interest Calculator to do actual calculations on compound interest.'
            })
        },
        'Instruction heading meets requirements': async () => {
            await this.assertOrderInDOM({
                elementFirst: this.instructionHeadingImg,
                elementSecond: $('//form[@name="calform"]')
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
            await this.assertAttributeValue( this.inputPanel, {
                attribute: 'align',
                expectedValue: 'center'
            })
            await this.assertColor( this.inputPanel, {
                type: 'background', colorFormat: 'hex',
                expectedColor: '#eeeeee'
            })
            await this.assertCSSBorder( this.inputPanel, {
                expectedColor: '#bbbbbb',
                expectedStyle: 'solid',
                expectedWidth: '1px'
            })
        },
        'Interest Input and Label meet requirements': async () => {
            await this.assertExists($('//td[contains(text(),"Input Interest")]'))
            await this.assertBackgroundImage(this.inputInterestRate,{
                expectedImageURL: 'url(\"data:image/svg+xml;utf8,<svg xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"17px\\\" height=\\\"20px\\\"><text x=\\\"1\\\" y=\\\"15\\\" style=\\\"font: normal 16px arial;\\\">%</text></svg>\")',
                expectedPosition: '100% 50%'
            })
        },
        'Compound 1 dropdown and Label meet requirements': async () => {
            await this.assertExists($('(//td[contains(text(),"Compound")])[1]'))
            for (const option of this.selectCompoundValues) {
                await this.selectInCompound.selectByAttribute('value', option)
            }
        },
        'Output Interest element and label meet requirements': async () => {
            await this.assertExists($('//td[contains(text(),"Output Interest")]'))
            await this.assertText(this.outPutInterest, {expectedText: expect.stringContaining('%')})
            await this.assertAttributeValue(this.outPutInterestFont,{
                attribute: 'color',
                expectedValue: 'green'
            })
        },
        'Compound 2 dropdown and Label meet requirements': async () => {
            await this.assertExists($('(//td[contains(text(),"Compound")])[2]'))
            for (const option of this.selectCompoundValues) {
                await this.selectOutCompound.selectByAttribute('value', option)
            }
        },
        'Instruction heading is removed after calculating valid input': async () => {
            await this.openComponentPage(this.endpoint)
            await this.calculate({interestRate: '10', inCompound: 'monthly', outCompound: 'daily' })
            await expect(this.instructionHeadingImg).not.toBeExisting()
        },
        'Result Heading meets requirements': async () => {
            await this.assertText ( this.resultHeading, {
                expectedText: 'Result'
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
            await this.assertExists($('//p[@class="verybigtext"]'))
            await this.assertAttributeValue($('//p[@class="verybigtext"]/b/font'),{
                attribute: 'color',
                expectedValue: 'green'
            })
        },
        'Instruction heading is removed after producing error': async () => {
            await this.openComponentPage(this.endpoint)
            await this.calculate({interestRate: '', inCompound: 'monthly', outCompound: 'annually' })
            await expect(this.instructionHeadingImg).not.toBeExisting()
        },
        'Error section meets display requirement': async () => {
            await this.assertExists(this.errorSection)
            await this.assertOrderInDOM({
                elementFirst: this.errorSection,
                elementSecond: this.inputPanel
            })
            await this.assertExists(this.errorMessage)
        },
        'Error message meets color requirement': async () => {
            await this.assertAttributeValue(this.errorMessage,{
                attribute: 'color',
                expectedValue: 'red'
            })
        },
        'Output Interest meets error display requirement': async () => {
            await this.assertText(this.outPutInterest,{expectedText: '?%'})
        }
    }
}

export default new CompoundInterest();
