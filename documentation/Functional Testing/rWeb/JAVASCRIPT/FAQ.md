## I'm having npm install failure, what should I do?

Please make sure that you're using compatible node and npm. Check versions by node -v and npm -v

## Which magellan command should I use to launch my test?

Please read magellan help by ./node_modules/.bin/magellan --help first. If you cannot find what you want there, or if you're still not sure, please reach out to us.

## How should I run my test in different browsers?

If you want to test locally, Firefox and Chrome would be supported by default no matter which OS you're using. To run test in Safari, you need to follow this article. To run in IE serie, you need a Windows. Or, just simply invoke your test on saucelabs.

## How should I run my test in mobile browser?

Please use Saucelabs.

## How should I debug my test?

Right now we don't have fancy feature like block current execution --> do some variable watch --> resume your test. However, you can add a .pause() command before the command you want to debug, run your test and check selector from either developer tool or firebug from browser. Another option is adding tons of console.log() in your test.

## Why my test passes in one browser but fails in another one?

There are couple of things can impact the test results. Page rendering speed, css selector compatibility, viewport size or even the way element's being rendered. However in most cases the descrepancy is because we're not really simulating user behaviors in the test. For instance, please make sure your code is not clicking on an element that is not in the viewport.

## Can I have this feature?

If you are asking for a customized command, please check if similar command exists in our API Guide and nightwatch first. Or, if you are asking for a feature like data tools, or any other stuff that you think is useful, please join us in slack group testarmada.slack.com.