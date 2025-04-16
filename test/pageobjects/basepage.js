import { browser } from '@wdio/globals'

export default class BasePage {
    open (path) {
        return browser.url(`https://calculator.net/${path}`)
    }
}
