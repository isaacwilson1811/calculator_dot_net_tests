import { $, expect } from '@wdio/globals'
import BasePage from './basepage.js'

class SalesTax extends BasePage {
    endpoint = 'sales-tax-calculator.html'
    locate (name) {
        let getElement = undefined
        switch(name) {
            case 'h1':
            case 'title':
            case 'component title':
            case 'heading':
                getElement = this.componentHeading
                break
            case 'heading list': getElement = this.arrayOfComponentHeading; break
            case 'description': getElement = this.componentDescriptionParagraph; break
            case 'input container': getElement = this.inputPanel; break
            case 'input container children': getElement = this.inputPanelTable; break
            case 'before tax price input': getElement = this.inputBeforeTax; break
            case 'before tax price label': getElement = this.inputBeforeTaxLabel; break
            default: getElement = undefined
        }
        return getElement
    }
    get inputPanel () { return $('//div[@class="panel"]') }
    get inputPanelTable () { return $('//div[@class="panel"]/table') }
    get componentHeading () { return $('//h1') }
    get arrayOfComponentHeading () { return $$('//h1') }
    get componentDescriptionParagraph () { return $('(//div[@id="content"]/p)[1]') }
    get inputBeforeTax () { return $('//input[@id="beforetax"]') }
    get inputBeforeTaxLabel () { return $('//input[@id="beforetax"]/../../td[@align="right"]') }
    get inputTaxRate () { return $('//input[@type="text"][@name="taxrate"]') }
    get inputAfterTax () { return $('//input[@type="text"][@name="finalprice"][@id="finalprice"]') }
    get buttonCalculate () { return $('//input[@type="submit"][@value="Calculate"]') }
    get buttonClear () { return $('//input[@type="button"][@value="Clear"]') }
    get resultHeader () { return $('//h2[@class="h2result"]') }
    get result () { return $('(//*[@class="verybigtext"])[3]//font//b') }
    get resultsArray () { return $$('//div/div[@class="verybigtext"]') }
    get errorMessage () { return $('//font[@color="red"]') }
    get errorNotValidBeforeTax () { return $('//font[@color="red"][contains(text(),"Please provide a valid before tax price.")]') }
    get errorLessThan2ValuesProvided () { return $('//font[@color="red"][contains(text(),"Please provide at least two values to calculate.")]') }
    get errorAfterTaxCanNotBeSmallerThanBeforeTax () { return $('//font[@color="red"][contains(text(),"After tax price can not be smaller than before tax price.")]') }    

    async checkElementExists ({element}) {
        await expect(this.locate(element)).toBeExisting()
    }

    async checkElementCount ({element, expectedCount}) {
        const elementArray = await this.locate(element)
        await expect(elementArray.length).toBe(expectedCount)
    }

    async checkElementText ({element, expectedText}) {
        await expect(this.locate(element)).toHaveText(expectedText)
    }

    async checkElementColor ({element, expectedColor}) {
        const color = await this.locate(element).getCSSProperty('color')
        await expect(color.parsed.hex).toBe(expectedColor)
    }

    async checkElementBackgroundColor ({element, expectedColor}) {
        const color = await this.locate(element).getCSSProperty('background-color')
        await expect(color.parsed.hex).toBe(expectedColor)
    }

    async checkElementBackgroundImage ({element, expectedImage, expectedPosition}) {
        const e = this.locate(element)
        const URL = await e.getCSSProperty('background-image')
        const position = await e.getCSSProperty('background-position')
        await expect(URL.value).toBe(expectedImage)
        await expect(position.value).toBe(expectedPosition)
    }

    async checkElementBorder ({element, edgesToCheck, expectedWidth, expectedStyle, expectedColor}) {
        const e = await this.locate(element)
        edgesToCheck.forEach(async (edge) => {
            const width = await e.getCSSProperty(`border-${edge}-width`)
            const style = await e.getCSSProperty(`border-${edge}-style`)
            const color = await e.getCSSProperty(`border-${edge}-color`)
            await expect(width.parsed.string).toBe(expectedWidth)
            await expect(style.parsed.string).toBe(expectedStyle)
            await expect(color.parsed.hex).toBe(expectedColor)
        })
        
    }

    async checkElementAlign ({element, expectedAlign}) {
        const align = await this.locate(element).getAttribute('align')
        await expect(align).toBe(expectedAlign)
    }

    async calculate ({beforeTax,taxRate,afterTax}) {
        // Check the input params. If it has a value: Input the value, add to count. Does not have a value: Input an empty string, don't count.
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
    openComponentPage () { return super.open(this.endpoint) }
}

export default new SalesTax()
