import { $ } from '@wdio/globals'
import Page from './page.js';

class SalesTax extends Page {

    get inputBeforeTax () {
        return $('//input[@id="beforetax"]')
    }

    get buttonCalculate () {
        return $('//input[@type="submit"][@value="Calculate"]');
    }

    get result () {
        return $('(//*[@class="verybigtext"])[3]//font//b')
    }

    async calculate ({beforeTax}) {
        await this.inputBeforeTax.setValue(beforeTax)
        await this.buttonCalculate.click()
    }

    navigateToPage () {
        return super.open('sales-tax-calculator.html')
    }
}

export default new SalesTax();
