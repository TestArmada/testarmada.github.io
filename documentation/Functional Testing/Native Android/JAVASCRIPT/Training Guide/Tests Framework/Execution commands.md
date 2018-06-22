## Execution commands
After getting your tests up and running, you probably have tons of questions regarding how this work, let’s start with the command that we are using to get the tests running in local, which is:

```bash
./node_modules/.bin/magellan --config magellan.json --local_browser appiumandroidapp --test tests/app.test.js --serial 
```

- Commands parameters ***--test*** , ***--serial***, ***--config***, etc are all magellan arguments. To find all magellan command line arguments and the usages:
```bash
./node_modules/.bin/magellan --help
```
- Magellan is part of the functional JS TDK, and it is designed for running tests in massive scale. 

  Following is an example that telling magellan to run tests with 30 workers, 5 retry attempts per failed test 
```bash
./node_modules/.bin/magellan --max_workers 30 --max_test_attempts 5
```

- **--local_browser appiumandroidapp** tells tests to use [testarmada-magellan-local-executor](https://github.com/TestArmada/magellan-local-executor) . It loads Desired Capabilities from nightwatch.json.

    For our sample here, it will load ***appiumandroidapp*** desired capability from nightwatch.json file:
    
   To know more about Desired Capability, please read the next training section - Android Automation.
   
- **Executor**  \- acts as a middle layer between magellan and test framework to drive test run (via framework) based on a specific need (differentiated by executing environments).

  For local emulator test, you need to enable ***testarmada-magellan-local-executor*** in the magellan.json file.

  For remote emulator test, e.g. on SauceLabs, need to enable ***testarmada-magellan-saucelabs-executor*** in the magellan.json file.

