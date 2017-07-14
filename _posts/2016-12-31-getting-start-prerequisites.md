---
layout: gettingStarted
title:  "Prerequisites"
link: "prerequisites"
tags: 
 - name: Environment
   link: environment
 - name: Testarmada depedencies
   link: testarmadaDependencies
category: Getting Started
---

{:name="link-content"}
## Prerequisites
---

{:id="environment"}
{:name="link-content"}
### Environment

{:.description}
_Testarmada_ requires minimum _node@4_ and _npm@2_. To run device test locally, in order to integrate appium, _Testarmada_ requires _npm@3_ or higher.

{:id="testarmadaDependencies"}
{:name="link-content"}
### Testarmada dependencies

{:.description}
The following _Testarmada_ dependencies are required for every _Testarmada_ test repo.

<pre>
    <code class="code-wrap js">{ // package.json<br> "testarmada-magellan": "^10.0.7",<br> "testarmada-magellan-local-executor": "^2.0.0",<br> "testarmada-magellan-nightwatch-plugin": "^7.0.0",<br> "testarmada-nightwatch-extra": "^4.1.0"<br>}</code>
</pre>