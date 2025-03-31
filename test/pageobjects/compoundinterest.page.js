import { $ } from '@wdio/globals'
import Page from './page.js';

class CompoundInterest extends Page {

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
        return super.open('compound-interest-calculator.html')
    }
}

export default new CompoundInterest();
