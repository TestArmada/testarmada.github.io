---
layout: gettingStarted
title:  "Run with other test framework"
link: "testarmadaPlugins"
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

