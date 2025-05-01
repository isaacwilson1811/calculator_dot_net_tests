# Automated Tests For Calculator.net
__Fully__ tests __4__ Different Calculators against __4__ Categories of Tests.

* UI Layout and Display
* Intended Error States and Messages
* Input Boundaries / Output Limits
* Positive Expected Use Cases

## Installing
```
git clone https://github.com/isaacwilson1811/calculator_dot_net_tests.git
cd calculator_dot_net_tests
npm install
```
## Running tests
`npm run all`
| By Type            | By Calculator     |
| ------------------ |-------------------|
| `npm run ui`       | `npm run salestax`|
| `npm run error`    | `npm run salary`  |
| `npm run iobound`  | `npm run payment` |
| `npm run positive` | `npm run compound`|