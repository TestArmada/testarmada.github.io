### After we understand the tests framework, we can start to take a closer look on how native iOS app automation works

#### Underlying we are using [**Appium**](http://appium.io) to drive native iOS app automation

- Most concepts are similar for web and app automations, a few things maybe new to people who come from web automation world:

**Desired Capabilities**  
- Desired capabilities are a set of keys and values (i.e., a map or hash) sent to the Appium server to tell the server what kind of automation session we're interested in starting up. 
- There are various capabilities which can modify the behavior of the server during automation. 
- For example, we could set the **platformName** capability to **iOS** to tell Appium that we want an iOS session, rather than an Android one. See the [capabilities doc](http://appium.io/docs/en/writing-running-appium/caps/index.html) for the complete list of capabilities available for Appium.
- For our sample repo, Desired Capabilities are defined either in profiles in **magellan.json** file or ***./conf/nightwatch.json*** file. You can specify to use which one in your command line.
- For example, in your command, you can specify it via `--profile appium-ios-app`, which is defined in **magellan.json** file.s