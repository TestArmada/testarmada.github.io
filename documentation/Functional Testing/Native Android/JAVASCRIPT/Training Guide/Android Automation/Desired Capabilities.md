## Desired Capabilities
#### After we understand the tests framework, we can start to take a closer look on how Android app automation works

### Underlying we are using [**Appium**](http://appium.io) to drive native Android app automation

- Most concepts are similar for web and app automations, a few things maybe new to people who come from web automation world:

**Desired Capabilities**  
- Desired capabilities are a set of keys and values (i.e., a map or hash) sent to the Appium server to tell the server what kind of automation session we're interested in starting up. 
- There are various capabilities which can modify the behavior of the server during automation. 
- For example, we could set the **platformName** capability to **Android** to tell Appium that we want an Android session, rather than an iOS one. See the [capabilities doc](http://appium.io/docs/en/writing-running-appium/caps/index.html) for the complete list of capabilities available for Appium.
- For our sample repo, Desired Capabilities are defined either in profiles in **magellan.json** file or in ***./conf/nightwatch.json*** file. You can specify to use which one in your command line.
- For example, in your command, you can specify it via `--profile appium-ios-app`, which means look up desired capability defined in *profile* style in **magellan.json** file.
- It is highly recommended to set the  `appPackage`  and  `appActivity`  capabilities in order to let Appium know exactly which package and activity should be launched for your application. Otherwise, Appium will try to determine these automatically from your app manifest. E.g. 
```bash
    "appium-android-app": [
      {
        "browser": "Android_GoogleAPI_Emulator_Android_7_1_Android",
        "orientation": "portrait",
        "appium": {
          "app": "sauce-storage:AUT.apk",
          "platformName": "Android",
          "appiumVersion": "1.7.2",
          "fullReset": "true",
          "noReset": "false",
          "appActivity": "com.yourcompany.android.main.MainActivity",
          "appWaitActivity": "com.yourcompany.android.main.AnotherActivity"
        }
      }
    ],
```