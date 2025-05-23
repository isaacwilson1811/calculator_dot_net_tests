// Requirement Configuration data.
// Values defined here are used in test assertions.
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
                    'Silian Grail': '#003366',
                    'Eternal Darkness': '#000000'
                },
                borders: {
                    'Eggshell': '#bbbbbb',
                    'Subtle': '#cccccc'
                },
                backgrounds: {
                    'Bone': '#eeeeee',
                    'Go Money Green': '#4c7b25',
                    'Luxurious Granite': '#444444',
                    'Mistake Grey': '#ababab',
                    'Results Green': '#518428',
                    'Inactive Tab': '#336699'
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
            buttonLabels: { Calc: 'Calculate', Clr: 'Clear' },
            output: 'Result'
        },
        semantics: {
            elementLimits: {h1: 1}
        }
    }
}
export default new GUI()