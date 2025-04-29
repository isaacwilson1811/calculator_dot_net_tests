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
    get buttonSave () { return $('//img[@src="//d26tpo4cm8sb6k.cloudfront.net/img/save.svg"]') }
    get resultSection () { return $('(//table[@class="cinfoT"])[1]') }
    get resultHeading () { return $('//h2[@class="h2result"]') }
    get errorSection () { return $('//div[@style="padding: 5px 0px 5px 30px;background-image: url(\'//d26tpo4cm8sb6k.cloudfront.net/img/svg/error.svg\');background-repeat: no-repeat;"]')}
    get errorMessages () { return $$('//div[@style="padding: 5px 0px 5px 30px;background-image: url(\'//d26tpo4cm8sb6k.cloudfront.net/img/svg/error.svg\');background-repeat: no-repeat;"]/div/font')}

    // Main Component function
    async calculate ({salaryAmount, perUnit, hours, days, holidays, vacation}) {
        await this.inputSalaryAmount.setValue(salaryAmount)
        await this.unitSelect.selectByAttribute('value', perUnit)
        await this.inputHoursPerWeek.setValue(hours)
        await this.inputDaysPerWeek.setValue(days)
        await this.inputHolidaysPerYear.setValue(holidays)
        await this.inputVacationDaysPerYear.setValue(vacation)
        await this.buttonCalculate.click()
        await browser.scroll(0, -200)
    }
    async verifyResults(col2,col3){
        for (let row = 2; row < 9; row++) {
            for (let col = 2; col < 4; col++){
                const currentCell = $(`(((//table[@class="cinfoT"])[1]/tbody/tr)[${row}]/td)[${col}]`)
                let text
                if (col == 2){text = col2[row-2]}
                else if (col == 3){ text = col3[row-2]}
                await this.assertText(currentCell, { expectedText: text })
            }
        }
    }
    async verifyInputsClear() {
        const inputs = [this.inputSalaryAmount, this.inputHoursPerWeek, this.inputDaysPerWeek, this.inputHolidaysPerYear, this.inputVacationDaysPerYear]
        for (const input of inputs) {
            await this.assertText(input,{expectedText: ''})
        }
    }

    // Test Spec Logic
    BROWSER = {
        'Component page is loaded': async () => {
            await this.openComponentPage(this.endpoint)
        }
    }
    CALCULATE = {
        'Inputs are empty after clicking Clear': async () => {
            await this.inputSalaryAmount.setValue('100')
            await this.inputHoursPerWeek.setValue('100')
            await this.inputDaysPerWeek.setValue('100')
            await this.inputHolidaysPerYear.setValue('100')
            await this.inputVacationDaysPerYear.setValue('100')
            await this.buttonClear.click()
            await this.verifyInputsClear()
        },
        'Positive test sample 1': async () => {
            await this.calculate({
                salaryAmount: '80000', perUnit: 'Annual',
                hours: '40', days: '5', holidays: '12', vacation: '25'
            })
            await this.verifyResults(
                ['$44.84','$358.74','$1,794','$3,587','$3,886','$7,773','$23,318','$93,274'],
                ['$38.46','$307.69','$1,538','$3,077','$3,333','$6,667','$20,000','$80,000']
            )
        },
        'Positive test sample 2': async () => {
            await this.calculate({
                salaryAmount: '11', perUnit: 'Hourly',
                hours: '45', days: '6', holidays: '5', vacation: '0'
            })
            await this.verifyResults(
                ['$11.00','$82.50','$495','$990','$1,073','$2,145','$6,435','$25,740'],
                ['$10.79','$80.91','$485','$971','$1,052','$2,104','$6,311','$25,245']
            )
        }
    }
    UI = {
        'Heading element is the only h1 on the page': async () => {
            await this.assertArrayLength( this.arrayOfComponentHeading, { expectedLength: 1 })
        },
        'Heading text content matches requirement': async () => {
            await this.assertText( this.componentHeading, { expectedText: this.requiredText.title })
        },
        'Heading text color matches requirement': async () => {
            await this.assertColor( this.componentHeading, {
                type: 'text', colorFormat: 'hex',
                expectedColor: this.requiredColors[0]
            })
        },
        'Description element text matches requirement': async () => {
            await this.assertText ( this.componentDescriptionParagraph, { expectedText: this.requiredText.description })
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
            await this.assertColor( container, {
                type: 'background',
                colorFormat: 'hex',
                expectedColor: '#eeeeee'
            })
            await this.assertCSSBorder( container, {
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
            await this.assertHoverEffectBGC ( button, { expectedBGColorOnHover: this.requiredColors[4]})
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
            await this.assertHoverEffectBGC ( button, { expectedBGColorOnHover: this.requiredColors[4] })
        },
        'Results are displayed to the right of inputs': async () => {
            await this.assertOrderInDOM({elementFirst: this.leftColumn, elementSecond: this.resultSection})
        },
        'Result Heading meets requirements': async () => {
            const heading = this.resultHeading
            await this.assertText ( heading, { expectedText: 'Result' })
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
        'Result Table row and column count meets requirements': async () => {
            const tableRows = $$('(//table[@class="cinfoT"])[1]/tbody/tr')
            await this.assertArrayLength(tableRows, {expectedLength: 9 })
            for (let row = 1; row < 10; row++) {
                const columns = $$(`((//table[@class="cinfoT"])[1]/tbody/tr)[${row}]/td`)
                await this.assertArrayLength(columns, {expectedLength: 3})
            }
        },
        'Top row of results table meets requirements': async () => {
            const td1 = $('(((//table[@class="cinfoT"])[1]/tbody/tr)[1]/td)[1]')
            await this.assertText(td1,{expectedText: ''})
            await this.assertColor(td1,{type:'text',colorFormat:'hex', expectedColor:'#ffffff'})
            await this.assertColor(td1,{type:'background',colorFormat:'hex', expectedColor:'#336699'})
            const td2 = $('(((//table[@class="cinfoT"])[1]/tbody/tr)[1]/td)[2]')
            await this.assertText(td2,{expectedText: 'Unadjusted'})
            await this.assertColor(td2,{type:'text',colorFormat:'hex', expectedColor:'#ffffff'})
            await this.assertColor(td2,{type:'background',colorFormat:'hex', expectedColor:'#336699'})
            const td3 = $('(((//table[@class="cinfoT"])[1]/tbody/tr)[1]/td)[3]')
            await this.assertText(td3,{expectedText: 'Holidays & vacation days adjusted'})
            await this.assertColor(td3,{type:'text',colorFormat:'hex', expectedColor:'#ffffff'})
            await this.assertColor(td3,{type:'background',colorFormat:'hex', expectedColor:'#336699'})
        },
        'Data rows of result table meet background color and border requirements. Columns are labeled and meet text requirments.': async () => {
            const columnLabels = ['0','','Hourly', 'Daily', 'Weekly', 'Bi-weekly', 'Semi-monthly', 'Monthly', 'Quarterly', 'Annual']
            const rowBGColor = {odd: '#ffffff', even: '#eeeeee'}
            for (let row = 2; row < 9; row++) {
                const currentRow = $(`((//table[@class="cinfoT"])[1]/tbody/tr)[${row}]`)
                await this.assertColor(currentRow,{
                    type:'background', colorFormat:'hex',
                    expectedColor: row%2==0? rowBGColor.odd : rowBGColor.even
                })
                for (let col = 1; col < 4; col++){
                    const currentCell = $(`(((//table[@class="cinfoT"])[1]/tbody/tr)[${row}]/td)[${col}]`)
                    await this.assertCSSBorder(currentCell, {
                        expectedColor:'#cccccc',
                        expectedWidth: '1px',
                        expectedStyle: 'solid'
                    })
                    await this.assertText(currentCell, { 
                        expectedText: col==1? columnLabels[row] : expect.stringContaining('$')
                    })
                }
            }
        },
        'Additional information text meets positional requirements': async () => {
            const paragraph = $('//p[contains(text(),"This salary calculator assumes")]')
            await this.assertOrderInDOM({elementFirst: $('//div[@id="clear"]'), elementSecond: paragraph})
        },
        'Additional information text meets text content requirements': async () => {
            const paragraph = $('//p[contains(text(),"This salary calculator assumes")]')
            await this.assertText(paragraph,{
                expectedText: "This salary calculator assumes the hourly and daily salary inputs to be unadjusted values. All other pay frequency inputs are assumed to be holidays and vacation days adjusted values. This calculator also assumes 52 working weeks or 260 weekdays per year in its calculations. The unadjusted results ignore the holidays and paid vacation days."
            })
        },
        'Calculating hides the description text': async () => {
            await this.calculate({
                salaryAmount: '2', perUnit: 'Annual',
                hours: '2', days: '2', holidays: '2', vacation: '2'
            })
            await expect($('//div[@id="content"]/p[contains(text(),"The Salary Calculator converts")]')).not.toBeExisting()
        },
        'Calculating updates the result table text content': async () => {
            await this.calculate({
                salaryAmount: '1', perUnit: 'Annual',
                hours: '1', days: '1', holidays: '1', vacation: '1'
            })
            await this.verifyResults(
                ['$0.02', '$0.02', '$0', '$0', '$0', '$0', '$0', '$1'],
                ['$0.02', '$0.02', '$0', '$0', '$0', '$0', '$0', '$1']
            )
        },
        'Error container replaces results section': async () => {
            await this.calculate({
                salaryAmount: '', perUnit: 'Daily',
                hours: '', days: '', holidays: '', vacation: ''
            })
            await expect(this.resultHeading).not.toBeExisting()
            await expect(this.errorSection).toBeExisting()
            
        },
        'Error message text is highlighted in the correct color': async () => {
            const font = this.errorSection.$('//div/font')
            await this.assertAttributeValue(font, {attribute: 'color', expectedValue: 'red'})
        }
    }

    
}

export default new Salary();
