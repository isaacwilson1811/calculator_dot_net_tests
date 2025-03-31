import { $ } from '@wdio/globals'
import Page from './page.js';

class Salary extends Page {

    get inputSalaryAmmount () {
        return $('//input[@id="camount"]')
    }

    get buttonCalculate () {
        return $('//input[@type="submit"][@value="Calculate"]');
    }

    get annualUnadjusted () {
        return $('(//table[@class="cinfoT"]//td[contains(text(),"Annual")]/following-sibling::td)[1]')
    }

    async calculate ({salaryAmount}) {
        await this.inputSalaryAmmount.setValue(salaryAmount)
        await this.buttonCalculate.click()
    }

    navigateToPage () {
        return super.open('salary-calculator.html')
    }
}

export default new Salary();
