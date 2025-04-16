// Simulates the result of an awkward corporate mandated configuration document.
// Perhaps generated by a stack of other defective processes, outside of our control, ends up in poorly structured JSON.
// Maybe it used to be YAML, maybe parts of it came from a CSV file. Who knows?
// But it is nonetheless required to be referenced now. The values here are the single source of truth.
// Change the values here and all of the tests will be updated.
class GUI {
    'Design Requirements' = {
        visuals: { approvedColors: { accentText: {'Silian Grail': '#003366'}, borders: {'Eggshell': '#bbbbbb' }, backgrounds: { 'Bone': '#eeeeee' } },
            lines: { 'primary line width': '1px', 'primary line style': 'solid' },
            symbols: {
                percentage: "url(\"data:image/svg+xml;utf8,<svg xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"17px\\\" height=\\\"20px\\\"><text x=\\\"1\\\" y=\\\"15\\\" style=\\\"font: normal 16px arial;\\\">%</text></svg>\")",
                localizations: {
                    'USA': { dollar: "url(\"data:image/svg+xml;utf8,<svg xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"15px\\\" height=\\\"20px\\\"><text x=\\\"2\\\" y=\\\"15\\\" style=\\\"font: normal 16px arial;\\\">$</text></svg>\")"}
                }
            }
        },
        language: {
            approvedApps: {
                appID34534535: {
                    title: 'Sales Tax Calculator',
                    description: 'The Sales Tax Calculator can compute any one of the following, given inputs for the remaining two: before-tax price, sale tax rate, and final, or after-tax price.',
                    inputLabels: ['Before Tax Price', 'Sales Tax Rate', 'After Tax Price', 'Calculate', 'Clear']
                }
            }
        },
        semantics: { elementLimits: {h1: 1}}
    }
}
export default new GUI()