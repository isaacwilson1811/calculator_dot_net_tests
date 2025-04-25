import { $ } from '@wdio/globals'
import BasePage from './basepage.js';

class CompoundInterest extends BasePage {

    get inputInterestRate () {
        return $('//input[@id="cinterestrate"]')
    }

    get buttonCalculate () {
        return $('//input[@type="submit"][@value="Calculate"]');
    }

    get result () {
        return $('//p[@class="verybigtext"]//b//font[@color="green"]')
    }

    async calculate ({interestRate}) {
        await this.inputInterestRate.setValue(interestRate)
        await this.buttonCalculate.click()
    }

    navigateToPage () {
        return super.navigate('compound-interest-calculator.html')
    }
}

export default new CompoundInterest();
