### Setup iOS app sample test on Sauce Labs
* Open terminal: (or add them into .bash_profile)
```bash
$ export SAUCE_USERNAME=${USERNAME}
$ export SAUCE_ACCESS_KEY=${ACCESSKEY}
```
* Zip `./app/AUT.app` to `./app/AUT.zip`

* Upload the testing iOS app to Sauce Labs
```bash
# Upload Walmart app to SauceLabs, and name it: Walmart_app.zip
$ curl -u ${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY} -X POST "http://saucelabs.com/rest/v1/storage/${SAUCE_USERNAME}/AUT.zip?overwrite=true" -H "Content-Type: application/octet-stream" --data-binary @./app/
AUT.zip
```

* Add following content under `profiles` in `magellan.json`

```js
"appium-ios-app": [
    {
      "browser": "iphone_10_3_iOS_iPhone_7_Simulator",
      "orientation": "portrait",
      "appium": {
        "app": "sauce-storage:AUT.zip",
        "appiumVersion": "1.6.5",
        "automationName": "XCUITest",
        "sendKeyStrategy": "setValue",
        "waitForAppScript": "true",
        "locationServicesAuthorized": "false",
        "locationServicesEnabled": "true"
      }
    }
  ]
```

* To run tests on Saucelabs, use command:
```bash
./node_modules/.bin/magellan --config magellan.json --profile appium-ios-app  --test tests/app.test.js --serial --max_test_attempts=1
``` 
* You can view your tests running at: https://saucelabs.com/beta/dashboard/tests. You should see an iOS simulator open, your app open, close and simulator close.
