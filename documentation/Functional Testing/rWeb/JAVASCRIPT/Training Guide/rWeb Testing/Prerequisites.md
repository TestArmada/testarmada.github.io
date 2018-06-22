### Prerequisites

Even though we’ve included everything that is needed in the **package.json** file, it’s always good to have an idea on which dependency is a *must* for your desktop browser test. 
- The following dependencies are required in the **package.json**.
```bash
{
  "dependencies": {
  "nightwatch": "^0.9.11",
  "selenium-server": "^3.1.0"
  }
}
```
- _[magellan-local-browser](https://github.com/TestArmada/magellan-local-executor)_ is also required for your local test.
```bash
{
  "dependencies": {
  "testarmada-magellan-local-executor": "^2.0.0"
  }
}
```

 - Depending on which browser you want to test, you need to include specific browser driver in your **package.json**. E.g. If you want to run your tests on both Chrome and Firefox:
```bash
{
  "dependencies": {
    "chromedriver": "^2.27.2",
    "geckodriver": "^1.4.0"
    }
}
```
- Then, you need to add these drivers in the **nightwatch.json** file. E.g.
```bash
    "cli_args": {
      "webdriver.chrome.driver": "./node_modules/chromedriver/lib/chromedriver/chromedriver",
      "webdriver.gecko.driver": "./node_modules/geckodriver/bin/geckodriver"
    }
```