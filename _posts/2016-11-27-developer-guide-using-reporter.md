---
layout: gettingStarted
title:  "Using Reporter"
link: "usingReporter"
tags: 
 - name: What does reporter do
   link: whatDoesReporterDo
 - name: Reporter's life cycle
   link: reportersLifeCycle
 - name: Create a reporter
   link: createAReporter
 - name: Enable your reporter
   link: enableYourReporter
category: Developer Guide
---

{:name="link-content"}
## Using Reporter
---

{:id="whatDoesReporterDo"}
{:name="link-content"}
### What does reporter do

{:.description}
Reporter extends _magellan_'s reporting mechanism and increases the report format that _magellan_ supports. With reporters _magellan_ can now create test report in various formats for different audiences.

{:.description}

{:id="reportersLifeCycle"}
{:name="link-content"}
### Reporter's life cycle

{:.description}
The reporter instance is initialized when _magellan_ initializes, and destroyed when _magellan_ ends. Here is an overview on how the reporter invocation flow looks like when a test suite is running.

{:.list}
{:.description}
1). Reporter is created and ininitialized by its constructor and `initialize()` method when _magellan_ is initializing.

{:.list}
{:.description}
2). Reporter is attached as a listener to _magellan_'s test runner via `listenTo()` method.

{:.list}
{:.description}
3). Reporter's `_handleMessage()` method will be called when _magellan_'s test runner emits certain events.

{:.list}
{:.description}
4). Reporter's `flush()` method will be called when _magellan_'s test runner finishes all tests.

{:id="createAReporter"}
{:name="link-content"}
### Create a reporter

{:.description}
A reporter must implement following methods.

{:.table.table-condensed.table-hover}
| Method | Purpose |
|:----------|:----------|
| `initialize()` | initialize current reporter instance |
| `listenTo(testRun, test, source)` | listen to _magellan_'s test run |
| `_handleMessage(testRun, test, msg)` | will be called when _magellan_ emits certain events |
| `flush()` | will be called when _magellan_ finishes |

{:.description}
A typical reporter looks like

<pre>
    <code class="code-wrap javascript">/* testarmada-magellan-dev-reporter */<br>class Reporter {<br> constructor(opts) {},<br> initialize() {},<br> listenTo(testRun, test, source) {},<br> _handleMessage(testRun, test, msg) {}, <br> flush() {}<br>};<br>module.exports = Reporter;</code>
</pre>

{:.description}
_[Magellan-xunit-reporter](https://github.com/TestArmada/magellan-xunit-reporter)_ can be refered as example. It generates a `.xml` file following xunit format when test run finishes. _[Magellan-admiral-plugin](https://github.com/TestArmada/magellan-admiral-plugin)_ is a complex _magellan_ reporter example which reports test result to our test reporting system _[admiral](https://github.com/TestArmada/admiral)_ via http.

{:.description}
> _Please note_:

{:.description}
> `_handleMessage()` will be called per test. Please handle the error properly if it happens in one of the `_handleMessage()` so all your following `_handleMessage()` and `flush()` don't error out.

{:id="enableYourReporter"}
{:name="link-content"}
### Enable your reporter

{:.description}
Please follow [enable an executor](#enableAnReporter) for instructions. To enable multiple executors, simply add them in `magellan.json`

<pre>
    <code class="code-wrap js">{ // magellan.json<br> "reporters": [<br>  "testarmada-magellan-json-reporter",<br>  "testarmada-magellan-dev-reporter"<br> ]<br>}</code>
</pre>


{:.description}
> _Please note_:

{:.description}
> By default, _magellan_ prints logs to terminal console while running. This default behavior won't change and cannot be changed no matter how many other reporters are enabled.