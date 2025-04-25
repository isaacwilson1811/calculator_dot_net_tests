import { $ } from '@wdio/globals'
import BasePage from './basepage.js';
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
    // Define getters to return selectors
    get componentHeading () { return $('//h1') }
    get componentDescriptionParagraph () { return $('(//div[@id="content"]/p)[1]') }
    get arrayOfComponentHeading () { return $$('//h1') }
    get inputSalaryAmount () { return $('//input[@id="camount"]') }
    get buttonCalculate () { return $('//input[@type="submit"][@value="Calculate"]')}
    get annualUnadjusted () { return $('(//table[@class="cinfoT"]//td[contains(text(),"Annual")]/following-sibling::td)[1]')}
    get instructionImg () { return $('//img[@src="//d26tpo4cm8sb6k.cloudfront.net/img/svg/insm.svg"]') }
    get leftColumn () {return $('//div[@class="leftinput"]') }
    get inputContainer () {return $('//form[@name="calform"]/table[@class="panel"]') }
    get rightColumn () {return $('//div[@class="rightresult"]') }
    // Abstration layer to map nice string names to getters

    async calculate ({salaryAmount}) {
        await this.inputSalaryAmount.setValue(salaryAmount)
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
            await this.assertArrayLength( await this.arrayOfComponentHeading, { 
                expectedLength: 1 
            })
        },
        'Heading text content matches requirement': async () => {
            await this.assertText( await this.componentHeading, { 
                expectedText: this.requiredText.title 
            })
        },
        'Heading text color matches requirement': async () => {
            await this.assertColor( await this.componentHeading, {
                type: 'text', colorFormat: 'hex',
                expectedColor: this.requiredColors[0]
            })
        },
        'Description element text matches requirement': async () => {
            await this.assertText ( await this.componentDescriptionParagraph, { 
                expectedText: this.requiredText.description 
            })
        },
        'Usage Instruction image meets requirements': async () => {
            const image = await this.instructionImg
            await this.assertExists(image)
            await this.assertOrderInDOM({elementFirst: image, elementSecond: await this.leftColumn})
            await this.assertOrderInDOM({elementFirst: image, elementSecond: await this.rightColumn})
        },
        'Input container meets requirements': async () => {
            const container = await this.inputContainer
            await this.assertOrderInDOM({elementFirst: container, elementSecond: await this.rightColumn})
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
        }
    }

    
}

export default new Salary();
