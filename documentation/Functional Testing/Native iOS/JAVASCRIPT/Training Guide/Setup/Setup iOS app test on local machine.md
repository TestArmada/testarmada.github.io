New to native iOS app testing? No worry, you don’t need to know much to set it up. Let's get your first native iOS app test up and running in a couple of minutes.

###  Setup iOS app test on local machine

#### Prerequisites:
* Install [Xcode 9.2](https://developer.apple.com/download/)
* Install Node.js >= v4.x.x 
* Install [npm](http://nodejs.org/). Check that you have at least **npm** version 3 or above (required by *appium@1.7.x*):
```bash
$ npm --version
# If not, install npm3
$ npm install -g npm@3
```
* Please map **dev.walmart.com** to **127.0.0.1** in your host file
#### Setup Steps:
* Get the sample code and install the node package dependencies:
```bash
# Create a workspace and get the smaple code
$ git clone git@github.com:TestArmada/boilerplate-nightwatch.git
$ cd boilerplate-nightwatch
$ npm install
$ npm install appium@1.7.2
$ npm install wd
```
* Verify all the required items are setup properly by running appium-doctor:
```bash
# install appium-doctor (may require sudo)
$ npm install appium-doctor -g
# check that all iOS dependencies are set up correctly
$ appium-doctor --ios
```
* Get a developer build of the application you want to test, put it under `./app` folder, for example rename .app and put it as `./app/AUT.app`.
* Please make sure you have iPhone 8, iOS 11.2 simulator before execute the sample test. 
* Put following entry in your `nightwatch.json`

```javascript
"appiumiosapp": {
    "skip_testcases_on_fail": true,
    "desiredCapabilities": {
      "app": "./app/AUT.app",
      "appiumVersion": "1.7.2",
      "automationName": "XCUITest",
      "platformName": "iOS",
      "platformVersion": "11.2",
      "deviceName": "iPhone 8",
      "waitForAppScript": "true",
      "browserName": ""
    },
    "selenium": {
      "start_process": false
    },
    "appium": {
      "start_process": true,
      "fullReset": true
    }
  }
```

* If you would like to try out some different simulators, please modify the ***appiumiosapp*** part in **.conf/nightwatch.json** file.
* Add a test `app.test.js` under `./tests` folder, it can be as simple as following

```javascript
var Test = require("testarmada-nightwatch-extra/lib/base-test-class");

module.exports = new Test({
  
  "Load demo page": function (client) {
    console.log('yeah');
  }
});
```

* Try the sample test:
```bash
./node_modules/.bin/magellan --config magellan.json --local_browser appiumiosapp  --test tests/app.test.js --serial --max_test_attempts 1
```

You should see iOS simulator open, your app open, close and simulator close.

* If you don't have Saucelabs credential , please remove this line in ***./magellan.json*** file for now. We'll get back to Saucelabs setup in next section.

```bash
"testarmada-magellan-saucelabs-executor"
```