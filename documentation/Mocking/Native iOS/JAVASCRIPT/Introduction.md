## Why Use Mock Server?

Most of the applications rely on one or many back end services. For successful test execution and fast development, all the dependent backend services should be reliable 100% of the time. However that is not possible as the backend services may be down from time to time for various reasons or may have data inconsistency issues which makes testing/development against live services inefficient and time consuming.

To overcome above mentioned limitations, our mocking solution can be used to quickly stub the API responses that are used by your application.

We provide a mocking solution which can be leveraged to quickly stub the REST API responses that are used by your application during development or testing. The application points to the mock service host address instead of the live service. Pre-recorded responses are then returned for various endpoints from the mock service. Since there is minimal logic when writing mock service, maintenance and development cost for mock service is minimal. Some of the major development pain-points addressed by the mocking solution are:
* **Unstable services** - Teams have saved upto 12 hours/week of development as well as testing time due to downtime / instability of external services.
* **Inconsistent Data** - Teams have reduced the test data setup time by about 27 hours/week by eliminating the dependency on external teams for test data setup.
* **Test flakiness** - Teams have reduced test flakiness by about 25%
* **Test against negative or unreal scenarios** - Teams have reported to have increase test coverage for negative scenarios from no tests before to upto 15 test cases now by simulating service faults deterministically

**_Some of the key features of the mocking solution are:_**

* **Ease of setup** - Very easy to setup mocked data and use it while development or testing your application
* **Drop and Respond** - Respond with a JSON file based on the url route path automatically by dropping JSON response file in folder mapping to url path
* **Test Reuse** - ability to execute test cases against mock or live service

The mocking solution helps the teams develop and test their web and mobile applications in local as well as CI environments.

## Feature list

 * **Ease of setup** - Very easy to setup mocked data and use it while development or testing your application
 * **Test Reuse:** _Execute same test cases against mock or live service._
 * **Drop-And-Respond:** _Respond with a JSON file based on the url route path automatically by dropping json response file in folder mapping to url path._
 * **Test De-coupling:** _No coupling with test cases - Test cases are independent of mock implementation except that setting the desired response for the mock service (which has no impact if the test case is run against a live service)._
 * **Respond with mocked data from a directory:** _Mocked data response from specific directory irrespective of Rest APIs_
 * **Common Utilities:** _Common utility methods are provided as part of the mocking service which allows quicker test development._
 * **UI Interface:** _Mock service UI for manual testing/debugging._
 * **HTTPS Support:** _HTTPS support for all the urls._
 * **Parallel Sessions:** _Support for single instance mock server for parallel processes_
 * **Shared Mock data:** _Allows fetching of mocked data and routes from multiple Git repositories_
 * **Magellan/Nightwatch integration:** _Ability to use mocking service with Magellan tests_
 * **Dynamic Transposition of Mock Data (JSON):** _Ability to modify response on the fly_
 * **Support for all file types:** _Auto evaluation of response file extension and mime type_
 * **Swagger integration:** _Automatic mock creator for web-services with swagger definition_
 * **Platform independent mocks:** _Mock any service irrespective of the language it is written in_
 * **Server states:** _Ability to mock server state_
 * **Support for Mobile applications:** _Ability to mock services for mobile applications_
 * **Manual tests against mock service:** _Ability to run tests manually against mock service_

## Planned features

 * Ability to specify various data storage for mock data
 * Auto-refresh of data
 * Network and Test APIs to support instrumentation
 * Debugging tool to help development by supporting auto-replay of data
 * Support to auto-generate endpoint URLs for mocking
 * Support for changing mocked data via UI
