New to Android app automation testing? No worry, you don’t need to know much to set it up. Let's get your first Android app test up and running in a couple of minutes.

### Prerequisites:

- Install latest [Android Studio](https://developer.android.com/studio/index.html#downloads)
  * Update the following through Tools > SDK Manager:
  * **SDK Platforms**: Download ***Android 7.1.1 (Nougat)***
    * Expand package details and include Google APIs Intel x86 Atom_64 System Image
  * **SDK Tools**: Update Android SDK Build-Tools, Android Emulator, Android SDK Platform-Tools, Android SDK Tools, Intel x86 Emulator Accelerator
- Create this Android Virtual Device (AVD):
  * Download [a71_device.xml](../../../images/a71_device.xml)
  * Go to Tools > **AVD Manager** in Android Studio
  * Click on **Create Virtual Device**
  * Click on **Import Hardware Profiles**
  * Select the **a71_device.xml** file
  * Refresh page, select **a71** device profile, and click Next
  * Click on **x86 Images** tab
  * Select Nougat x86_64 Android 7.1.1 (Google APIs) (download may be required), and click Next
  * Set AVD Name as **a71_API_25**, and click Finish

- Install Node.js >= v4.x.x 
- Install [npm](http://nodejs.org/). Check that you have at least **npm** version 3 or above (required by *appium@1.7.x*):
```bash
$ npm --version
# If not, install npm3
$ npm install -g npm@3
```
