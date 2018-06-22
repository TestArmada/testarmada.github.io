#### Trouble shooting tips

- Java version error
```bash
Exception in thread "main" java.lang.UnsupportedClassVersionError: org/openqa/grid/selenium/GridLauncherV3 : Unsupported major.minor version 52.0
         at java.lang.ClassLoader.defineClass1(Native Method)
         at java.lang.ClassLoader.defineClass(ClassLoader.java:800)
...
```
 **Tips**: Please check your java version (java -version), you should use java 1.8. You can download it [here](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html).


**Some general trouble shooting tips for Appium iOS app automation:**

- When run simulator test, please sure the ***accessibility helper*** is turned off in your **Settings** app
-  Make sure the app is compiled for the simulator (or real device) as appropriate (e.g. in debug mode for the simulator), or you might get a  *posix spawn*  error.
-  If this is the first time you've run Appium, make sure to authorize the use of Instruments. See the  [UIAutomation Driver](http://appium.io/docs/en/drivers/ios-uiautomation/index.html)  doc.
- Tests on iOS may exhibit symptoms similar to a memory leak including sluggish performance or hangs. If you experience this problem, it's likely due to a known issue with NSLog. One option is to remove NSLog from your code.
- Sometimes iOS UI elements become invalidated milliseconds after they are found. This results in an error that looks like ***(null) cannot be tapped***. Sometimes the only solution is to put the finding-and-clicking code in a retry block.