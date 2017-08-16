---
layout: gettingStarted
title:  "Using Strategy"
link: "usingStrategy"
tags: 
 - name: What does strategy do
   link: whatDoesStrategyDo
 - name: Strategy's life cycle
   link: strategyLifeCycle
 - name: Create a strategy
   link: createAStrategy
 - name: Enable your strategy
   link: enableYourStrategy
category: Developer Guide
---

{:name="link-content"}
## Using Strategy
---

{:id="whatDoesStrategyDo"}
{:name="link-content"}
### What does strategy do

{:.description}
Strategy is introduced in _Magellan@10.1_, it helps magellan to make decision on when to do what. 

#### Bail Strategy

{:.description}
Bail strategy is the first strategy _magellan_ supports. _Magellan_ uses it to decide when to terminate the test and test suite. There are three bail strategies built in _magellan_'s code base in order to be backward compatible with previous _magellan_ bail rules. The command line arguments for those bail rules will be deprecated in the next _magellan_ release.

{:.table.table-condensed.table-hover}
| Current Strategy | Previous Rule | Purpose |
|:----------|:--------|:----------|
| bail_never | bail_never | Default bail strategy. Never early ternimate a magellan test or test suite, run every tests in the suite at least once. |
| bail_fast | bail_fast | Ternimate a magellan test suite if any test in the suite fails. |
| [magellan-early-bail-strategy](https://github.com/TestArmada/magellan-early-bail-strategy) | bail_early | Terminate a magellan test suite according to test attemps and failure rate. |

{:.description}
> _Please note_:

{:.description}
> Only one bail strategy can be enabled per magellan test suite.

{:id="strategyLifeCycle"}
{:name="link-content"}
### Strategy's life cycle

{:.description}
Strategy is configured together with all other _magellan_ components and be called at a proper time by _magellan_. Bail strategy is called everytime when a test finishes executing so that magellan can decide if current test suite needs to be early terminated or not. Strategy can have its own configuration or command line arguments. All the command line arguments have to follow the _magellan_'s [helper]() convention. Following is the overview of strategy's lifecycle.

{:.list}
{:.description}
1). Strategy will be imported if it is configured in `magellan.json` or via command line.

{:.list}
{:.description}
2). Strategy will be configured if it requires extra settings from command line arguments when magellan configures all its components.

{:.list}
{:.description}
3). Strategy will be called at proper time and passes back information back to _magellan_ to help it make decision. (for example, bail strategy will be called when every test finishes executing.)

{:id="createAStrategy"}
{:name="link-content"}
### Create a strategy

#### Bail Strategy

{:.description}
A Strategy must implement following methods.

{:.table.table-condensed.table-hover}
| Method | Purpose |
|:----------|:----------|
| `name` | full name of current bail strategy |
| `description` | full description of current bail strategy  |
| `bailReason` | reason why the bail strategy decides to terminate magellan suite |
| `decide(info)` | method to be called per test to make decision on exiting current suite or not with a boolean return value |

{:.description}
A Strategy can have following methods optionally.

{:.table.table-condensed.table-hover}
| Method | Purpose |
|:----------|:----------|
| `help` | command line arguments for current strategy |
| `setConfiguration(argv)` | how to process the command line arguments |

{:.description}
A typical strategy looks like

<script src="https://gist.github.com/archlichking/277f926455f233559aa6f41c54a64e49.js"></script>

{:id="enableYourStrategy"}
{:name="link-content"}
### Enable your strategy

#### Bail Strategy

{:.description}
Bail strategy can be enabeld either in `magellan.json` or by command line.

<code data-gist-id="38099f892a51d1eb34bad4efc710b82b" data-gist-line="49"></code>

{:.description}
or

<pre>
    <code class="code-wrap bash">--strategy_bail testarmada-magellan-early-bail-strategy</code>
</pre>