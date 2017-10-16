---
layout: gettingStarted
title:  "Run with other test framework"
link: "testarmadaPlugins"
tags: 
 - name: Test with WD.js
   link: testWithWD
category: Getting Started
---

{:id="testarmadaPlugins"}
{:name="link-content"}
## Run with other test framework
---

{:.description}
Not have your test written by nightwatchjs? No problem, _Testarmada_ can work with other test frameworks. This is done via plugin. _Testarmada_ provides following plugins for now.

{:.table.table-condensed.table-hover}
| Name | Latest Version | Purpose |
|:----------|:--------|:----------|
| [magellan-nightwatch-plugin](https://github.com/TestArmada/magellan-nightwatch-plugin) | ^7.0.0 | Plugin that connects magellan and [nightwatch](http://nightwatchjs.org/) |
| [magellan-mocha-plugin](https://github.com/TestArmada/magellan-mocha-plugin) | ^9.0.0 | Plugin that connects magellan and [mocha](https://mochajs.org/). |

{:.description}
To notify _Testarmada_'s test runner _[magellan](https://github.com/TestArmada/magellan)_ which test framework it should talk to, a magellan plugin for that framework needs to be added in `magellan.json`.

<code data-gist-id="38099f892a51d1eb34bad4efc710b82b" data-gist-line="1,48-49"></code>

{:.description}
Please refer to the README.md of each plugin repo for its details. 

{:.description}
You can also implement your own plugin. Please refer to [Developer Guide]() for more information on how to create plugin for your need. You're welcome to submit your plugin to _Testarmada_.


{:.description}
> _Please note_: 

{:.description}
> only one framework can be enabled per test run.

{:id="testWithWD"}
{:name="link-content"}
### Test with WD.js

{:.description}
[WD.js](https://github.com/admc/wd/) is another popular node.js Webdriver/Selenium 2 client. Now _Testarmada_ allows you to write test automation cases with WD.js and run it via nightwatch runner by [./bin/owl](https://github.com/TestArmada/nightwatch-extra/#binowl).

{:.description}
[./bin/owl](https://github.com/TestArmada/nightwatch-extra/#binowl) is a command line tool which converts WD.js commands to a nightwatch compatible format so that you can use nightwatch runner to run test written in WD.js format. All nightwatch compatible WD.js commands follow the same nightwatch command standard and can be chained as plain nightwatch commands.

#### Use ./bin/owl

{:.description}
After `npm install testarmada-nightwatch-extra`, `./bin/owl` can be found under `./node_modules/.bin/owl` and that's how the name `./bin/owl` is given. To use `./bin/owl`, latest WD.js is required to be npm installed. Then follow these steps to make sure WD.js compatible commands are correctly generated and referred.

{:.list}
{:.description}
1). Create folder where you want ./bin/owl to generate commands to. For example, 

{:.description}
<pre>
    <code class="code-wrap bash">mkdir -p ./lib/custom_command</code>
</pre>

{:.list}
{:.description}
2). Run ./bin/owl 

{:.description}
<pre>
    <code class="code-wrap bash">./bin/owl --output ./lib/custom_command --config ${path_to_nightwatch.json}</code>
</pre>

{:.list}
{:.description}
3). Verify if commands are generated under `./lib/custom_command/wd`

{:.list}
{:.description}
4). Add `./lib/custom_command/wd` under `custom_commands_path` in nightwatch.json

#### Use commands

{:.description}
./bin/owl transforms command name to `wd${Command}.js` while converting them into nightwatch compatible format. For example, wd command `element()` will be transformed into `wdElement()`, and `clickElement()` will be transformed into `wdClickElement()`. 

{:.description}
The command parameters, on the other hand, stays the same. Here is an example of how `element()` and `wdElement()` are called before and after transformation.

<code data-gist-id="32ec439ebcb945cc9ee4e332e4e30740"></code>

#### Full example

{:.list}
{:.description}
1). Click a button

<code data-gist-id="cd4269407fffd5fd19a67e8928e0c7e0"></code>

{:.list}
{:.description}
2). Type in input

<code data-gist-id="0ff344184909366aeae645456857cd31"></code>

{:.list}
{:.description}
3). Swipe

<code data-gist-id="37b44cdb5377457fe14f24ae05e2e094"></code>

#### Be careful

{:.description}
./bin/owl gives you the full control of using WD.js with nightwatch runner. This is a good addon to the _Testarmada_ for device testing. However there are some inevitable drawbacks comparing to using mobile commands provided by [nightwatch-extra](https://github.com/TestArmada/nightwatch-extra)

{:.list}
{:.description}
1). _No element visibility operability check_. 

{:.list}
{:.description}
2). _No built in wait-for operation_.

{:.description}
To summarize, all commands/assertions provided by nightwatch-extra won't be executed until the element is visible and operable, otherwise nightwatch-extra will fail the test due to timeout reason. However WD.js doesn't do this for you. There is a chance that your command will fail due to element not operable or not found reason. You need to take care of this by yourself.


