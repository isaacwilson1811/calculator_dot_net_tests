import { $ } from '@wdio/globals'
import BasePage from './basepage.js';

class CompoundInterest extends BasePage {
    endpoint = 'compound-interest-calculator.html'

    get inputInterestRate () { return $('//input[@id="cinterestrate"]') }
    get selectInCompound () { return $('//select[@id="cincompound"]') }
    get selectOutCompound () { return $('//select[@id="coutcompound"]') }
    get buttonCalculate () { return $('//input[@type="submit"][@value="Calculate"]') }
    get buttonClear () { return $('//input[@type="button"][@value="Clear"]') }

    get result () {
        return $('//p[@class="verybigtext"]//b//font[@color="green"]')
    }

    get resultText () { return $('//p[@class="verybigtext"]') }
    get outPutInterest () { return $('//td[@class="bigtext"][@align="center"]/font/b') }

    selectCompoundValues = [ 'annually', 'semiannually', 'quarterly', 'monthly', 'semimonthly', 'biweekly', 'weekly', 'daily', 'continouosly']
    
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
        }
    }
}

export default new CompoundInterest();
