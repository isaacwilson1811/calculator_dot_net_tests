import { $ } from '@wdio/globals'
import BasePage from './basepage.js';

class Salary extends BasePage {

    get inputSalaryAmount () {
        return $('//input[@id="camount"]')
    }

    get buttonCalculate () {
        return $('//input[@type="submit"][@value="Calculate"]');
    }

    get annualUnadjusted () {
        return $('(//table[@class="cinfoT"]//td[contains(text(),"Annual")]/following-sibling::td)[1]')
    }

    async calculate ({salaryAmount}) {
        await this.inputSalaryAmount.setValue(salaryAmount)
        await this.buttonCalculate.click()
    }

    navigateToPage () {
        return super.open('salary-calculator.html')
    }
}

export default new Salary();
