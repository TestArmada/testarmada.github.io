---
layout: gettingStarted
title:  "Using Magellan"
link: "usingMagellan"
tags: 
 - name: Via Command Line Arguments
   link: scaleMagellanViaCommand
 - name: Via magellan.json
   link: scaleMagellanViaConfigFile
 - name: Configure test profile
   link: configureTestProfile
category: Developer Guide
---

{:name="link-content"}
## Using Magellan
---

{:.description}
_[Magellan](https://github.com/TestArmada/magellan)_ is designed for scalability, which means you've been granted the full control of scaling your test run with _magellan_. There are two ways to tell magellan how you want to scale


{:id="scaleMagellanViaCommand"}
{:name="link-content"}
### Via Command Line Arguments

{:.description}
All command line arguments of _magellan_ and its components (executors, reporters and plugins) that are enabled can be listed out by running following command in your favorite bash

<pre>
    <code class="code-wrap bash">./node_modules/.bin/magellan --help</code>
</pre>

{:.description}
Following is an example telling _magellan_ to run tests with 30 workers, 5 retry attempts per failed test and bail whole suite if any failure is met.

<pre>
    <code class="code-wrap bash">./node_modules/.bin/magellan --max_workers 30 --max_test_attempts 5 --bail_fast</code>
</pre>


{:id="scaleMagellanViaConfigFile"}
{:name="link-content"}
### Via magellan.json

{:.description}
All command line arguments of _magellan_ can be placed into `magellan.json`. You can copy the key value pair straightly into it. For example

<pre>
    <code class="code-wrap bash">./node_modules/.bin/magellan --max_workers 30</code>
</pre>

{:.description}
equals to the same content configured in `magellan.json`

<pre>
    <code class="code-wrap json">{<br> "max_workers": 30<br>}</code>
</pre>

{:.description}
_Please Note_: If a configuration exists in both `magellan.json` and command line arguments, the one in `magellan.json` will take effect.

{:.description}
_Magellan_ searches `magellan.json` in your repo root by default. If you put it in a different folder, make sure to tell _magellan_ where it is by

<pre>
    <code class="code-wrap bash">./node_modules/.bin/magellan --config ${PATH_TO_MAGELLAN.JSON}</code>
</pre>

{:id="configureTestProfile"}
{:name="link-content"}
### Configure test profile

{:.description}
_Magellan_ passes down test profile information, like which browser or test environment your test runs in, to its executor(s). Usually this is done by setting up a specific argument in _magellan_ command, such as 

<pre>
    <code class="code-wrap bash">./node_modules/.bin/magellan --local_browser chrome</code>
</pre>

#### Via `--profile` command line argument

{:.description}
_Magellan_ can retrieve test profile information from an URL. This gives you the convenience of managing your test environments and sharing your configuration management in a more standard way. Furthermore, by putting test profiles in to a file, you can add more information into your test profile, such as screen resolution, orientation or device information for you app test.

{:.description}
The hosted test profile file should follow the format of

<pre>
  <code class="code-wrap json">{<br> "profiles": {<br>  "microsoftedge": [{<br>   "browser": "microsoftedge_14_Windows_10_Desktop",<br>   "resolution": "1280x1024", <br>   "executor": "sauce"<br>  }]<br> }<br>}</code>
</pre>

{:.description}
_Magellan_ can read and resolve the hosted profile by following command. 

<pre>
    <code class="code-wrap shell">./node_modules/.bin/magellan --profile http://some.host#microsoftedge</code>
</pre>

{:.description}
You can add as many test profiles as your need in the hosted file. _Magellan_ is able to read more test profiles via

<pre>
    <code class="code-wrap shell">./node_modules/.bin/magellan --profile http://some.host#microsoftedge,googlechrome59,firefox57</code>
</pre>

{:.description}
Or, as a better way to handle multiple test profiles as a batch, you can put multiple test profiles into one collection, such as

<pre>
  <code class="code-wrap json">{<br> "profiles": {<br>  "tier-one-browsers": [{<br>   "browser": "microsoftedge_14_Windows_10_Desktop",<br>   "resolution": "1280x1024", <br>   "executor": "sauce"<br>  },<br>  {<br>   "browser": "chrome_latest_Windows_10_Desktop",<br>   "resolution": "1280x1024", <br>   "executor": "sauce"<br>  },<br>  {<br>   "browser": "iphone_10_0_iOS_iPhone_7_Simulator",<br>   "orientation": "portrait",<br>   "appium": {<br>    "app": "sauce-storage:my_app.zip",<br>    "appiumVersion": "1.6.4",<br>     "automationName": "xcuitest",<br>    "sendKeyStrategy": "setValue",<br>    "waitForAppScript": "true"<br>   }<br>  }]<br> }<br>}</code>
</pre>

{:.description}
Then simply call _magellan_ with

<pre>
    <code class="code-wrap shell">./node_modules/.bin/magellan --profile http://some.host#tier-one-browsers</code>
</pre>

#### Via `magellan.json` file

{:.description}
`Magellan.json` supports the same test profile format as the hosted test profile file. 

<pre>
  <code class="code-wrap json">/* magellan.json */<br>{<br> "profiles": {<br>  "tier-one-browsers": [{<br>   "browser": "microsoftedge_14_Windows_10_Desktop",<br>   "resolution": "1280x1024", <br>   "executor": "sauce"<br>  },<br>  {<br>   "browser": "chrome_latest_Windows_10_Desktop",<br>   "resolution": "1280x1024", <br>   "executor": "sauce"<br>  }]<br> }<br>}</code>
</pre>

Then those profiles are ready to use via 

<pre>
    <code class="code-wrap shell">./node_modules/.bin/magellan --profile tier-one-browsers</code>
</pre>