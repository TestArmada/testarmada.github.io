---
layout: gettingStarted
title:  "Try it out!"
link: "tryItOut"
category: Getting Started
---

{:id="tryItOut"}
{:name="link-content"}
## Try it Out!
---

{:.description}
Run the following commands in your favorite terminal to see _Testarmada_ in action:

<pre>
    <code class="code-wrap bash">git clone git@github.com:TestArmada/boilerplate-nightwatch.git<br>npm install<br>npm run test:desktop</code>
</pre>

{:.description}
You should have seen _TestArmada_'s test runner _[magellan](https://github.com/TestArmada/magellan)_ open up Chrome and run one test through it. 

{:.description}
Next, try the following command. It demonstrates _TestArmada_'s ability to drive multiple browsers in parallel, and aggregate the results:

<pre>
    <code class="code-wrap bash">npm run test</code>
</pre>

{:.description}
You should have seen 2 Chrome windows open at once (probably stacked on top of each other) and the results of all two tests aggregated on the console.



