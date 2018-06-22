## Architecture

These are the very high level components of mocking eco-system.

![shifu_components_diagram]

The below diagram shows the mocking components in detail.

![shifu_components_architecture]

The mocking service uses `shifu-smocks` which provides the stateful HTTP mocking service built on top of HAPI. It allows to add routes and different scenarios for each route.

In addition, the mocking service provides certain utilities via [shifu-util](https://github.com/TestArmada/shifu-util). It also provides logging facility with [shifu-logger](https://github.com/TestArmada/shifu-logger)

## Mock Server Start flow

The mocking service exposes its features via API's and HTTP end points. Lets take a look at the sequence of events when the mock server is started.

![shifu_start_sequence_diagram]

In the above diagram, the actor can be the test code which starts mock server or a developer using the mock service for local development / testing.

* Users can specify what routes to mock by specifying them in endpoints.js

* Shifu's `start()` is invoked with options to start the Shifu server

* Shifu creates an instance of Hapi server

* Shifu adds the routes for the system API's it supports

* Shifu gets the plugin from `shifu-smocks`

* Shifu registers the plugin it obtained from the above step

* Shifu starts the server

* Once the Shifu server is started, you can use the Shifu API's via HTTP Calls or libraries [Read API Guide for examples]

## Parallel vs non-parallel sessions

### Without Parallel sessions

![shifu_without_parallel_sessions]

If we want to run two test cases in parallel, mocking the same route and returning different data, it won't be possible with running one  mock server and sharing across the whole test suite. So we needed to run one mock server and one application server per test case.

### With Parallel sessions

![shifu_with_parallel_sessions]

With parallel sessions, we can share one application server and mock server for the whole test suite. It allows to mock the same route but different data for different test cases.

To use parallel sessions, the mock server is started with pre-defined number of sessions. For each test, the test case needs to register a session with the mock server. The mock server returns a unique session id which is then sent as part of the request to the application server. If the request gets routed to the mock server for a mocked route, the request handler in mock server extracts the session id from the request, and prepends it to the route. For e.g, if the session id is "123", it is prepended to the route "/api/getCart" and the route becomes "/123/api/getCart". For another test using session id "456" , the route will become "/456/api/getCart". This enables the mock server to be able to return two different responses for the same mocked route.

## Tech stack

Language : Nodejs

Node Version: 4+

Unit Tests: Mocha

Code formatting: Eslint

Code Coverage Report: Istanbul

## Deployment information
Mocking components are released as `npm` libraries

## Git repository information

The source code for all mocking components reside in Github.

* [Shifu](https://github.com/TestArmada/shifu)
* [Shifu Util](https://github.com/TestArmada/shifu-util)
* [Shifu Magellan Nightwatch](https://github.com/TestArmada/shifu-magellan-nightwatch)
* [Shifu Logger](https://github.com/TestArmada/shifu-logger)
* [Shifu Smocks](https://github.com/TestArmada/shifu-smocks)
* [Shifu Swagger](https://github.com/TestArmada/shifu-swagger)

## Development process

**_To contribute to the mocking fleet, please follow these steps:_**

1. Fork the repository https://github.com/TestArmada/shifu. If your Github username is "abc" for e.g, your forked repository will be https://github.com/abc/shifu.

2. Clone this forked repository using ```git clone https://github.com/<username>/shifu.git``` and make "shifu" your working directory.

3. Create a branch on local with ```git checkout -b <your branch name>```. **Note** The default branch for all projects is `development` so any branch you create will be off the `development` branch.

4. Install dependencies using `npm install`.

5. Make the code changes in the branch you created in step (3) and write / update the unit tests to verify your changes. Run unit tests using ```npm test```. We use `eslint` to ensure code formatting. This step runs both unit tests as well as verifies code formatting. We use `istanbul` for code coverage reporting. **95%** is the minimum code coverage we expect for all our components.

6. Once you're ready, submit your pull request from your branch against the `development` branch of Shifu (https://github.com/TestArmada/shifu/tree/development). The PR triggers a [Travis build](https://travis-ci.org/TestArmada/shifu) which runs the tests in CI environment (same steps as in (5) above).

7. Once the PR is reviewed, a team member merges the PR into the `development` branch.

8. When the `development` branch is merged to `master`, a team member will push a tag to `master`, a [Travis build](https://travis-ci.org/TestArmada/shifu) is triggered and publishes a new version of the package to `npm` registry.

**Note:** **_The same steps above are applicable for contributing to any of the mocking components._**

[shifu_components_diagram]: ../../images/shifu_components_diagram.png?raw=true "Mocking Components Diagram"
<!-- Source : https://www.lucidchart.com/documents/edit/134f7bf4-036b-4c56-97ec-bf3920ac8017 -->

[shifu_start_sequence_diagram]: ../../images/shifu_start_sequence_diagram.png?raw=true "Mocking Start Sequence Diagram"
<!-- Source : https://www.lucidchart.com/documents/edit/d5fb377b-4596-4b85-99f9-1f10fb3addaa -->

[shifu_components_architecture]: ../../images/shifu_components_architecture.png?raw=true "Mocking Components Architecture"
<!-- Source : https://www.lucidchart.com/documents/edit/f1082d13-cda5-459b-b60f-35af4f06b340 -->

[shifu_without_parallel_sessions]: ../../images/without_parallel_sessions.png?raw=true "Shifu without parallel sessions"
<!-- Source : https://www.lucidchart.com/documents/edit/df4884f5-84be-49df-8cd8-927cdccb8c62/0 -->

[shifu_with_parallel_sessions]: ../../images/with_parallel_sessions.png?raw=true "Shifu without parallel sessions"
<!-- Source : https://www.lucidchart.com/documents/edit/df4884f5-84be-49df-8cd8-927cdccb8c62/0 -->
