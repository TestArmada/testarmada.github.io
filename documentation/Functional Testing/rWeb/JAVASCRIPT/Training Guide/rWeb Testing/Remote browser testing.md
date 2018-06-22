### Remote browser testing

Don’t have a desired browser in your local? No worry, you can use the following executors for remote test.

- [magellan-saucelabs-executor](https://github.com/TestArmada/magellan-saucelabs-executor): Drive tests on [Saucelabs](https://saucelabs.com/)
- [magellan-testobject-executor](https://github.com/TestArmada/magellan-testobject-executor): Drive tests on [TestObject](https://testobject.com/) 
- [magellan-browserstack-executor](https://github.com/TestArmada/magellan-browserstack-executor): Drive tests on [Browserstack](https://www.browserstack.com/)
- [magellan-seleniumgrid-executor](https://github.com/TestArmada/magellan-seleniumgrid-executor):  Drive tests in selenium grid 

### Enable an executor

To do the remote browser test, you need to enable an executor:
 - Install the wanted executor via **npm install** or add it into your **package.json** file. 
 - E.g. install from **npm install**:
 ```bash
 npm install testarmada-magellan-saucelabs-executor --save
```
 - Add following code in your `magellan.json`
```bash
{
  "executors": [
    "testarmada-magellan-saucelabs-executor"
  ],
  "strategy_bail": "testarmada-magellan-early-bail-strategy"
}
```
 - Please note: Some executors need specific configuration to be functional. Please refer to the *README.md* in executor’s repo for detail configuration.

### Run tests with multiple executors

Magellan allows to run tests with one or more executors at the same time. This is done by passing a specific command line argument to magellan. 

 - For local tests, after enable _[magellan-local-executor](https://github.com/TestArmada/magellan-local-executor)_
```bash
# to run test in Chrome
--local_browser chrome
# to run test in both Chrome and Firefox
--local_browsers chrome, firefox
```

#### Quiz
- Can you enable both _[magellan-local-executor](https://github.com/TestArmada/magellan-local-executor)_ and _[magellan-saucelabs-executor](https://github.com/TestArmada/magellan-saucelabs-executor)_ for your test? and run test in local Chrome and Chrome 60 on Sauce Labs?