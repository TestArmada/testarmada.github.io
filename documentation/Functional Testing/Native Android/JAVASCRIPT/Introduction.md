## Summary

The functional JS Test Development Kit (TDK) is a set of tools for making native Android & React Native apps end-to-end testing fast, user-friendly, and valuable at scale, across large teams, without those annoying false positives. Both emulators and real devices are supported. 

The following tools are part of the functional JS TDK:

* **Magellan** - Magellan is a massively parallel test runner. By distributing tests across available CPU cores, Magellan blazes through long test suites in a fraction of the time, aggregating results in one friendly report.

* **Nightwatch-Extra** - Nightwatch is a friendly NodeJS-based wrapper for Selenium, allowing developers to author tests in a way that's easy to learn and quick to iterate on. The Nightwatch-Extra adapter is the first of many adapters to come for bringing other webdriver wrappers into the TestArmada ecosystem.

* **Executor** - Executor acts as a middle layer between magellan and test framework to drive test run (via framework) based on a specific need (differentiated by executing environments).

* **Reporter** - Magellan can give you various test reports if configured with a proper reporter. There are already several reporters available in Testarmada to grab, however the simple API Testarmada exposes also allows to create a customized reporter in an easy way.

* **Admiral** - Like a tree falling in the woods, a test report that nobody reads doesn't make a sound. Admiral is a beautiful dashboard that makes it easy to check the latest cross-browser test results, and to spot trends and sources of failures.

## Use Case

### Built for Walmart Scale

Built at WalmartLabs to drive quality for the world's largest retailer, TestArmada is battle-tested, enterprise-grade, and ready to take on end-to-end testing for your site.

### Results You Can Trust

TestArmada won't waste your team's time or erode its trust with annoying false-positives. When failures occur, TestArmada intelligently retries the tests to smooth over common sources of "test flake".

### More Signal, Less Noise

The functional JS TDK tells you everything you need to know, and nothing you don't. Notifications occur in real-time when tests fail, and a beautiful dashboard always shows the latest status for each suite.

## Impact

With the functional JS TDK, WalmartLabs has made end-to-end testing part of the shared culture between dev & QA. Both organizations collaborate to ensure quality at all levels development, staging, and production.

## Feature List

The functional JS TDK supports:

* **Frameworks** - Nightwatch & Mocha

* **Reporters** - xunit, json & mongo db

* **Clouds** - Saucelabs & Testobject
