### Run Android app test on SauceLabs
- Open terminal: (or add them into .bash_profile)
```bash
$ export SAUCE_USERNAME=${USERNAME}
$ export SAUCE_ACCESS_KEY=${ACCESSKEY}
```

- Upload ./app/AUT.apk to SauceLabs via following curl
```bash
$ curl -u ${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY} -X POST "http://saucelabs.com/rest/v1/storage/${SAUCE_USERNAME}/AUT.apk?overwrite=true" -H "Content-Type: application/octet-stream" --data-binary @./app/AUT.apk
```

- Add following content under `profiles` in `magellan.json`

```js
"appium-android-app": [{
    "browser": "Android_GoogleAPI_Emulator_Android_7_1_Android",
    "orientation": "portrait",
    "appium": {
      "app": "sauce-storage:AUT.apk",
      "platformName": "Android",
      "appiumVersion": "1.7.2",
      "fullReset": "true",
      "noReset": "false"
    }
  }
```

- Run the Android sample app test on SauceLabs
```bash
./node_modules/.bin/magellan --nightwatch_config conf/nightwatch.json --profile appium-android-app --test tests/app.test.js --max_test_attempts=1
```

- You can view your tests running at: https://saucelabs.com/beta/dashboard/tests. You should see an Android emulator open, your app open, close and simulator 
