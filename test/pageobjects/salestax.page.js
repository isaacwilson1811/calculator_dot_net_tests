import { $ } from '@wdio/globals'
import BasePage from './basepage.js'

class SalesTax extends BasePage {
    // Component Page
    endpoint = 'sales-tax-calculator.html'
    // Required Text Values
    requiredText = {
        title: 'Sales Tax Calculator',
        description: 'The Sales Tax Calculator can compute any one of the following, given inputs for the remaining two: before-tax price, sale tax rate, and final, or after-tax price.',
        inputLabels: { BT: 'Before Tax Price', TR: 'Sales Tax Rate', AT: 'After Tax Price' }
    }
    // Element Selectors
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
    get resultsArray () { return $$('//div/div[@class="verybigtext"]') }
    get resultLine2Value () { return $('(//*[@class="verybigtext"])[2]//font') }
    get resultLine3Value () { return $('(//*[@class="verybigtext"])[3]//font') }
    get errorMessage () { return $('//font[@color="red"]') }
    get errorMessages () { return $$('//font[@color="red"]') }

    // Component functions
    async calculate ({beforeTax, taxRate, afterTax}) {
        beforeTax ? await this.inputBeforeTax.setValue(beforeTax) : await this.inputBeforeTax.setValue('')
        taxRate ? await this.inputTaxRate.setValue(taxRate) : await this.inputTaxRate.setValue('')
        afterTax ? await this.inputAfterTax.setValue(afterTax) : await this.inputAfterTax.setValue('')
        await this.buttonCalculate.click()
    }
    async verifyResultsText (textArray) {
        const results = this.resultsArray
        for (let i = 0; i < results.length; i++) {
            await this.assertText(results[i], {
                expectedText: textArray[i]
            })
        }
    }
    async verifyErrorText (text) {
        await this.assertText(this.errorMessage, {expectedText: text})
    }
    async verifyErrorsText (textArray) {
        const messages = this.errorMessages
        for (let i = 0; i < messages.length; i++) {
            await this.assertText(messages[i], {
                expectedText: textArray[i]
            })
        }
    }
    async verifyInputsClear () {
        const inputArray = [this.inputBeforeTax, this.inputTaxRate, this.inputAfterTax]
        for (const input of inputArray) {
            await this.assertText(input, {expectedText: ''})
        }
    }

    // Test logic
    BROWSER = {
        'Component page is loaded': async () => {
            await this.openComponentPage(this.endpoint)
        }
    }
    CALCULATE = {
        'With minumum values BT TR': async () => {
            await this.calculate ({ beforeTax: '0.01', taxRate: '0' })
            await this.verifyResultsText([
                'Before Tax Price: $0.01',
                'Sale Tax: 0.00% or $0.00',
                'After Tax Price: $0.01'
            ])
        },
        'With minumum values BT AT': async () => {
            await this.calculate ({ beforeTax: '0.01', afterTax: '0.02' })
            await this.verifyResultsText([
                'Before Tax Price: $0.01',
                'Sale Tax: 100.00% or $0.01',
                'After Tax Price: $0.02'
            ])
        },
        'With minumum values ST AT': async () => {
            await this.calculate ({ taxRate: '0', afterTax: '0' })
            await this.verifyResultsText([
                'Before Tax Price: $0.00',
                'Sale Tax: 0.00% or $0.00',
                'After Tax Price: $0.00'
            ])
        },
        'With maximum values BT TR': async () => {
            await this.calculate ({
                beforeTax: '1,999,000,000,000,000,000,000.00',
                taxRate: '12.625'
            })
            await this.verifyResultsText([
                'Before Tax Price: $1,999,000,000,000,000,000,000.00',
                'Sale Tax: 12.63% or $252,373,750,000,000,008,192.00',
                'After Tax Price: $2,251,373,749,999,999,909,888.00'
            ])
        },
        'With maximum values BT AT': async () => {
            await this.calculate ({
                beforeTax: '100,000,000,000,000,000,000.00',
                afterTax: '1,900,000,000,000,000,000,000.00'
            })
            await this.verifyResultsText([
                'Before Tax Price: $100,000,000,000,000,000,000.00',
                'Sale Tax: 1,800.00% or $1,800,000,000,000,000,000,000.00',
                'After Tax Price: $1,900,000,000,000,000,000,000.00'
            ])
        },
        'With maximum values TR AT': async () => {
            await this.calculate ({
                taxRate: '12.625',
                afterTax: '1,999,000,000,000,000,000,000.00'
            })
            await this.verifyResultsText([
                'Before Tax Price: $1,774,916,759,156,492,861,440.00',
                'Sale Tax: 12.63% or $224,083,240,843,507,138,560.00',
                'After Tax Price: $1,999,000,000,000,000,000,000.00'
            ])
        },
        'Valid inputs calculated': async () => { 
            await this.calculate ({ beforeTax: '100', taxRate: '6.5' }) 
        },
        'BT (4.99), TR (6.1), AT (_)': async () => { 
            await this.calculate({ beforeTax: '4.99', taxRate: '6.1' })
            await this.verifyResultsText([
                'Before Tax Price: $4.99',
                'Sale Tax: 6.10% or $0.30',
                'After Tax Price: $5.29'
            ])
        },
        'BT (49.99), TR (_), AT (56.01)': async () => { 
            await this.calculate({ beforeTax: '49.99', afterTax: '56.01' })
            await this.verifyResultsText([
                'Before Tax Price: $49.99',
                'Sale Tax: 12.04% or $6.02',
                'After Tax Price: $56.01'
            ])
        },
        'BT (_), TR (8.5), AT (215.90)': async () => { 
            await this.calculate({ taxRate:'8.5', afterTax: '215.90' })
            await this.verifyResultsText([
                'Before Tax Price: $198.99',
                'Sale Tax: 8.50% or $16.91',
                'After Tax Price: $215.90'
            ])
        }
    }
    CLEAR = {
        'Inputs are empty after clicking Clear button': async () => {
            await this.calculate({beforeTax:'1',taxRate:'1',afterTax:'1'})
            await this.buttonClear.click()
            await this.verifyInputsClear()
        }
    }
    ERROR = {
        'Invalid inputs produced an error message': async () => {
            await this.buttonClear.click()
            await this.calculate({})
        },
        'Error message when given no values': async () => {
            await this.buttonClear.click()
            await this.calculate({})
            await this.verifyErrorText('Please provide at least two values to calculate.')
        },
        'Error message when given only 1 value greater than 0': async () => {
            await this.buttonClear.click()
            await this.calculate({afterTax:'100'})
            await this.verifyErrorText('Please provide at least two values to calculate.')
        },
        'Error message when given only Before Tax Price ($0)': async () => {
            await this.buttonClear.click()
            await this.calculate({beforeTax:'0'})
            await this.verifyErrorText('Please provide a valid before tax price.')
        },
        'Error message when given Before Tax Price ($0), Sales Tax Rate (text characters not numeric)': async () => {
            await this.buttonClear.click()
            await this.calculate({beforeTax:'0',taxRate:'wrong input type'})
            await this.verifyErrorsText([
                'Please provide a valid before tax price.',
                'Please provide a valid sales tax rate.'
            ])
        },
        'Error message when given Before Tax Price ($1), After Tax Price ($0)': async () => {
            await this.buttonClear.click()
            await this.calculate({beforeTax:'1', afterTax: '0', taxRate: ''})
            await this.verifyErrorText('After tax price can not be smaller than before tax price.')
        },
        'Error message when given BT (-1), TR (txt), AT (-1)': async () => {
            await this.buttonClear.click()
            await this.calculate({beforeTax: '-1', taxRate: 'wrong type', afterTax: '-1'})
            await this.verifyErrorsText([
                'Please provide a valid before tax price.',
                'Please provide a valid sales tax rate.',
                'Please provide a valid after tax price.'
            ])
        }
    }
    UI = {
        'Heading element is the only h1 on the page': async () => {
            await this.assertArrayLength( this.arrayOfComponentHeading, { 
                expectedLength: 1 
            })
        },
        'Heading text content matches requirement': async () => {
            await this.assertText( this.componentHeading, { 
                expectedText: this.requiredText.title 
            })
        },
        'Heading text color matches requirement': async () => {
            await this.assertColor( this.componentHeading, {
                type: 'text', colorFormat: 'hex',
                expectedColor: this.requiredColors[0]
            })
        },
        'Description element text matches requirement': async () => {
            await this.assertText ( this.componentDescriptionParagraph, { 
                expectedText: this.requiredText.description 
            })
        },
        'Container has required background color': async () => {
            await this.assertColor ( this.inputPanel, {
                type: 'background', colorFormat: 'hex',
                expectedColor: this.requiredColors[1]
            })
        },
        'Container has required CSS border': async () => {
            await this.assertCSSBorder ( this.inputPanel, {
                expectedColor: this.requiredColors[2],
                expectedWidth: this.requiredLineProperties[0],
                expectedStyle: this.requiredLineProperties[1],
            })
        },
        'Container is centered horizontally': async () => {
            await this.assertAttributeValue ( this.inputPanelTable, {
                attribute: 'align', expectedValue: 'center'
            })
        },
        'Before Tax Price input and label meet requirements': async () => {
            await this.assertText ( this.inputBeforeTaxLabel, {
                expectedText: this.requiredText.inputLabels.BT
            })
            await this.assertBackgroundImage ( this.inputBeforeTax, {
                expectedImageURL: this.requiredSymbols[1],
                expectedPosition: '0% 50%'
            })
        },
        'Sales Tax Rate input and label meet requirements': async () => {
            await this.assertText ( this.inputTaxRateLabel, {
                expectedText: this.requiredText.inputLabels.TR
            })
            await this.assertBackgroundImage ( this.inputTaxRate, { 
                expectedImageURL: this.requiredSymbols[0],
                expectedPosition: '100% 50%'
            })
        },
        'After Tax Price input and label meet requirements': async () => {
            await this.assertText ( this.inputAfterTaxLabel, {
                expectedText: this.requiredText.inputLabels.AT
            })
            await this.assertBackgroundImage ( this.inputAfterTax, {
                expectedImageURL: this.requiredSymbols[1],
                expectedPosition: '0% 50%'
            })
        },
        'Calculate button meets requirements': async () => {
            const button = this.buttonCalculate
            await this.assertAttributeValue ( button, {
                attribute: 'value',
                expectedValue: this.requiredButtonLabels.Calc
            })
            await this.assertHoverEffectBGC ( button, {
                expectedBGColorOnHover: this.requiredColors[4]
            })
            await this.assertBackgroundImage ( button, {
                expectedImageURL: this.requiredSymbols[2],
                expectedPosition: '0%'
            })
        },
        'Clear button meets requirments': async () => {
            const button = this.buttonClear
            await this.assertAttributeValue ( button, {
                attribute: 'value',
                expectedValue: this.requiredButtonLabels.Clr
            })
            await this.assertHoverEffectBGC ( button, {
                expectedBGColor: this.requiredColors[5],
                expectedBGColorOnHover: this.requiredColors[4]
            })
        },
        'Result Heading meets requirements': async () => {
            const heading = this.resultHeading
            await this.assertText ( heading, {
                expectedText: this.requiredOutputLabels.Res
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
            await this.assertCSSPropertyValue ( this.buttonSave, {
                property: 'float', expectedValue: 'right'
            })
        },
        'Result text lines meet requirements': async () => {
            await this.assertArrayLength ( this.resultsArray, {
                expectedLength: 3
            })
            await this.assertAttributeValue ( this.resultLine2Value, {
                attribute: 'color',
                expectedValue: this.requiredColorsFunctional.success
            })
            await this.assertAttributeValue ( this.resultLine3Value, {
                attribute: 'color',
                expectedValue: this.requiredColorsFunctional.success
            })
        },
        'Error message is displayed and using required color': async () => {
            const message = this.errorMessage
            await this.assertExists(message)
            await this.assertAttributeValue ( message, {
                attribute: 'color',
                expectedValue: this.requiredColorsFunctional.warning
            })
        }
    }
}

export default new SalesTax()
