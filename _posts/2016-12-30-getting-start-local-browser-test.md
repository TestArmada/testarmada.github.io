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

<code data-gist-id="ffe008d062530ea8e444496a03f08c37" data-gist-line="1,20,27,29,38-39"></code>

{:.description}
_[magellan-local-browser](https://github.com/TestArmada/magellan-local-executor)_ is also required for your local test.

<code data-gist-id="ffe008d062530ea8e444496a03f08c37" data-gist-line="1,20,33,38-39"></code>

{:.description}
Depending on which browser you want to test, you need to include specific browser driver in your `package.json`.

<code data-gist-id="ffe008d062530ea8e444496a03f08c37" data-gist-line="1,20,22,25,38-39"></code>

{:.description}
Then, don't forget to add these drivers in your `nightwatch.json`.

<code data-gist-id="557c10f8cf51e41c3f73293e98ee9044" data-gist-line="1,20,26-28,30-31,178"></code>

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

<code data-gist-id="557c10f8cf51e41c3f73293e98ee9044" data-gist-line="1,32,60-64,177-178"></code>