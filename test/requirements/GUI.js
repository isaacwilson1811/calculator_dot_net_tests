// Simulates some type of external configuration.
// Change the values here and all of the tests will be updated.
class GUI {
    'Design Requirements' = {
        visuals: {
            approvedColors: {
                functional: {
                    warning: 'red',
                    success: 'green',
                    important: '#ffffff'
                },
                accentText: {
                    'Silian Grail':
                    '#003366'
                },
                borders: {
                    'Eggshell': '#bbbbbb'
                },
                backgrounds: {
                    'Bone': '#eeeeee',
                    'Go Money Green': '#4c7b25',
                    'Luxurious Granite': '#444444',
                    'Mistake Grey': '#ababab',
                    'Results Green': '#518428'
                }
            },
            lines: {
                'primary line width': '1px',
                'primary line style': 'solid'
            },
            symbols: {
                start_play_go_execute: "url(\"data:image/svg+xml;utf8,<svg xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"180px\\\" height=\\\"40px\\\"><circle cx=\\\"112\\\" cy=\\\"20\\\" r=\\\"11\\\" fill=\\\"darkseagreen\\\" /><path d=\\\"m110 12 l120 20 l110 28 z\\\" fill=\\\"white\\\" /></svg>\")",
                percentage: "url(\"data:image/svg+xml;utf8,<svg xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"17px\\\" height=\\\"20px\\\"><text x=\\\"1\\\" y=\\\"15\\\" style=\\\"font: normal 16px arial;\\\">%</text></svg>\")",
                localizations: {
                    'USA': {
                        dollar: "url(\"data:image/svg+xml;utf8,<svg xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"15px\\\" height=\\\"20px\\\"><text x=\\\"2\\\" y=\\\"15\\\" style=\\\"font: normal 16px arial;\\\">$</text></svg>\")"
                    }
                }
            }
        },
        language: {
            approvedApps: {
                appID34534535: {
                    title: 'Sales Tax Calculator',
                    description: 'The Sales Tax Calculator can compute any one of the following, given inputs for the remaining two: before-tax price, sale tax rate, and final, or after-tax price.',
                    inputLabels: ['Before Tax Price', 'Sales Tax Rate', 'After Tax Price', 'Calculate', 'Clear'],
                    outputLabels: ['Result']
                }
            }
        },
        semantics: {
            elementLimits: {h1: 1}
        }
    }
}
export default new GUI()