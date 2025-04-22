import { browser, expect } from '@wdio/globals'
import GUI from '../requirements/GUI.js'

export default class BasePage {
    // Use properties from the Design Requirements to validate UI Tests
    requiredCount = GUI['Design Requirements'].semantics.elementLimits.h1
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
        GUI['Design Requirements'].visuals.approvedColors.backgrounds['Results Green']
    ]
    requiredColorsFunctional = {
        warning: GUI['Design Requirements'].visuals.approvedColors.functional.warning,
        success: GUI['Design Requirements'].visuals.approvedColors.functional.success,
        important: GUI['Design Requirements'].visuals.approvedColors.functional.important
    }
    
    open (path) {
        return browser.url(`https://calculator.net/${path}`)
    }

    async checkElementExists ({element}) {
        await expect(element).toBeExisting()
    }
    
    async checkElementCount ({element, count}) {
        const elementArray = element
        await expect(elementArray.length).toBe(count)
    }

    async checkElementAttribute ({element, attribute, value}) {
        const attributeValue = await element.getAttribute(attribute)
        await expect(attributeValue).toBe(value)
    }

    async checkElementText ({element, text}) {
        await expect(element).toHaveText(text)
    }
    
    async checkElementColor ({element, color}) {
        const elementColor = await element.getCSSProperty('color')
        await expect(elementColor.parsed.hex).toBe(color)
    }

    async checkElementBackgroundColor ({element, color}) {
        const elementBGcolor = await element.getCSSProperty('background-color')
        await expect(elementBGcolor.parsed.hex).toBe(color)
    }
    
    async checkElementBackgroundImage ({element, image, position}) {
        const imageURL = await element.getCSSProperty('background-image')
        const imagePosition = await element.getCSSProperty('background-position')
        await expect(imageURL.value).toBe(image)
        await expect(imagePosition.value).toBe(position)
    }

    async checkElementBorder ({element, edgesToCheck, width, style, color}) {
        edgesToCheck.forEach( async (edge) => {
            const edgeWidth = await element.getCSSProperty(`border-${edge}-width`)
            const edgeStyle = await element.getCSSProperty(`border-${edge}-style`)
            const edgeColor = await element.getCSSProperty(`border-${edge}-color`)
            await expect(edgeWidth.parsed.string).toBe(width)
            await expect(edgeStyle.parsed.string).toBe(style)
            await expect(edgeColor.parsed.hex).toBe(color)
        })
        
    }
    
    async checkElementCSSProperty ({element, property, value}) {
        const p = await element.getCSSProperty(property)
        await expect(p.parsed.string).toBe(value)
    }

    async checkElementAlign ({element, align}) {
        const elementAlign = await element.getAttribute('align')
        await expect(elementAlign).toBe(align)
    }
    
    async checkElementAIsBeforeElementB(elementA, elementB) {
        const position = await browser.execute(
            (a, b) => {
                const getIndex = el => Array.from(document.body.querySelectorAll('*')).indexOf(el)
                return { aIndex: getIndex(a), bIndex: getIndex(b) }
            }, await elementA, await elementB
        )
        expect(position.aIndex).toBeLessThan(position.bIndex)
    }
    
    async hoverOverElement ({element}) {
        const e = element
        await e.moveTo({ xOffset: -10, yOffset: 2})
        await e.moveTo({ xOffset: 10, yOffset: -2})
        await e.moveTo()
    }

    async checkElementHoverStates ({element, before, after}) {
        await this.checkElementBackgroundColor({element: element, color: before})
        await this.hoverOverElement({element: element})
        await this.checkElementBackgroundColor({element: element, color: after})
    }
}
