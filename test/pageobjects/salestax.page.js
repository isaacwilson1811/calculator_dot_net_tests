import { $ } from '@wdio/globals'
import BasePage from './basepage.js'
import GUI from '../requirements/GUI.js'

class SalesTax extends BasePage {
    openComponentPage () { return super.navigate(this.endpoint) }
    endpoint = 'sales-tax-calculator.html'
    // Approved Text Content from Design Requirements
    requiredText = {
        title: GUI['Design Requirements'].language.approvedApps.appID34534535.title,
        description: GUI['Design Requirements'].language.approvedApps.appID34534535.description,
        inputLabels: GUI['Design Requirements'].language.approvedApps.appID34534535.inputLabels,
        outputLabels: GUI['Design Requirements'].language.approvedApps.appID34534535.outputLabels
    }
    // Define getters to return selectors
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
    get buttonSave () { return $('//img[@src="//d26tpo4cm8sb6k.cloudfront.net/img/save.svg"]') }
    get resultHeading () { return $('//h2[@class="h2result"]') }
    get result () { return $('(//*[@class="verybigtext"])[3]//font//b') }
    get resultLine1 () { return $('(//*[@class="verybigtext"])[1]//font') }
    get resultLine2 () { return $('(//*[@class="verybigtext"])[2]//font') }
    get resultLine3 () { return $('(//*[@class="verybigtext"])[3]//font') }
    get resultsArray () { return $$('//div/div[@class="verybigtext"]') }
    get errorMessage () { return $('//font[@color="red"]') }
    get errorNotValidBeforeTax () { return $('//font[@color="red"][contains(text(),"Please provide a valid before tax price.")]') }
    get errorLessThan2ValuesProvided () { return $('//font[@color="red"][contains(text(),"Please provide at least two values to calculate.")]') }
    get errorAfterTaxCanNotBeSmallerThanBeforeTax () { return $('//font[@color="red"][contains(text(),"After tax price can not be smaller than before tax price.")]') }

    // Abstration layer to map nice string names to getters
    locate (name) {
        let getElement = undefined
        switch(name) {
            case 'h1 heading': getElement = this.componentHeading; break
            case 'list of h1 headings': getElement = this.arrayOfComponentHeading; break
            case 'description': getElement = this.componentDescriptionParagraph; break
            case 'input container': getElement = this.inputPanel; break
            case 'input container table': getElement = this.inputPanelTable; break
            case 'before tax price input': getElement = this.inputBeforeTax; break
            case 'before tax price label': getElement = this.inputBeforeTaxLabel; break
            case 'sales tax rate input': getElement = this.inputTaxRate; break
            case 'sales tax rate label': getElement = this.inputTaxRateLabel; break
            case 'after tax price input': getElement = this.inputAfterTax; break
            case 'after tax price label': getElement = this.inputAfterTaxLabel; break
            case 'calculate button': getElement = this.buttonCalculate; break
            case 'clear button': getElement = this.buttonClear; break
            case 'save icon': getElement = this.buttonSave; break
            case 'result heading': getElement = this.resultHeading; break
            case 'results as list': getElement = this.resultsArray; break
            case 'result line 1 value': getElement = this.resultLine1; break
            case 'result line 2 value': getElement = this.resultLine2; break
            case 'result line 3 value': getElement = this.resultLine3; break
            case 'error message': getElement = this.errorMessage; break
            default: getElement = undefined
        }
        return getElement
    }
    
    // Component Specific Methods
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
        expectError ? await expect(this.errorMessage).toHaveText(expectedErrorMessage) : await expect(this.resultHeading).toBeExisting();

        // WORK IN PROGRESS
        // If we expected results: Check the results
        if (!expectError) {
            let results = await this.resultsArray
            results.forEach(element => {
                console.log(JSON.stringify(element))
            })
            
        }
    }


                                            /*
String named methods to be called from Specs.
                                            */
    BROWSER = {
        'Component page is loaded': async () => {
            await this.openComponentPage()
        }
    }
    CALCULATE = {
        'Valid inputs calculated': async () => {
            await this.calculate ({ beforeTax: 100, taxRate: 6.5 })
        }
    }
    ERROR = {
        'Invalid inputs produced an error message': async () => {
            await this.calculate({})
        }
    }
    UI = {
        // 1. Heading element used for the component's title.
        'Heading element is the only h1 on the page': async () => {
            await this.assertArrayLength( await this.locate('list of h1 headings'), { 
                expectedLength: 1 
            })
        },
        'Heading text content matches requirement': async () => {
            await this.assertText( await this.locate('h1 heading'), { 
                expectedText: this.requiredText.title 
            })
        },
        'Heading text color matches requirement': async () => {
            await this.assertColor( await this.locate('h1 heading'), {
                type: 'text', colorFormat: 'hex',
                expectedColor: this.requiredColors[0]
            })
        },
        // 2. Text element used for the component description.
        'Description element text matches requirement': async () => {
            await this.assertText ( await this.locate('description'), { 
                expectedText: this.requiredText.description 
            })
        },
        // 3. Container element holding value inputs and function buttons.
        'Container has required background color': async () => {
            await this.assertColor ( await this.locate('input container'), {
                type: 'background', colorFormat: 'hex',
                expectedColor: this.requiredColors[1]
            })
        },
        'Container has required CSS border': async () => {
            await this.assertCSSBorder ( await this.locate('input container'), {
                expectedColor: this.requiredColors[2],
                expectedWidth: this.requiredLineProperties[0],
                expectedStyle: this.requiredLineProperties[1],
            })
        },
        'Container is centered horizontally': async () => {
            await this.assertAttributeValue ( await this.locate('input container table'), {
                attribute: 'align', expectedValue: 'center'
            })
        },
        'Before Tax Price input and label meet requirements': async () => {
            await this.assertText ( await this.locate ('before tax price label'), {
                expectedText: this.requiredText.inputLabels[0]
            })
            await this.assertBackgroundImage ( await this.locate ('before tax price input'), {
                expectedImageURL: this.requiredSymbols[1],
                expectedPosition: '0% 50%'
            })
        },
        'Sales Tax Rate input and label meet requirements': async () => {
            await this.assertText ( this.locate ('sales tax rate label'), {
                expectedText: this.requiredText.inputLabels[1]
            })
            await this.assertBackgroundImage ( this.locate ('sales tax rate input'), { 
                expectedImageURL: this.requiredSymbols[0],
                expectedPosition: '100% 50%'
            })
        },
        'After Tax Price input and label meet requirements': async () => {
            await this.assertText ( this.locate ('after tax price label'), {
                expectedText: this.requiredText.inputLabels[2]
            })
            await this.assertBackgroundImage ( this.locate ('after tax price input'), {
                expectedImageURL: this.requiredSymbols[1],
                expectedPosition: '0% 50%'
            })
        },
        'Calculate button meets requirements': async () => {
            const button = await this.locate ('calculate button')
            await this.assertAttributeValue ( button, {
                attribute: 'value',
                expectedValue: this.requiredText.inputLabels[3]
            })
            await this.assertHoverEffectBGC ( button, {
                expectedBGColor: this.requiredColors[3],
                expectedBGColorOnHover: this.requiredColors[4]
            })
            await this.assertBackgroundImage ( button, {
                expectedImageURL: this.requiredSymbols[2],
                expectedPosition: '0%'
            })
        },
        'Clear button meets requirments': async () => {
            const button = await this.locate ('clear button')
            await this.assertAttributeValue ( button, {
                attribute: 'value',
                expectedValue: this.requiredText.inputLabels[4]
            })
            await this.assertHoverEffectBGC ( button, {
                expectedBGColor: this.requiredColors[5],
                expectedBGColorOnHover: this.requiredColors[4]
            })
        },
        // 4. Enter a valid set of inputs and click Calculate to produce result section
        'Result Heading meets requirements': async () => {
            const heading = await this.locate ('result heading')
            await this.assertText ( heading, {
                expectedText: this.requiredText.outputLabels[0]
            })
            await this.assertColor ( heading, {
                type: 'text', colorFormat: 'hex',
                expectedColor: this.requiredColorsFunctional.important
            })
            await this.assertColor ( heading, {
                type: 'background', colorFormat: 'hex',
                expectedColor: this.requiredColors[6]
            })
        },
        'Save Icon is aligned to the right': async () => {
            await this.assertCSSPropertyValue ( await this.locate ('save icon'), {
                property: 'float', expectedValue: 'right'
            })
        },
        'Result text lines meet requirements': async () => {
            await this.assertArrayLength ( await this.locate ('results as list'), {
                expectedLength: 3
            })
            await this.assertAttributeValue ( await this.locate ('result line 2 value'), {
                attribute: 'color',
                expectedValue: this.requiredColorsFunctional.success
            })
            await this.assertAttributeValue ( await this.locate ('result line 3 value'), {
                attribute: 'color',
                expectedValue: this.requiredColorsFunctional.success
            })
        },
        // 5. Enter an invalid set of inputs and click Calculate to produce an error message
        'Error message is displayed and using required color': async () => {
            const message = await this.locate('error message')
            await this.assertExists(message)
            await this.assertAttributeValue ( message, {
                attribute: 'color',
                expectedValue: this.requiredColorsFunctional.warning
            })
        }
    }
}

export default new SalesTax()
