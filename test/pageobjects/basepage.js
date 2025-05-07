import { browser, expect } from '@wdio/globals'
import GUI from '../requirements/GUI.js'

export default class BasePage {
    // Browser Navigation
    baseURL = 'https://calculator.net'
    openComponentPage(endpoint) {
        return browser.url(`${this.baseURL}/${endpoint}`)
    }
    // Required values that are shared accross all page objects.
    requiredH1Limit = GUI['Design Requirements'].semantics.elementLimits.h1
    requiredLineProperties = [
        GUI['Design Requirements'].visuals.lines['primary line width'],
        GUI['Design Requirements'].visuals.lines['primary line style']
    ]
    requiredSymbols = [
        GUI['Design Requirements'].visuals.symbols.percentage,
        GUI['Design Requirements'].visuals.symbols.localizations['USA'].dollar,
        GUI['Design Requirements'].visuals.symbols.start_play_go_execute
    ]
    requiredColors = [
        GUI['Design Requirements'].visuals.approvedColors.accentText['Silian Grail'],
        GUI['Design Requirements'].visuals.approvedColors.backgrounds['Bone'],
        GUI['Design Requirements'].visuals.approvedColors.borders['Eggshell'],
        GUI['Design Requirements'].visuals.approvedColors.backgrounds['Go Money Green'],
        GUI['Design Requirements'].visuals.approvedColors.backgrounds['Luxurious Granite'],
        GUI['Design Requirements'].visuals.approvedColors.backgrounds['Mistake Grey'],
        GUI['Design Requirements'].visuals.approvedColors.backgrounds['Results Green'],
        GUI['Design Requirements'].visuals.approvedColors.backgrounds['Inactive Tab'],
        GUI['Design Requirements'].visuals.approvedColors.accentText['Eternal Darkness'],
        GUI['Design Requirements'].visuals.approvedColors.borders['Subtle']
    ]
    requiredColorsFunctional = {
        warning: GUI['Design Requirements'].visuals.approvedColors.functional.warning,
        success: GUI['Design Requirements'].visuals.approvedColors.functional.success,
        important: GUI['Design Requirements'].visuals.approvedColors.functional.important
    }
    requiredButtonLabels = { 
        Calc: GUI['Design Requirements'].language.buttonLabels.Calc,
        Clr: GUI['Design Requirements'].language.buttonLabels.Clr
    }
    requiredOutputLabels = { 
        Res: GUI['Design Requirements'].language.output
    }

    // Assertion Methods
    async assertExists (element, bool) {
        switch(bool){
            case false: await expect(element).not.toBeExisting(); break;
            case true: default: await expect(element).toBeExisting()
        }
    }
    async assertDisplayed (element, bool) {
        switch(bool){
            case false: await expect(element).not.toBeDisplayed(); break;
            case true: default: await expect(element).toBeDisplayed()
        }
    }
    async assertArrayLength (array, {expectedLength}) {
        const length = await array.length
        await expect(length).toBe(expectedLength)
    }
    async assertAttributeValue (element, {attribute, expectedValue}) {
        const attributeValue = await element.getAttribute(attribute)
        await expect(attributeValue).toBe(expectedValue)
    }
    async assertText (element, {expectedText}) {
        await expect(element).toHaveText(expectedText)
    }
    async assertColor (element, {type, colorFormat, expectedColor}) {
        let property
        switch(type){
            case 'text': property = 'color'; break
            case 'background': property = 'background-color'; break
            default: property = 'color'
        }
        const color = await element.getCSSProperty(property)
        if (colorFormat == 'hex') {
            await expect(color.parsed.hex).toBe(expectedColor)
        } else { await expect(false).toBeTrue }
    }
    async assertBackgroundImage (element, {expectedImageURL, expectedPosition}) {
        const imageURL = await element.getCSSProperty('background-image')
        const imagePosition = await element.getCSSProperty('background-position')
        await expect(imageURL.value).toBe(expectedImageURL)
        await expect(imagePosition.value).toBe(expectedPosition)
    }
    async assertCSSBorder (element, {expectedColor, expectedWidth, expectedStyle}) {
        const edges = ['top','left','bottom','right']
        for (const edge of edges) {
            const edgeWidth = await element.getCSSProperty(`border-${edge}-width`)
            const edgeStyle = await element.getCSSProperty(`border-${edge}-style`)
            const edgeColor = await element.getCSSProperty(`border-${edge}-color`)
            await expect(edgeWidth.parsed.string).toBe(expectedWidth)
            await expect(edgeStyle.parsed.string).toBe(expectedStyle)
            await expect(edgeColor.parsed.hex).toBe(expectedColor)
        }
    }
    async assertCSSPropertyValue (element, {property, expectedValue}) {
        const elementCSSProperty = await element.getCSSProperty(property)
        await expect(elementCSSProperty.parsed.string).toBe(expectedValue)
    }
    async assertOrderInDOM({elementFirst, elementSecond}) {
        const position = await browser.execute (
            (a,b) => {
                const getIndex = (element) => Array.from(document.body.querySelectorAll('*')).indexOf(element)
                return { indexA: getIndex(a), indexB: getIndex(b) }
            },
            await elementFirst,
            await elementSecond
        )
        expect(position.indexA).toBeLessThan(position.indexB)
    }
    async assertHoverEffectBGC (element, { expectedBGColorOnHover }) {
        // Wiggle mouse over element for a brief moment to make background color assertion more reliable.
        await element.moveTo({ xOffset: 100, yOffset: 100})
        await element.moveTo({ xOffset: 0, yOffset: 1})
        await element.moveTo({ xOffset: 1, yOffset: 0})
        await element.moveTo({ xOffset: 2, yOffset: 0})
        await element.moveTo({ xOffset: 2, yOffset: 3})
        await element.moveTo({ xOffset: 3, yOffset: 2})
        await element.moveTo({ xOffset: 1, yOffset: 1})
        await this.assertColor(element, { type: 'background', colorFormat: 'hex', expectedColor: expectedBGColorOnHover})
    }
}