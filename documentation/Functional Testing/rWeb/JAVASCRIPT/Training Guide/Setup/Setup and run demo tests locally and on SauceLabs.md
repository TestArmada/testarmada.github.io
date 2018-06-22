### Setup
Please fork from [boilerplate project](https://github.com/TestArmada/boilerplate-nightwatch) and use `git clone` to have a local copy. Then run following commands

```
npm install
```

### Run demo test locally:
```bash
npm run test
```
You should see  the runner [magellan](https://github.com/TestArmada/magellan) open up 2 Chrome windows at once, and the results of the two tests are aggregated in the console.

### Run demo test on Sauce Labs:
```bash
npm run test:saucelabs
```
Go to SauceLabs, after log in, you should be able to view your tests running at [Dashboard](https://saucelabs.com/beta/dashboard/tests). The tests are using Chrome60 browser on Windows 10.
