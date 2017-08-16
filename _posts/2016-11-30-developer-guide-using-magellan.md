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
_[Magellan](https://github.com/TestArmada/magellan)_ is designed for running tests in massive scale, which means you've been granted the full control of the scalability. There are two ways to tell magellan how you want to scale your tests


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

{:.description}
> _Please note_: 

{:.description}
> All -bail_xxxx arguments are going to be deprecated in the next release of _magellan@10.1.0_. Please refer to [Using Strategy](#whatDoesStrategyDo) section for more infomation.


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

<code data-gist-id="38099f892a51d1eb34bad4efc710b82b" data-gist-line="1-2,49"></code>

{:.description}
> _Please note_: 

{:.description}
> If a configuration exists in both `magellan.json` and command line arguments, the one in `magellan.json` will take effect.

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
The hosted test profile file needs to follow the format of

<code data-gist-id="8a7c28953320232c5b5b9ba1136dada3" data-gist-line="1-7,32"></code>

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

<code data-gist-id="8a7c28953320232c5b5b9ba1136dada3" data-gist-line="1-2,9-32"></code>

{:.description}
Then simply call _magellan_ with

<pre>
    <code class="code-wrap shell">./node_modules/.bin/magellan --profile http://some.host#tier-one-browsers</code>
</pre>

#### Via `magellan.json` file

{:.description}
`Magellan.json` supports the same test profile format as the hosted test profile file. 

<code data-gist-id="38099f892a51d1eb34bad4efc710b82b" data-gist-line="1,12,19-28,40,46,49"></code>

{:.description}
Then those profiles are ready to use via 

<pre>
    <code class="code-wrap shell">./node_modules/.bin/magellan --profile tier-one-browsers</code>
</pre>