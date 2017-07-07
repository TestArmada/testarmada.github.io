---
layout: gettingStarted
title:  "Report your test result"
link: "testarmadaReporters"
tags: 
 - name: Enable an reporter
   link: enableAnReporter
 - name: Graphical Report system
   link: graphicalReportSystem
category: Getting Started
---

{:name="link-content"}
## Report your test result
---

{:.description}
By default magellan prints out all the test output in the console. But it can do more than that. _Testarmada_ has a component named reporter to allow you to generate test report in arbitary format. Following reporters are available in _Testarmada_.

{:.table.table-condensed.table-hover}
| Name | Latest Version | Purpose |
|:----------|:--------|:----------|
| [magellan-xunit-reporter](https://github.com/TestArmada/magellan-xunit-reporter) | ^0.0.3 | Reports test result as a XML file in xUnit format.|
| [magellan-json-reporter](https://github.com/TestArmada/magellan-json-reporter) | ^0.0.5 | Reports test result as a JSON file. |
| [magellan-mongo-reporter](https://github.com/TestArmada/magellan-mongo-reporter) | ^0.0.8 | Report test information to MongoDB. |
| [magellan-admiral-plugin](https://github.com/TestArmada/magellan-admiral-plugin) | ^3.0.1 | report to the [Admiral](https://github.com/TestArmada/admiral) dashboard system. |


{:id="enableAnReporter"}
{:name="link-content"}
### Enable an reporter

{:.description}
Reporter is enabled in `magellan.json`. Please follow these steps to enable reporter:

{:.description}
_1)_.Install necessary reporter via `npm install`
<pre>
    <code class="code-wrap bash">npm install magellan-xunit-reporter --save</code>
</pre>

{:.description}
_2)_.Add following code in your `magellan.json`
<pre>
    <code class="code-wrap json">{<br> "reporters": ["testarmada-magellan-xunit-reporter"]<br>}</code>
</pre>

{:.description}
Full example of `magellan.json` can be found [here](https://gecgithub01.walmart.com/otto/boilerplate-nightwatch-mobile/blob/master/magellan.json).

{:.description}
You can also enable more than one reporters per test suite. Magellan will generate test report via each configured reporter. 

<pre>
    <code class="code-wrap json">{<br> "reporters": [<br>  "testarmada-magellan-xunit-reporter", <br>  "testarmada-magellan-admiral-plugin"<br> ]<br>}</code>
</pre>

{:.description}
If any reporter errors out, all the other reporters correctly configured will still function.

{:.description}
_Please note_: Some reporters need specific configuration to be functional. Please refer to the README.md in reporter's repo for detail configuration.

{:id="graphicalReportSystem"}
{:name="link-content"}
### Graphical Report system

{:.description}
Tired of getting all the textual test report? There are tools in _Testarmada_ to help to visualize your test report.

{:.description}
_[Admiral](https://github.com/TestArmada/admiral)_ is _Testarmada_'s in house graphical report system. Here is the screen shot of admiral.

![Admiral](/assets/images/admiral-demo.gif)

{:.description}
For instructions on how to set admiral up please refer to admiral's [readme](https://github.com/TestArmada/admiral/blob/master/README.md).

{:.description}
_Please note_: to have your test report to adimral you need to enable [magellan-admiral-plugin](https://github.com/TestArmada/magellan-admiral-plugin). Please follow [enable a reporter](/#enableAnReporter) section.

{:.description}
_We're actively working on testarmada's next gen graphical report system admiral2, please hold on tight._