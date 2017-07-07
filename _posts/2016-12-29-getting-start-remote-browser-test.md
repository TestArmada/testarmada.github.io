---
layout: gettingStarted
title:  "Remote browser test"
link: "remotebrowsertest"
tags: 
  - name: Enable an executor
    link: enableAnExecutor
  - name: Run test with executor
    link: runTestWithExecutor
category: Getting Started
---

{:name="link-content"}
## Remote browser test
---

{:.description}
Don't have a desired browser in your local? No problem, _Testarmada_ has you covered. The following executors are provided by _Testarmada_ for remote test purpose.

{:.table.table-condensed.table-hover}
| Name | Latest Version | Purpose |
|:----------|:--------|:----------|
| [magellan-saucelabs-executor](https://github.com/TestArmada/magellan-local-executor) | ^3.0.0 | Magellan executor to drive test on [Saucelabs](https://saucelabs.com/) |
| [magellan-browserstack-executor](https://github.com/TestArmada/magellan-browserstack-executor) | ^1.0.0 | Magellan executor to drive test on [Browserstack](https://www.browserstack.com/) |
| [magellan-testobject-executor](https://github.com/TestArmada/magellan-testobject-executor) | ^1.0.0 | Magellan executor to drive test on [TestObject](https://testobject.com/) |
| [magellan-seleniumgrid-executor](https://github.com/TestArmada/magellan-seleniumgrid-executor) | ^1.0.0 | Magellan executor to drive test in selenium grid |

{:.description}
You can also create your own executor. Please refer to [Developer Guide](#DeveloperGuide) for instructions on how to build your own executor. You're welcome to build and submit your own executor to _Testarmada_. 

{:id="enableAnExecutor"}
{:name="link-content"}
### Enable an executor

{:.description}
At least one executor has to be enabled in `magellan.json`. Please follow these steps to enable executor:

{:.description}
_1)_.Install necessary executor via `npm install`
<pre>
    <code class="code-wrap bash">npm install testarmada-magellan-saucelabs-executor --save</code>
</pre>

{:.description}
_2)_.Add following code in your `magellan.json`
<pre>
    <code class="code-wrap json">{<br> "executors": ["testarmada-magellan-saucelabs-executor"]<br>}</code>
</pre>

{:.description}
Full example of `magellan.json` can be found [here](https://gecgithub01.walmart.com/otto/boilerplate-nightwatch-mobile/blob/master/magellan.json).

{:.description}
_Please note_: Some executors need specific configuration to be functional. Please refer to the README.md in executor's repo for detail configuration.

{:id="runTestWithExecutor"}
{:name="link-content"}
### Run test with executor(s)

{:.description}
Magellan allows to run tests with one or more executors at the same time. Typically this is done by passing a specific command line argument to magellan. For example, to enable _[magellan-local-executor](https://github.com/TestArmada/magellan-local-executor)_ for all the tests, this command line argument is required

<pre>
    <code class="code-wrap bash">--local_browser chrome # to run in Chrome</code>
</pre>

{:.description}
or

<pre>
    <code class="code-wrap bash">--local_browsers chrome, firefox # to run in both Chrome and Firefox</code>
</pre>

{:.description}
Here is another example to enable both _[magellan-local-executor](https://github.com/TestArmada/magellan-local-executor)_ and _[magellan-saucelabs-executor](https://github.com/TestArmada/magellan-saucelabs-executor)_ for your test:

<pre>
    <code class="code-wrap bash">--local_browser chrome --sauce_browser safari_10_OS_X_10_11_Desktop # to run in local Chrome and Safari 10 on Saucelabs</code>
</pre>