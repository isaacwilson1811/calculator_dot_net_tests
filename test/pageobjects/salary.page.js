import { $, expect } from '@wdio/globals'
import BasePage from './basepage.js';
import GUI from '../requirements/GUI.js'

class Salary extends BasePage {
    openComponentPage () { return super.open('salary-calculator.html') }

    // Use properties from the Design Requirements to validate in UI Test
    requiredCount = GUI['Design Requirements'].semantics.elementLimits.h1

    // Define getters to return selectors
    get componentHeading () { return $('//h1') }
    get arrayOfComponentHeading () { return $$('//h1') }
    get inputSalaryAmount () { return $('//input[@id="camount"]') }
    get buttonCalculate () { return $('//input[@type="submit"][@value="Calculate"]')}
    get annualUnadjusted () { return $('(//table[@class="cinfoT"]//td[contains(text(),"Annual")]/following-sibling::td)[1]')}
    // Abstration layer to map nice string names to getters
    locate (name) {
        let getElement = undefined
        switch(name) {
            case 'heading': getElement = this.componentHeading; break
            case 'heading as list': getElement = this.arrayOfComponentHeading; break
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
