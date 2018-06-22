Most of you must already know some about web automation. In this training series, we will show you how to leverage Test Armada tools to make end-to-end tests easy, reliable, and massively parallel distributing tests across available resources both locally and remotely.

###  Prerequisites

1. Hostname mapping and open certain ports
- Please add the following hostname mapping in the **/etc/hosts** file
```bash
127.0.0.1 dev.walmart.com
```
- Demo test will use ports range [12000, 12010], please make sure your machine allows those ports

2. Install [nvm](https://github.com/creationix/nvm)
    We recommend using **nvm** to manage your node and npm version. The sample project recommends **node@6.11.2** and above,  **npm@3.10.10** and above.
```bash
nvm install 6.11.2
nvm use 6.11.2
```

3. Apply [SauceLabs](saucelabs.com) credentials (username and api-key)

    The demo tests can be executed on SauceLabs. To use it, please make sure you have:
 - SauceLabs account
 - Have the following credentials set up in **~/.bashrc** file
 ```bash
 export SAUCE_CONNECT_VERSION=4.4.11
 export SAUCE_USERNAME=${YOUR_SAUCE_NAME}
 export SAUCE_ACCESS_KEY=${YOUR_SAUCE_API_TOKEN}
 ```

4. Install [Chrome](https://www.google.com/chrome/browser/desktop/index.html) browser, if you don't have it yet