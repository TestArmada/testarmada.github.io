---
layout: gettingStarted
title:  "Local browser test"
link: "localbrowsertest"
tags: 
 - name: Prerequisites
   link: localBrowserPreresuisites
 - name: Run test with built in browsers
   link: runTestWithBuiltInBrowsers
 - name: Run test with a new browser
   link: runTestWithANewBrowser
category: Getting Started
---

{:name="link-content"}
## Local browser test
---

{:.description}
Having your test run in local desktop browser is probably the easiest way to debug your test and app. With _Testarmada_ the setup of your local test is effortless.

{:id="localBrowserPreresuisites"}
{:name="link-content"}
### Prerequisites

{:.description}
Even though we've helped you to include everything that you need in the `package.json` in boilerplate project, it's always good to have an idea on which dependency is needed for your desktop browser test. The following dependencies are required in your project's `package.json`.

<pre>
    <code class="code-wrap js">{ // package.json<br> "selenium-server": "^3.1.0", <br> "nightwatch": "^0.9.11"<br>}</code>
</pre>

{:.description}
_[magellan-local-browser](https://github.com/TestArmada/magellan-local-executor)_ is also required for your local test.

<pre>
    <code class="code-wrap jjsson">{ // package.json<br> "testarmada-magellan-local-executor": "^2.0.0"<br>}</code>
</pre>

{:.description}
Depending on which browser you want to test, you need to include specific browser driver in your `package.json`.

<pre>
    <code class="code-wrap js">{ // package.json<br> "chromedriver": "^2.27.2", <br> "geckodriver": "^1.4.0"<br>}</code>
</pre>

{:.description}
Then, don't forget to add these drivers in your `nightwatch.json`.

<pre>
    <code class="code-wrap js">{ // nightwatch.json<br> "selenium": {<br>  "cli_args": {<br>   "webdriver.chrome.driver": "./node_modules/chromedriver/lib/chromedriver/chromedriver",<br>   "webdriver.gecko.driver": "./node_modules/geckodriver/bin/geckodriver",
<br>  }<br> }<br>}</code>
</pre>

{:.description}
Full list of dependencies for your local browser test can be found [here](https://github.com/TestArmada/boilerplate-nightwatch/blob/master/package.json#L20).

{:id="runTestWithBuiltInBrowsers"}
{:name="link-content"}
### Run test with built in browsers

{:.description}
_Testarmada_'s boilerplate project has some pre-configured browsers that you can use easily via `--local_browser`. For example, the following command triggers your test in the local Firefox.

<pre>
    <code class="code-wrap bash">DPRO=local ./node_modules/.bin/magellan --local_browser firefox --test tests/demo-web.js --serial</code>
</pre>

{:.description}
Built in browser list can be found [here](https://github.com/TestArmada/boilerplate-nightwatch/blob/master/conf/nightwatch.json).

{:id="runTestWithANewBrowser"}
{:name="link-content"}
### Run test with a new browser

{:.description}
If no desired browser can be found in the built in list, you can create a new entry under "test_settings" in `nightwatch.json` to add a new browser. For example the following code adds Safari to the list.

<pre>
    <code class="code-wrap js">{ // nightwatch.json<br> "safari": {<br>  "desiredCapabilities": {<br>   "browserName": "safari"<br>  }<br> }<br>}
    </code>
</pre>