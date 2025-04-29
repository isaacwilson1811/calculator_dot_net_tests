import { $, expect } from '@wdio/globals'
import BasePage from './basepage.js'
import GUI from '../requirements/GUI.js'

class Salary extends BasePage {
    endpoint = 'salary-calculator.html'

    // Use properties from the Design Requirements to validate in UI Test
    // Approved Text Content from Design Requirements
    requiredText = {
        title: GUI['Design Requirements'].language.approvedApps.appID5553235.title,
        description: GUI['Design Requirements'].language.approvedApps.appID5553235.description,
        inputLabels: GUI['Design Requirements'].language.approvedApps.appID5553235.inputLabels,
        outputLabels: GUI['Design Requirements'].language.approvedApps.appID5553235.outputLabels
    }
    expectedUnitOptions = [
        {value: 'Hourly', text: 'Hour'},
        {value: 'Daily', text: 'Day'},
        {value: 'Weekly', text: 'Week'},
        {value: 'Bi-Weekly', text: 'Bi-week'},
        {value: 'Semi-Monthly', text: 'Semi-Month'},
        {value: 'Monthly', text: 'Month'},
        {value: 'Quarterly', text: 'Quarter'},
        {value: 'Annual', text: 'Year'}
    ]

    // Define getters to return selectors
    get componentHeading () { return $('//h1') }
    get componentDescriptionParagraph () { return $('(//div[@id="content"]/p)[1]') }
    get arrayOfComponentHeading () { return $$('//h1') }
    get annualUnadjusted () { return $('(//table[@class="cinfoT"]//td[contains(text(),"Annual")]/following-sibling::td)[1]')}
    get instructionImg () { return $('//img[@src="//d26tpo4cm8sb6k.cloudfront.net/img/svg/insm.svg"]') }
    get leftColumn () { return $('//div[@class="leftinput"]') }
    get inputContainer () { return $('//form[@name="calform"]/table[@class="panel"]') }
    get rightColumn () { return $('//div[@class="rightresult"]') }
    get inputSalaryAmount () { return $('//input[@id="camount"]') }
    get unitSelect () { return $('//select[@name="cunit"]')}
    get inputHoursPerWeek () { return $('//input[@id="chours"]') }
    get inputDaysPerWeek () { return $('//input[@id="cdays"]') }
    get inputHolidaysPerYear () { return $('//input[@id="cholidays"]') }
    get inputVacationDaysPerYear () { return $('//input[@id="cvacation"]') }
    get buttonCalculate () { return $('//input[@type="submit"][@value="Calculate"]')}
    get buttonClear () { return $('//input[@type="button"][@value="Clear"]')}

    // Main Component function
    async calculate ({salaryAmount, perUnit, hours, days, holidays, vacation}) {
        await this.inputSalaryAmount.setValue(salaryAmount)
        await this.unitSelect.selectByAttribute('value', perUnit)
        await this.inputHoursPerWeek.setValue(hours)
        await this.inputDaysPerWeek.setValue(days)
        await this.inputHolidaysPerYear.setValue(holidays)
        await this.inputVacationDaysPerYear.setValue(vacation)
        await this.buttonCalculate.click()
    }

    // Test Spec Logic
    BROWSER = {
        'Component page is loaded': async () => {
            await this.openComponentPage(this.endpoint)
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
        'Usage Instruction image meets requirements': async () => {
            const image = this.instructionImg
            await this.assertExists(image)
            await this.assertOrderInDOM({elementFirst: image, elementSecond: this.leftColumn})
            await this.assertOrderInDOM({elementFirst: image, elementSecond: this.rightColumn})
        },
        'Input container meets requirements': async () => {
            const container = this.inputContainer
            await this.assertOrderInDOM({elementFirst: container, elementSecond: this.rightColumn})
            await this.assertColor(container, {
                type: 'background',
                colorFormat: 'hex',
                expectedColor: '#eeeeee'
            })
            await this.assertCSSBorder(container, {
                expectedColor:'#bbbbbb',
                expectedWidth: '1px',
                expectedStyle: 'solid'
            })
        },
        'Salary ammount input and label meet requirements': async () => {
            await expect($('//td[contains(text(),"Salary amount")]')).toBeExisting()
            await this.assertBackgroundImage ( this.inputSalaryAmount, {
                expectedImageURL: this.requiredSymbols[1],
                expectedPosition: '0% 50%'
            })
        },
        'Unit select meets requirments': async () => {
            const defaultSelected = await this.unitSelect.getValue()
            await expect(defaultSelected).toBe(this.expectedUnitOptions[0].value)
            for (const option of this.expectedUnitOptions) {
                await this.unitSelect.selectByAttribute('value', option.value)
                await this.assertExists($(`//select[@name="cunit"]/option[@value="${option.value}"]`))
            }
        },
        'Hours per week input and label meet requirements': async () => {
            await this.assertExists($('//td[contains(text(), "Hours per week")]'))
            await this.assertExists(this.inputHoursPerWeek)
        },
        'Days per week input and label meet requirements': async () => {
            await this.assertExists($('//td[contains(text(), "Days per week")]'))
            await this.assertExists(this.inputDaysPerWeek)
        },
        'Holidays per year input and label meet requirements': async () => {
            await this.assertExists($('//td[contains(text(), "Holidays per year")]'))
            await this.assertExists(this.inputHolidaysPerYear)
        },
        'Vacation days per year input and label meet requirements': async () => {
            await this.assertExists($('//td[contains(text(), "Vacation days per year")]'))
            await this.assertExists(this.inputVacationDaysPerYear)
        },
        'Calculate button meets requirements': async () => {
            const button = this.buttonCalculate
            await this.assertAttributeValue ( button, {
                attribute: 'value',
                expectedValue: 'Calculate'
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
                expectedValue: 'Clear'
            })
            await this.assertHoverEffectBGC ( button, {
                expectedBGColor: this.requiredColors[5],
                expectedBGColorOnHover: this.requiredColors[4]
            })
        }
    }

    
}

export default new Salary();
