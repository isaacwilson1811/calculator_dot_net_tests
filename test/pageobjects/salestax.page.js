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
            case 'sales tax rate input': getElement = this.inputTaxRate; break
            case 'sales tax rate label': getElement = this.inputTaxRateLabel; break
            case 'after tax price input': getElement = this.inputAfterTax; break
            case 'after tax price label': getElement = this.inputAfterTaxLabel; break
            case 'calculate button': getElement = this.buttonCalculate; break
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
    get inputTaxRateLabel () { return $('//input[@type="text"][@name="taxrate"]/../../td[@align="right"]') }
    get inputAfterTax () { return $('//input[@type="text"][@name="finalprice"][@id="finalprice"]') }
    get inputAfterTaxLabel () { return $('//input[@type="text"][@name="finalprice"][@id="finalprice"]/../../td[@align="right"]') }
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

    async checkElementCount ({element, count}) {
        const elementArray = await this.locate(element)
        await expect(elementArray.length).toBe(count)
    }

    async checkElementAttribute ({element, attribute, value}) {
        const e = await this.locate(element)
        const attributeValue = await e.getAttribute(attribute)
        await expect(attributeValue).toBe(value)
    }

    async checkElementText ({element, text}) {
        await expect(this.locate(element)).toHaveText(text)
    }

    async checkElementColor ({element, color}) {
        const elementColor = await this.locate(element).getCSSProperty('color')
        await expect(elementColor.parsed.hex).toBe(color)
    }

    async checkElementBackgroundColor ({element, color}) {
        const elementBGcolor = await this.locate(element).getCSSProperty('background-color')
        await expect(elementBGcolor.parsed.hex).toBe(color)
    }

    async checkElementBackgroundImage ({element, image, position}) {
        const e = this.locate(element)
        const imageURL = await e.getCSSProperty('background-image')
        const imagePosition = await e.getCSSProperty('background-position')
        await expect(imageURL.value).toBe(image)
        await expect(imagePosition.value).toBe(position)
    }

    async checkElementBorder ({element, edgesToCheck, width, style, color}) {
        const e = await this.locate(element)
        edgesToCheck.forEach(async (edge) => {
            const edgeWidth = await e.getCSSProperty(`border-${edge}-width`)
            const edgeStyle = await e.getCSSProperty(`border-${edge}-style`)
            const edgeColor = await e.getCSSProperty(`border-${edge}-color`)
            await expect(edgeWidth.parsed.string).toBe(width)
            await expect(edgeStyle.parsed.string).toBe(style)
            await expect(edgeColor.parsed.hex).toBe(color)
        })
        
    }

    async checkElementAlign ({element, align}) {
        const elementAlign = await this.locate(element).getAttribute('align')
        await expect(elementAlign).toBe(align)
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
