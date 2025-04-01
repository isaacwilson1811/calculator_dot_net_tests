import { $, expect } from '@wdio/globals'
import Page from './page.js';

class SalesTax extends Page {

    get inputBeforeTax () {
        return $('//input[@id="beforetax"]')
    }

    get inputTaxRate () {
        return $('//input[@type="text"][@name="taxrate"]')
    }

    get inputAfterTax () {
        return $('//input[@type="text"][@name="finalprice"][@id="finalprice"]')
    }

    get buttonCalculate () {
        return $('//input[@type="submit"][@value="Calculate"]');
    }

    get buttonClear () {
        return $('//input[@type="button"][@value="Clear"]')
    }

    get result () {
        return $('(//*[@class="verybigtext"])[3]//font//b')
    }

    get errorMessage () {
        return $('//font[@color="red"]')
    }

    get errorNotValidBeforeTax () {
        return $('//font[@color="red"][contains(text(),"Please provide a valid before tax price.")]')
    }

    get errorLessThan2ValuesProvided () {
        return $('//font[@color="red"][contains(text(),"Please provide at least two values to calculate.")]')
    }

    get errorAfterTaxCanNotBeSmallerThanBeforeTax () {
        return $('//font[@color="red"][contains(text(),"After tax price can not be smaller than before tax price.")]')
    }

    get successMessage () {
        return $('//h2[@class="h2result"]')
    }

    async calculate ({beforeTax,taxRate,afterTax}) {
        let valueCount = 0
        beforeTax ? (await this.inputBeforeTax.setValue(beforeTax), valueCount++ ): await this.inputBeforeTax.setValue('');
        taxRate ? (await this.inputTaxRate.setValue(taxRate), valueCount++ ): await this.inputTaxRate.setValue('');
        afterTax ? (await this.inputAfterTax.setValue(afterTax), valueCount++ ): await this.inputAfterTax.setValue('');
        await this.buttonCalculate.click()

        let expectedErrorMessage = '', expectError = false;

        // These error conditions are in this exact order because the website prioritizes the error message in this exact order.
        // Each error condition overrides the previous error condition.
        if (valueCount <=1) {
            expectedErrorMessage = 'Please provide at least two values to calculate.'; expectError = true;
        }
        if ( ((afterTax && beforeTax) && !taxRate) && (Number(afterTax) < Number(beforeTax)) ){
            expectedErrorMessage = 'After tax price can not be smaller than before tax price.'; expectError = true;
        }
        if (beforeTax && ( Number(beforeTax) <= 0 )) {
            expectedErrorMessage = 'Please provide a valid before tax price.'; expectError = true;
        }
        expectError ? await expect(this.errorMessage).toHaveText(expectedErrorMessage) : await expect(this.successMessage).toBeExisting();
    }

    navigateToPage () {
        return super.open('sales-tax-calculator.html')
    }
}

export default new SalesTax();
