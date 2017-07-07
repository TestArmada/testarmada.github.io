---
layout: gettingStarted
title:  "Utilities"
link: "utilities"
tags: 
 - name: Dpro
   link: dpro
 - name: Guacamole
   link: guacamole
 - name: Renv
   link: renv
 - name: Crows-nest
   link: crowsNest
category: Getting Started
---

{:name="link-content"}
## Utilities
---

{:.description}
Good utilities can improve your work flow massively. Based on the feedback of a good number of automation test engineers, we have created several utilities to meet the most common need of our developers in speeding up the development amd better managing their tests, configurations and environments.

{:id="dpro"}
{:name="link-content"}
### Dpro

{:.description}
_[Dpro](https://github.com/TestArmada/dpro)_ is the data provider for _Testarmada_. It supports both `.js` and `.json` data format, which means you can create dynamic data on the fly. For the instructions on how to use Dpro please refer to the README.md in its repo.

{:id="guacamole"}
{:name="link-content"}
### Guacamole

{:.description}
_[Guacamole](https://github.com/TestArmada/guacamole)_ is a wrapper for the SauceLabs platform API. It standardizes browser identification with machine and human-readable browser identifiers by normalizing strings from the SauceLabs browser list API to values that desiredCapabilities actually consumes. It is already built in [magellan-saucelabs-executor](https://github.com/TestArmada/magellan-saucelabs-executor).

{:id="renv"}
{:name="link-content"}
### Renv

{:.description}
_[Renv](https://github.com/TestArmada/renv)_ mixes environment variables into the current bash context from a remote location without source or creating a subshell.

{:id="crowsNest"}
{:name="link-content"}
### Crows-nest

{:.description}
_[Crows-nest](https://github.com/TestArmada/crows-nest)_ is a supervisor tool to launch and monitor multiple SauceLabs' [Sauce Connect tunnel](https://wiki.saucelabs.com/display/DOCS/Sauce+Connect+Proxy) in [high avaiability mode](https://wiki.saucelabs.com/display/DOCS/High+Availability+Sauce+Connect+Setup).