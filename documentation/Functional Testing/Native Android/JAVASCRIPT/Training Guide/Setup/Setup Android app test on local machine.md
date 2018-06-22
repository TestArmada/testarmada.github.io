
### Run Android app test in local emulator

- Get the sample code and install the node package dependencies:
```bash
# Create a workspace and get the smaple code
$ git clone git@github.com:TestArmada/boilerplate-nightwatch.git
$ cd boilerplate-nightwatch
$ npm install
$ npm install appium@1.7.2
```
- Verify all the required items are setup properly by running appium-doctor (only needed for the first time using):
```bash
# install appium-doctor (may require sudo)
$ npm install appium-doctor -g
# check that all Android dependencies are set up correctly
$ appium-doctor --android
```
-  Get a developer build of the application you want to test, put it under `./app` folder, for example, rename .apk and put it as `./app/AUT.apk`
- Launch the **a71_API_25** AVD in the emulator
- Put following entry in your `nightwatch.json`

```js
"appiumandroidapp": {
  "skip_testcases_on_fail": true,
  "desiredCapabilities": {
    "app": "./app/AUT.apk",
    "appiumVersion": "1.7.2",
    "platformName": "Android",
    "platformVersion": "7.1.1",
    "deviceName": "a71_API_25"
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

- Add a test `app.test.js` under `./tests` folder, it can be as simple as following

```javascript
var Test = require("testarmada-nightwatch-extra/lib/base-test-class");

module.exports = new Test({
  
  "Load demo page": function (client) {
    console.log('yeah');
  }
});
```

- Try the sample test:
```bash
./node_modules/.bin/magellan --config magellan.json --local_browser appiumandroidapp --test tests/app.test.js --serial --max_test_attempts 1
```

You should see Android emulator open, your app open, close and simulator close.

- If you don't have Saucelabs credential , please remove following line in ***./magellan.json*** file for now. We'll get back to Saucelabs setup in next section.
```bash
"testarmada-magellan-saucelabs-executor"
```

Please note: the AVD_NAME may different from the AVD manager you see from Android Studio, you can find the right name from the following command:
```bash
${ANDROID_HOME}/platform-tools/emulator -list-avds
```
To know more about emulator commands, please read [this](https://developer.android.com/studio/run/emulator-commandline.html).
