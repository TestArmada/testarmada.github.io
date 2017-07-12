---
layout: gettingStarted
title:  "Using Nightwatch-extra"
link: "usingNightwatchextra"
tags: 
 - name: Create test
   link: createNightwatchTest
 - name: Extend the base test
   link: extendBaseTest
 - name: Customize command
   link: customizeTestCommand
 - name: Customize assertion
   link: customizeTestAssertion
 - name: Page Object
   link: pageObject
 - name: Accelerate test execution
   link: accelerateTestExecution
category: Developer Guide
---

{:name="link-content"}
## Using Nightwatch-extra
---

{:id="createNightwatchTest"}
{:name="link-content"}
### Create test

{:.description}
_Nightwatch-extra_ supports everything that nightwatchjs supports. Please refer to [nightwatchjs' developer guide](http://nightwatchjs.org/guide#using-nightwatch) for the basic usage of nightwatchjs.

{:id="extendBaseTest"}
{:name="link-content"}
### Extend the base-test-class.js

{:.description}
_Nightwatch-extra_'s `base-test-class.js` passes certain information, such as selenium session information and test result, back to _magellan_. We highly recommend all your tests extend from `base-test-class.js`.

<pre>
    <code class="code-wrap javascript">/* simple-test.js */<br>const Test = require("testarmada-nightwatch-extra/lib/base-test-class");<br>module.exports = new Test({<br> "Load goole page": function (client) {<br>  client.url("http://www.google.com");<br> }<br>});</code>
</pre>

{:.description}
You can override `before()`, `beforeEach()`, `afterEach()` and `after()` method or add your own base test methods by extending the `base-test-class.js`. To create your own base test, simple inherit your test from [base-test-class.js](https://github.com/TestArmada/nightwatch-extra/blob/master/src/base-test-class.js).

<pre>
    <code class="code-wrap javascript">const Base = require("testarmada-nightwatch-extra/lib/base-test-class");<br>const util = require("util");<br>const MyBaseTest = function (steps) { <br>  // call super-constructor<br>  Base.call(this, steps);<br>};<br>util.inherits(MyBaseTest, Base);<br>MyBaseTest.prototype = {<br>   // you can extend beforeEach, after, afterEach like before<br>   before: function (client, callback) {<br>    Base.prototype.before.call(this, client, callback);<br>  }<br>};<br>module.exports = MyBaseTest;</code>
</pre>

{:.description}
Then in your test, create new test from `MyBaseTest` instead of `base-test-class.js`

<pre>
    <code class="code-wrap javascript">/* simple-test.js v2*/<br>const Test = require("../lib/MyBaseTest");<br>module.exports = new Test({});</code>
</pre>


{:id="customizeTestCommand"}
{:name="link-content"}
### Customize command

{:.description}
_Nightwatch-extra_ provides two sets of command API, one for browser test and one for app test. Please refer to [API Reference](#API) to get more information. To use _nightwatch-extra_'s command API, you need to add its path to `nightwatch.json`

<pre>
    <code class="code-wrap json">{<br> "custom_commands_path": [<br>  "./node_modules/testarmada-nightwatch-extra/lib/commands",<br>  "./node_modules/testarmada-nightwatch-extra/lib/commands/mobile"<br> ]<br>}</code>
</pre>

{:.description}
A typical flow of how _nightwatch-extra_'s command works is 

{:.description}
_1)_. Get all information, like selector, values, callback, from `command()` method's arguments.

{:.description}
_2)_. Check element's apparence. If element isn't present or isn't visible within given time, fail the command.

{:.description}
_3)_. Invoke customized code to get element information (via `injectedJsCommand()` for browser test command).

{:.description}
_4)_. Expose element handler to user to do extra things to the element via `do()`. 


{:.description}
All commands of _nightwatch-extra_ won't proceed if either of the following conditions isn't met.

{:.description}
_1)_.The element you want to operate is in the DOM (or it's in the doc tree in app test).

{:.description}
_2)_.The element you want to operate is visible in the view port.

#### Implement a browser test command

{:.description}
We provide a [base-command.js](https://github.com/TestArmada/nightwatch-extra/blob/master/src/base-command.js) for inheritance to implement your own command for browser test. To implement a command for browser usage, you need to

{:.description}
_1)_.Inherit your command from the `base-command.js`.

{:.description}
_2)_.Implement method `injectedJsCommand()`, `do()` and `command()` as documented [here](https://github.com/TestArmada/nightwatch-extra/blob/master/src/base-command.js#L233-L262).

{:.table.table-condensed.table-hover}
| Method | Purpose | Arguments |
|:----------|:----------|:-----------|
| `injectedJsCommand($el)` | The piece of javascript injected into the web page to get element information, such as element's textual value | _$el_ is the javascript object representing the html element. |
| `do(magellanSelector)` | Called by base test if element exists and is visible, you can do you own things in this method. | _magellanSelector_ is the selector you should use which is generated by _nightwatch-extra_ |
| `command(..., callback)`  | The command signature which user will use in their test | Parameter amount can be arbitary with an optional callback which will be called when the command successfully finishes.|

{:.description}
_3)_.Add the path to your new command to `nightwatch.json`

<pre>
    <code class="code-wrap json">{<br> "custom_commands_path": [<br>  "./lib/custom_commands"<br> ]<br>}</code>
</pre>

{:.description}
You can use all the [browser commands](https://github.com/TestArmada/nightwatch-extra/tree/master/src/commands) provided by _nightwatch-extra_ as example to build your own browser test command.

#### Implement an app test command

{:.description}
We provide a [base-mobile-command.js](https://github.com/TestArmada/nightwatch-extra/blob/master/src/base-mobile-command.js) for inheritance to implement your own command for app test. To implement a command for app usage, you need to

{:.description}
_1)_.Inherit your command from the `base-mobile-command.js`.

{:.description}
_2)_.Implement method `do()` and `command()` as documented [here](https://github.com/TestArmada/nightwatch-extra/blob/master/src/base-mobile-command.js#L102-L119).

{:.table.table-condensed.table-hover}
| Method | Purpose | Arguments |
|:----------|:----------|:-----------|
| `do(elementInfo)` | Called by base test if element exists and is visible, you can do you own things in this method. | _elementInfo_ is the element information returned by appium server |
| `command(..., callback)`  | The command signature which user will use in their test | Parameter amount can be arbitary with an optional callback which will be called when the command successfully finishes.|

{:.description}
_3)_.Add the path to your new command to `nightwatch.json`

{:.description}
You can use all the [app commands](https://github.com/TestArmada/nightwatch-extra/tree/master/src/commands/mobile) provided by _nightwatch-extra_ as example to build your own app test command.

{:id="customizeTestAssertion"}
{:name="link-content"}
### Customize assertion

{:.description}
_Nightwatch-extra_ provides two sets of assertion API, one for browser test and one for app test. Please refer to [API Reference](#API) to get more information. To use _nightwatch-extra_'s assertion API, you need to add its path to `nightwatch.json`

<pre>
    <code class="code-wrap json">{<br> "custom_assertions_path": [<br>  "./node_modules/testarmada-nightwatch-extra/lib/assertions",<br>  "./node_modules/testarmada-nightwatch-extra/lib/assertions/mobile"<br> ]<br>}</code>
</pre>

{:.description}
A typical flow of how _nightwatch-extra_'s assertion works is 

{:.description}
_1)_. Get all information, like selector, expectedValue, callback, from `command()` method's arguments.

{:.description}
_2)_. Check element's apparence. If element isn't present or isn't visible within given time, fail the command.

{:.description}
_3)_. Invoke customized code to get element information (via `injectedJsCommand()` for browser test command).

{:.description}
_4)_. Expose element handler to user to do extra things to the element and assert via `assert()`. 


{:.description}
All assertions of _nightwatch-extra_ won't proceed if either of the following conditions isn't met.

{:.description}
_1)_.The element you want to operate is in the DOM (or it's in the doc tree in app test).

{:.description}
_2)_.The element you want to operate is visible in the view port.

#### Implement a browser test assertion

{:.description}
We provide a [base-assertion.js](https://github.com/TestArmada/nightwatch-extra/blob/master/src/base-assertion.js) for inheritance to implement your own assertion for browser test. To implement an assertion for browser test, you need to

{:.description}
_1)_.Inherit your assertion from the `base-assertion.js`.

{:.description}
_2)_.Implement method `injectedJsCommand()`, `assert()` and `command()` as documented [here](https://github.com/TestArmada/nightwatch-extra/blob/master/src/base-assertion.js#L225-L254).

{:.table.table-condensed.table-hover}
| Method | Purpose | Arguments |
|:----------|:----------|:-----------|
| `injectedJsCommand($el)` | The piece of javascript injected into the web page to get element information, such as element's textual value | _$el_ is the javascript object representing the html element. |
| `assert(actual, expected)` | Called by base assertion if element exists and is visible, you can do you own assertion in this method. | _actual_ is the actual value returned by `injectedJsCommand()` method, _expected_ is the expected value passed in `command()` method |
| `command(selector, expected, ..., callback)`  | The command signature which user will use in their test | Parameter amount can be arbitary with a selector, an expected value and an optional callback which will be called when the assertion successfully finishes.|

{:.description}
_3)_.Add the path to your new assertion to `nightwatch.json`

<pre>
    <code class="code-wrap json">{<br> "custom_assertions_path": [<br>  "./lib/custom_assertions"<br> ]<br>}</code>
</pre>

{:.description}
You can use all the [browser assertions](https://github.com/TestArmada/nightwatch-extra/tree/master/src/assertions) provided by _nightwatch-extra_ as example to build your own browser test assertion.

#### Implement an app test assertion

{:.description}
We provide a [base-mobile-assertion.js](https://github.com/TestArmada/nightwatch-extra/blob/master/src/base-mobile-assertion.js) for inheritance to implement your own assertion for app test. To implement an assertion for app test, you need to

{:.description}
_1)_.Inherit your assertion from the `base-mobile-assertion.js`.

{:.description}
_2)_.Implement method `do()`, `assert()` and `command()` as documented [here](https://github.com/TestArmada/nightwatch-extra/blob/master/src/base-mobile-assertion.js#L95-L119).


{:.table.table-condensed.table-hover}
| Method | Purpose | Arguments |
|:----------|:----------|:-----------|
| `do(elementInfo)` | Called by base assertion if element exists and is visible, you can do you own things in this method. | _elementInfo_ is the element information returned by appium server |
| `assert(actual, expected)` | Called by base assertion if element exists and is visible, you can do you own assertion in this method. | _actual_ is the actual value returned by `do()` method, _expected_ is the expected value passed in `command()` method |
| `command(selector, expected, ..., callback)`  | The command signature which user will use in their test | Parameter amount can be arbitary with a selector, an expected value and an optional callback which will be called when the assertion successfully finishes.|

{:.description}
_3)_.Add the path to your new assertion to `nightwatch.json`

{:.description}
You can use all the [app assertions](https://github.com/TestArmada/nightwatch-extra/tree/master/src/assertions/mobile) provided by _nightwatch-extra_ as example to build your own app test assertion.

{:id="pageObject"}
{:name="link-content"}
### Page Object

{:.description}
_Nightwatch-extra_ is fully compatible with _nightwatchjs_' [page object](http://nightwatchjs.org/guide#page-objects) pattern. You can access _nightwatch-extra_'s API or your customized API in page object command via

<pre>
    <code class="code-wrap javascript">{<br> createNewCreditCard: function () {<br>  const selectors = this.elements;<br>  return this<br>   .clickEl(selectors.addCreditCardButton.selector)<br>   .setElValue(selectors.firstName.selector, "testarmada");<br> }<br>}</code>
</pre>

{:.description}
All _nightwatchjs_' APIs are accessible and chainable with _nightwatch-extra_'s API or your customized API via  

<pre>
    <code class="code-wrap javascript">{<br> selectPayByCash: function () {<br>  this<br>   .clickMobileEl("accessibility id", selectors.morePaymentOptions.selector)<br>   .swipeMobileElTo("xpath", selectors.visaCheckout.selector, 0, -50)<br>   .api.pause(3000)<br>   .clickMobileEl("xpath", selectors.payWithCash.selector);<br>  return this;<br> }<br>}</code>
</pre>

{:id="accelerateTestExecution"}
{:name="link-content"}
### Accelerate test execution

{:.description}
_Nightwatch-extra_ relies on javascript injection to unify the element detection experience across browsers with [sizzlejs](https://sizzlejs.com/). Selenium's `/execute` and `/execute_async` API are heavily in use in this case. We provide both synchronous and asynchronous javascript injection for `/execute` and `/execute_async`. 

{:.description}
> _Extensive Reading_:

{:.description}
> <[Accelerate Web Test Automation, Part 1](https://medium.com/walmartlabs/accelerate-web-test-automation-part-1-e574f31938d1)> on Medium.

{:.description}
> <[Accelerate Web Test Automation, Part 2](https://medium.com/walmartlabs/accelerate-web-test-automation-part-2-bd5833fa01b4)> on Medium.

{:.description}
The synchronous version of javascript injection is for `/execute` API and it works for all browsers. However because of the nature of synchronization, the execution speed of using `/execute` is much slower than its asynchronous cousin. We recommend using `/execute_async` as much as you can unless

{:.description}
_1)_.You're testing against some latest desktop browsers who don't support `/execute_async` API, like Safari@10.

{:.description}
_2)_.You're testing against some mobile browsers whose javascript engine is out of date.

{:.description}
_Nightwatch-extra_ uses `/execute_async` by default. There are two ways to switch to `/execute`

{:.description}
_1)_.Via command line argument `--sync_browsers`

{:.description}
The following code tells _nightwatch-extra_ to use `/execute` API for all versions of safari
<pre>
    <code class="code-wrap bash">./node_modules/.bin/magellan --sync_browsers safari</code>
</pre>

{:.description}
The following code tells _nightwatch-extra_ to use `/execute` API for safari@10 only
<pre>
    <code class="code-wrap bash">./node_modules/.bin/magellan --sync_browsers safari:10</code>
</pre>

{:.description}
_2)_.Via `nightwatch.json`

{:.description}
The following code tells _nightwatch-extra_ to use `/execute` API for all safari@10 and all versions of chrome
<pre>
    <code class="code-wrap json">{<br> "test_settings": {<br>  "default": {<br>   "globals": {<br>    "syncModeBrowserList": [<br>     "safari:10",<br>     "chrome"<br>    ]<br>   }<br>  }<br> }</code>
</pre>