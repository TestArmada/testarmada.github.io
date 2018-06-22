### Nightwatch-Extra API:s

#### Commands

##### .getEl()

**description**: 

Returns a html element

**Syntax**: 

```js
.getEl(selector, callback/*optional*/);
```

**Parameters**:

selector : css selector to identify the html element.

callback : callback which includes the element information.

**Usage**:
```js
.getEl(".dropdown-link .user-name", function(element){
  console.log(element); // will print out {'ELEMENT': 1}
});
```

##### .getEls()

**description**: 

Returns html elements

**Syntax**: 

```js
.getEls(selector, callback/*optional*/);
```

**Parameters**:

selector : css selector to identify the html elements.

callback : callback which includes the elements information.

**Usage**:
```js
.getEls(".dropdown-link .user-name", function(element){
  console.log(element);  // will print out [{'ELEMENT': 1}, .....]
});
```

##### .clickEl()

**description**: 

Click a html element

**Syntax**: 

```js
.clickEl(selector, callback/*optional*/);
```

**Parameters**:

selector : css selector to the html element.

callback : optional callback to be called when the command finishes.

**Usage**:
```js
.clickEl("#submit");
```

##### .clickAutomationEl()

**description**: 

Click an html element which has html attribute [data-automation-id].

**Syntax**: 

```js
.clickAutomationEl(id, callback/*optional*/);
```

**Parameters**:

id : value of data-automation-id attribute.

callback : optional callback to be called when the command finishes.

**Usage**:
```js
.clickAutomationEl("placeOrder"); // equals to .clickEl('[data-automation-id="placeOrder"]');
```

##### .getElValue()

**description**: 

Returns the textual value of a html element.

**Syntax**: 

```js
.getElValue(selector, callback/*optional*/);
```

**Parameters**:

selector : css selector to the html element.

callback : callback which includes the value of the element.

**Usage**:
```js
.getElValue(".user-profile", function(profile){ });
```

##### .setElValue()

**description**: 

Sets value to a html element.

**Syntax**: 

```js
.setElValue(selector, value, callback/*optional*/);
```

**Parameters**:

selector : css selector to the html element.

value : value to be set to the html element.

callback : optional callback to be called when the command finishes.

**Usage**:
```js
.setElValue("#username", "fake@login.com");
```

##### .setMaskedElValue()

**description**: 

Sets value to a masked html element like credit card number or phone number.

**Syntax**: 

```js
.setMaskedElValue(selector, value, callback/*optional*/);
```

**Parameters**:

selector : css selector to the html element.

value : value to be set to the html element.

callback : optional callback to be called when the command finishes.

**Usage**:
```js
.setMaskedElValue(".phone-number", "123456789");
```

##### .moveToEl()

**description**: 

Moves cursor to a html element

**Syntax**: 

```js
.moveToEl(selector, xoffset, yoffset, callback/*optional*/);
```

**Parameters**:

selector : css selector to the html element.

xoffset : x offset to move to, relative to the top-left corner of the element.

yoffset : y offset to move to, relative to the top-left corner of the element.

callback : optional callback to be called when the command finishes.

**Usage**:
```js
.moveToEl(".checkout", 10, 10);
```

##### .takeElScreenshot()

**description**: 

Takes screenshot for a html element and save it to file

**Syntax**: 

```js
.takeElScreenshot(selector, filename, callback/*optional*/);
```

**Parameters**:

selector : css selector to the html element.

filename : file name where the screen shot will be saved to (.png will be appended as prefix).

callback : optional callback to be called when the command finishes.

**Usage**:
```js
.takeElScreenshot(".phone-number", "phone-number");
```

##### .takeScreenhot()

**description**: 

Takes screenshot for the page.

**Syntax**: 

```js
.takeScreenhot(filename, callback/*optional*/);
```

**Parameters**:

filename : file name where the screen shot will be saved to (.png will be appended as prefix).

callback : optional callback to be called when the command finishes.

**Usage**:
```js
.takeScreenhot("home-page");
```

##### .assert.elContainsText()

**description**: 

Asserts if current element contains a given text

**Syntax**: 

```js
.assert.elContainsText(selector, value);
```

**Parameters**:

selector : css selector to the html element.

value : textual value or regular expression to assert.

**Usage**:
```js
.assert.elContainsText(".username", "testarmada");
```

##### .assert.elNotContainsText()

**description**: 

Asserts if current element doesn't contain a given text

**Syntax**: 

```js
.assert.elNotContainsText(selector, value);
```

**Parameters**:

selector : css selector to the html element.

value : textual value or regular expression to assert.

**Usage**:
```js
.assert.elNotContainsText(".username", "testarmada");
```

##### .assert.selectorHasLength()

**description**: 

Asserts if current selector returns given amount of elements

**Syntax**: 

```js
.assert.selectorHasLength(selector, value);
```

**Parameters**:

selector : css selector to the html element.

value : numeric value to assert.

**Usage**:
```js
.assert.selectorHasLength(".username", 1);
```

##### .assert.elValueContains()

**description**: 

Asserts if current element contains the given value

**Syntax**: 

```js
.assert.elValueContains(selector, value);
```

**Parameters**:

selector : css selector to the html element.

value : textual value to assert.

**Usage**:
```js
.assert.elValueContains(".username", "Leo");
```

##### .assert.elLengthGreaterThan()

**description**: 

Asserts if the length of an element's attribute is greater than a number

**Syntax**: 

```js
.assert.elLengthGreaterThan(selector, using, value);
```

**Parameters**:

selector : css selector to the html element.

using : element attribute, can be chosen from ["value", "text", "html", "length"].

value : numeric value to assert.

**Usage**:
```js
.assert.elLengthGreaterThan(".username", "text", 1);
```

### Nightwatch API:s

For Nightwatch API:s please [go here](http://nightwatchjs.org/api)

