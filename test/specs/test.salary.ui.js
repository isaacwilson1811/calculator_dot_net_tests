                                                                    /*
[calculator.net] Salary Calculator | UI Layout and Display
https://mtechqa.atlassian.net/browse/MTQA-2505
npx wdio run wdio.conf.js --spec test/specs/test.salary.ui.js
                                                                    */
import Salary from '../pageobjects/salary.page.js'

// Pre condition
describe ( 'Navigate to the page for the component being tested.', () => {
    it ( 'Component page should be loaded.', async () => { await Salary.openComponentPage() })
})

// 1.
describe ( 'Heading element used for the component title', () => {

    it ( 'Should be the only instance of an h1 tag.', async () => {
            await Salary.checkElementCount (
                { 
                    count: Salary.requiredH1Count,
                    element: await Salary.locate ('heading as list')
                }
            )
    })

    it ( 'Should have text matching component title', async () => {
        await Salary.checkElementText (
            { 
                text: Salary.requiredText.title,
                element: await Salary.locate ('heading')
            }
        )
    })

    it ( 'Should have appropriate text color applied', async () => {
        await Salary.checkElementColor (
            { 
                color: Salary.requiredColors[0],
                element: await Salary.locate ('heading')
            }
        )
    })
})

// 2.
describe ( 'Text element used for the component description.', () => {

    it ( 'Should match the description text', async () => {
        await Salary.checkElementText (
            {
                text: Salary.requiredText.description,
                element: await Salary.locate ('description')
            }
        )
    })
})

// 3.
describe ( 'Usage instructions heading image.', () => {

    it ( 'Should be visible above input container and result section', async () => {
        const image = await Salary.locate ('instructions image') 
        await Salary.checkElementExists (
            { element: image }
        )
        await Salary.checkElementAIsBeforeElementB ( image, $('//div[@class="leftinput"]') )
        await Salary.checkElementAIsBeforeElementB ( image, $('//div[@class="rightresult"]') )
    })
})

// 4.
// Container holding value inputs and function buttons.

// 5.
// Result section and data table

// 6.
// Additional information text element

// 7.
// Enter a valid set of inputs and click Calculate to populate results table.

// 8.
// Enter an invalid set of inputs and click Calculate to produce an error message.