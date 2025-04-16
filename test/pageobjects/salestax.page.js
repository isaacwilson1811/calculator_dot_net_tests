import { $, expect } from '@wdio/globals'
import BasePage from './basepage.js';

class SalesTax extends BasePage {

    get componentHeading () {
        return $$('//h1')
    }

    get componentDescription () {
        return $('(//div[@id="content"]/p)[1]')
    }

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
        return $('//input[@type="submit"][@value="Calculate"]')
    }

    get buttonClear () {
        return $('//input[@type="button"][@value="Clear"]')
    }

    get resultHeader () {
        return $('//h2[@class="h2result"]')
    }

    get result () {
        return $('(//*[@class="verybigtext"])[3]//font//b')
    }

    get resultsArray () {
        return $$('//div/div[@class="verybigtext"]')
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

    async calculate ({beforeTax,taxRate,afterTax}) {
        // Check the input params. If it has a value: Input the value, add to count. Does not have a value: Input an empty string, don't count.
        // Then click the calculate button.
        let valueCount = 0
        beforeTax ? (await this.inputBeforeTax.setValue(beforeTax), valueCount++ ): await this.inputBeforeTax.setValue('');
        taxRate ? (await this.inputTaxRate.setValue(taxRate), valueCount++ ): await this.inputTaxRate.setValue('');
        afterTax ? (await this.inputAfterTax.setValue(afterTax), valueCount++ ): await this.inputAfterTax.setValue('');
        await this.buttonCalculate.click()
        // Check to expect a result or an error.
        // These error conditions are in this exact order because the website prioritizes the error messages in this exact order.
        let expectError = false, expectedErrorMessage;
        // When not enough values are entered (Requires at least 2) Lowest priority. Gets replaced by next errors.
        if (valueCount <=1) {
            expectedErrorMessage = 'Please provide at least two values to calculate.'; expectError = true;
        }
        // When afterTax is less than beforeTax. (If both beforeTax and taxRate are entered: afterTax is treated as empty and not checked for this error.)
        if ( ((afterTax && beforeTax) && !taxRate) && (Number(afterTax) < Number(beforeTax)) ){
            expectedErrorMessage = 'After tax price can not be smaller than before tax price.'; expectError = true;
        }
        // When beforeTax is Zero or less. Highest priority. Will replace all other errors.
        if (beforeTax && ( Number(beforeTax) <= 0 )) {
            expectedErrorMessage = 'Please provide a valid before tax price.'; expectError = true;
        }
        // Expect the specific error message or expect the result header
        expectError ? await expect(this.errorMessage).toHaveText(expectedErrorMessage) : await expect(this.resultHeader).toBeExisting();

        // WORK IN PROGRESS
        // If we expected results: Check the results
        if (!expectError) {
            let results = await this.resultsArray
            results.forEach(element => {
                console.log(JSON.stringify(element))
            })
            
        }
    }

    navigateToPage () {   
        return super.open('sales-tax-calculator.html')
    }

    async countHeadingElements() {        
        const elementArray = await $$('//h1')
        await expect(elementArray.length).toBe(1)
    }

    async checkElementText(element,expectedText) {
        if (element == 'header') {
            element = this.componentHeading
            await expect(element[0]).toHaveText(`${expectedText}`)
        } else if (element == 'description'){
            element = this.componentDescription
            await expect(element).toHaveText(`${expectedText}`)
        }
    }


    async checkCSSProperty(prop,value) {
        const color = await $('//h1').getCSSProperty(`${prop}`)
        await expect(color.parsed.hex).toBe(`${value}`)
    }
}

export default new SalesTax()
