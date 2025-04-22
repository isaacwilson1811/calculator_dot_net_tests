import { browser, expect } from '@wdio/globals'

export default class BasePage {
    
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
