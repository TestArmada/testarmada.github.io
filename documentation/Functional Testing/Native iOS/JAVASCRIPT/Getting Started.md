## Pre Requisite

The functional JS TDK requires minimum node@4 and npm@3 for device testing.

## Getting started with the functional JS TDK

To proceed with native iOS app test, you also need latest [Xcode](https://developer.apple.com/support/xcode/) and it's command line tools. When you have Xcode setup, please make sure your desired iOS simulator is installed as well.

### Setup

Please use following boilerplate to have Testarmada toolkit installed

```bash
git clone git@github.com:TestArmada/boilerplate-nightwatch.git
npm install
```

### Via Command Line Arguments

Magellan which is part of the functional JS TDK is designed for running tests in massive scale, which means you’ve been granted the full control of the scalability. There are two ways to tell magellan how you want to scale your tests.

All command line arguments of magellan and its components (executors, reporters and plugins) that are enabled can be listed out by running following command in your favorite bash

```bash
./node_modules/.bin/magellan --help
```

Following is an example telling magellan to run tests with 30 workers, 5 retry attempts per failed test and bail whole suite if any failure is met.

```bash
./node_modules/.bin/magellan --max_workers 30 --max_test_attempts 5 --bail_fast
```

### Configure test profile

Magellan passes down test profile information, like which browser or test environment your test runs in, to its executor(s). Usually this is done by setting up a specific argument in magellan command, such as

```bash
./node_modules/.bin/magellan --local_browser chrome
```

#### Via --profile command line argument

Magellan can retrieve test profile information from an URL. This gives you the convenience of managing your test environments and sharing your configuration management in a more standard way. Furthermore, by putting test profiles in to a file, you can add more information into your test profile, such as screen resolution, orientation or device information for you app test.

The hosted test profile file needs to follow the format of

```js
{
  "profiles": {
    "microsoftedge": [{
      "browser": "MicrosoftEdge_16_Windows_10_Desktop",
      "resolution": "1280x1024",
      "executor": "sauce"
    }],
}
```

Magellan can read and resolve the hosted profile by following command.

```bash
./node_modules/.bin/magellan --profile http://some.host#microsoftedge
```

You can add as many test profiles as your need in the hosted file. Magellan is able to read more test profiles via

```bash
./node_modules/.bin/magellan --profile http://some.host#microsoftedge,googlechrome59,firefox57
```

Or, as a better way to handle multiple test profiles as a batch, you can put multiple test profiles into one collection, such as

```js
{
  "profiles": {
    "tier-one-browsers": [{
        "browser": "MicrosoftEdge_16_Windows_10_Desktop",
        "resolution": "1280x1024",
        "executor": "sauce"
      },
      {
        "browser": "chrome_latest_Windows_10_Desktop",
        "resolution": "1280x1024",
        "executor": "sauce"
      },
      {
        "browser": "iphone_10_0_iOS_iPhone_7_Simulator",
        "orientation": "portrait",
        "appium": {
          "app": "sauce-storage:my_app.zip",
          "appiumVersion": "1.6.4",
          "automationName": "xcuitest",
          "sendKeyStrategy": "setValue",
          "waitForAppScript": "true"
        }
      }
    ]
  }
}
```

Then simply call magellan with

```bash
./node_modules/.bin/magellan --profile http://some.host#tier-one-browsers
```

#### Via magellan.json file

Magellan.json supports the same test profile format as the hosted test profile file. Put the above js code snippet in magellan.json and it is ready to use via

```bash
./node_modules/.bin/magellan --profile tier-one-browsers
```

### Enable executor

You need to tell magellan which executor it should use for a test profile. By default, if no executor is specified in profile, magellan is going to run it with magellan-saucelabs-executor if it is configured in magellan.json or magellan will error out.

At least one executor has to be enabled in magellan.json. Please follow these steps to enable executor:

1. Install necessary executor via npm install
```bash
npm install testarmada-magellan-saucelabs-executor --save
```
2. Add following code in your magellan.json
```js
  "executors": [
    "magellan-saucelabs-executor",
  ],
```

#### Run test with executor(s)

Magellan allows to run tests with one or more executors at the same time. Typically this is done by passing a specific command line argument to magellan. For example, to enable magellan-local-executor for all the tests, this command line argument is required

```bash
# to run in Chrome
--local_browser chrome 
```
or
```bash
# to run in both Chrome and Firefox
--local_browsers chrome, firefox 
```

Here is another example to enable both magellan-local-executor and magellan-saucelabs-executor for your test:

```bash
# to run in local Chrome and Safari 10 on Saucelabs
--local_browser chrome --sauce_browser safari_10_OS_X_10_11_Desktop 
```

### Using Reporter

Reporter extends magellan’s reporting mechanism and increases the report format that magellan supports. With reporters magellan can now create test report in various formats for different audiences.

#### Enable reporter(s)

To enable multiple reporters, simply add them in magellan.json

```js
  "reporters": [
    "testarmada-magellan-xunit-reporter",
    "testarmada-magellan-dev-reporter"
  ]
```

_**Please note:** By default, magellan prints logs to terminal console while running. This default behavior won’t change and cannot be changed no matter how many other reporters are enabled._

### Create test with Nightwatch-extra

Nightwatch-extra supports everything that nightwatchjs supports. Please refer to nightwatchjs’ [developer guide](http://nightwatchjs.org/guide#using-nightwatch) for the basic usage of nightwatchjs.

### Extend the base-test-class.js

Nightwatch-extra’s base-test-class.js passes certain information, such as selenium session information and test result, back to magellan. We highly recommend all your tests extend it.

```js
const Test = require("testarmada-nightwatch-extra/lib/base-test-class");

module.exports = new Test({
  "Load goole page": function (client) {
    client.url("http://www.google.com");
  }
});
```

#### Enable nightwatch-extra command

To use nightwatch-extra’s command API, you need to add its path to nightwatch.json

```js
  "custom_commands_path": [
    "./node_modules/testarmada-nightwatch-extra/lib/commands"
  ],
```

A typical flow of how nightwatch-extra’s command works is

 1. Get all information, like selector, values, callback, from command() method’s arguments.
 2. Check element’s apparence. If element isn’t present or isn’t visible within given time, fail the command.
 3. Invoke customized code to get element information (via injectedJsCommand() for browser test command).
 4. Expose element handler to user to do extra things to the element via do().

All commands of nightwatch-extra won’t proceed if either of the following conditions isn’t met.

 1. The element you want to operate is in the DOM.
 2. The element you want to operate is visible in the view port.

#### Enable nightwatch-extra assertion

To use nightwatch-extra’s assertion API, you need to add its path to nightwatch.json

```js
  "custom_assertions_path": [
    "./node_modules/testarmada-nightwatch-extra/lib/assertions"
  ],
```

A typical flow of how nightwatch-extra’s assertion works is

1. Get all information, like selector, expectedValue, callback, from command() method’s arguments.
2. Check element’s apparence. If element isn’t present or isn’t visible within given time, fail the command.
3. Invoke customized code to get element information (via injectedJsCommand() for browser test command).
4. Expose element handler to user to do extra things to the element and assert via assert().

All assertions of nightwatch-extra won’t proceed if either of the following conditions isn’t met.

1. The element you want to operate is in the DOM.
2. The element you want to operate is visible in the view port.

#### Page Object

Nightwatch-extra is fully compatible with nightwatchjs’ page object pattern. You can access nightwatch-extra’s API or your customized API in page object command via

```js
  createNewCreditCard: function() {
    const selectors = this.elements;
    return this
      .clickEl(selectors.addCreditCardButton.selector)
      .setElValue(selectors.firstName.selector, "testarmada");
  },
```

All nightwatchjs’ APIs are accessible and chainable with nightwatch-extra’s API or your customized API via

```js
  selectPayByCash: function() {
    this
      .clickMobileEl("accessibility id", selectors.morePaymentOptions.selector)
      .swipeMobileElTo("xpath", selectors.visaCheckout.selector, 0, -50)
      .api.pause(3000)
      .clickMobileEl("xpath", selectors.payWithCash.selector);
    return this;
  }
```

