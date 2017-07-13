---
layout: gettingStarted
title:  "Using Executor"
link: "usingExecutor"
tags: 
 - name: What does executor do
   link: whatDoesExecutorDo
 - name: Executor's life cycle
   link: executorsLifeCycle
 - name: Create an executor
   link: createAnExecutor
 - name: Enable your executor
   link: enableYourExecutor
category: Developer Guide
---

{:name="link-content"}
## Using Executor
---

{:.description}
Executor is introduced in _Magellan X_ (_magellan_ version 10). Each executor maps to a specific test environment (or test vendor). With executor's help _magellan_ now can run test in multiple test environments at the same time. 

{:.description}
_Please Note_: Executor is only supported by _Magellan X_ and above.

{:id="whatDoesExecutorDo"}
{:name="link-content"}
### What does executor do

{:.description}
A _magellan_ executor does following things at least

{:.description}
_1)_. Forks the test and runs it as child process per _magellan_'s worker. 

{:.description}
_2)_. Updates test result on the test vendor.

{:.description}
_3)_. Simplifies the complex desiredCapabilities required by a test vendor (usually to a string).

{:.description}
_4)_. Manages the life cycle of the test proxy required by test vendor if there is any.

{:.description}
_Magellan_ executor can be easily extended to do extra things, for example

{:.description}
_1)_. Talks to a traffic control system to throttle your tests for a specific test environment.


{:id="executorsLifeCycle"}
{:name="link-content"}
### Executor's life cycle

{:.description}
The executor instance is initialized when _magellan_ initializes, and destroyed when current test suite is over. 

{:.description}
Here is an overview on how the executor invocation flow is like when a test suite is running.

{:.description}
_1)_. Executor configuration will be verified via `validateConfig()` and returned to _magellan_ via `getConfig()`.

{:.description}
_2)_. Test profile will be returned to _magellan_ via `getProfiles()` and `getCapabilities()`.

{:.description}
_3)_. `setupRunner()` will be called when executor needs extra setup before _magellan_ runner runs.

{:.description}
_4)_. `setupTest()` will be called when executor needs set someting up before a test runs.

{:.description}
_5)_. Test will be invoked by `execute()`.

{:.description}
_6)_. `teardownTest()` and `summerizeTest()` will be called when test is done.

{:.description}
_7)_. `teardownRunner()` will be called when _magellan_ runner is done.


{:id="createAnExecutor"}
{:name="link-content"}
### Create an executor

{:.description}
An executor must expose following methods.

{:.table.table-condensed.table-hover}
| Method | Preferred file | Purpose |
|:----------|:----------|:-----------|
| `validateConfig(opts)` | configuration.js | validates executor configuration | 
| `getConfig()` | configuration.js | returns executor configuration to _magellan_ |
| `setupRunner()` | executor.js | sets up executor before _magellan_ runner runs |
| `teardownRunner()` | executor.js | tears down executor after _magellan_ runner finishes |
| `setupTest(callback)` | executor.js | sets up executor before a test runs |
| `teardownTest(info, callback)` | executor.js | tears down executor after a test finishes |
| `execute(testRun, options)` | executor.js | forks a test process |
| `summerizeTest(magellanBuildId, testResult, callback)` | executor.js | summerizes a test result |
| `getProfiles(opts)` | profile.js | returns test profile to _magellan_ |
| `getCapabilities(profile, opts)` | profile.js | returns desiredCapabilities to _magellan_ |
| `listBrowsers(opts)` | profile.js | lists out all test environments current executor supports | 
| `getNightwatchConfig(profile)` | profile.js | returns desiredCapabilities in _nightwatch_'s format  |

{:.description}
An executor also must expose following information.

{:.table.table-condensed.table-hover}
| Key | type | Purpose |
|:----------|:----------|:-----------|
| `name`| string | long name of current executor to be used in `magellan.json` |
| `shortName`| string | short name of current executor to be used in test|
| `help` | json | command line parameter specification that _magellan_ can print out with `--help` |

{:.description}
_[Magellan-local-executor](https://github.com/TestArmada/magellan-local-executor)_ is the simplest _magellan_ executor. If you want to do more things in your executor, please refer to _[magellan-saucelabs-executor](https://github.com/TestArmada/magellan-saucelabs-executor)_ as an example.

{:id="enableYourExecutor"}
{:name="link-content"}
### Enable your executor

{:.description}
You need to tell _magellan_ which executor it should use for a test profile. By default, if no executor is specified in profile, _magellan_ is going to run it with _[magellan-saucelabs-executor](https://github.com/TestArmada/magellan-saucelabs-executor)_ if it is configured in `magellan.json` or _magellan_ will error out. To enable your own executor, please follow these steps

{:.description}
_1)_. Follow [Enable an executor](#enableAnExecutor).

{:.description}
_2)_. Add it in test profile in `magellan.json`.

<pre>
    <code class="code-wrap js">{<br> "profiles": {<br>  "browserstack": [{<br>   "browser": "xxxxxxxx",<br>   "executor":"myownexecutor" // fill executor's shortName here<br>  }]<br> }<br>}</code>
</pre>
