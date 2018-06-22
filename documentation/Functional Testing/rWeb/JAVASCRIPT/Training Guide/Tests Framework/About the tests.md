### We recommend using Page Objects methodology

The Page Objects methodology is a popular pattern to write end-to-end tests by wrapping the pages or page fragments of a web app into objects. To know more about it, please read [this](http://martinfowler.com/bliki/PageObject.html).

### About the *tests*

For our sample framework:

- Create a separate folder `tests` for tests in your project. Each file inside it will be loaded as a test.
- All the tests should extend **testarmada-nightwatch-extra/lib/base-test-class**, which passes certain information, such as selenium session information and test result. 
- You can override before(), beforeEach(), afterEach() and after() method or add your own methods in your base test.
- A test can have multiple steps if needed, e.g.:
```bash
const Test = require("../lib/base-test");
module.exports = new Test({
  tags: ["pageobject", "web"],

  "Load demo first page": function(client) {
    const df = client.page["demo-first"]();
    df
      .navigate()
      .api.resizeWindow(1200, 800);
  },
  "Verify all cities on first page": function(client) {
    client
      .page["demo-first"]()
      .assert.elContainsText("#tokyo", "Tokyo")
      .assert.elContainsText(".city:eq(1) p:eq(1)", "Europe");
  },
  "Jump to demo second page": function(client) {
    client
      .page["demo-first"]()
      .jumpToSecondDemo();
  }
});
```
- Each test should have some tags, this will make it easier to group tests when execute.