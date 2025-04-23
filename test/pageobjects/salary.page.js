import { $, expect } from '@wdio/globals'
import BasePage from './basepage.js';
import GUI from '../requirements/GUI.js'

class Salary extends BasePage {
    openComponentPage () { return super.navigate('salary-calculator.html') }

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
    // Abstration layer to map nice string names to getters
    locate (name) {
        let getElement = undefined
        switch(name) {
            case 'heading': getElement = this.componentHeading; break
            case 'heading as list': getElement = this.arrayOfComponentHeading; break
            case 'description': getElement = this.componentDescriptionParagraph; break
            case 'instructions image': getElement = this.instructionImg; break
            default: getElement = undefined
        }
        return getElement
    }

    async calculate ({salaryAmount}) {
        await this.inputSalaryAmount.setValue(salaryAmount)
        await this.buttonCalculate.click()
    }

    
}

export default new Salary();
