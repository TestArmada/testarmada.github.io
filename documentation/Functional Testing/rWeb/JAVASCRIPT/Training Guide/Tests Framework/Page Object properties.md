### Page Object properties

- We have ***pages***, ***elements***, ***sections*** and ***commands*** properties under **./lib** directory. They are the page object properties required by ***nightwatch.js***. For more information on how to define them please refer [this](http://nightwatchjs.org/guide#using-page-objects).
- **page** is the highest level page object property, defined base on one particular page.
- One **page** can have multiple **sections**. 
- It is useful to define sections of a page. **Sections** do two things:
   1. Provide a level of namespacing under the page
   2. Provide element-level nesting so that any element defined within a section is a descendant of its parent section in the DOM
-  **elements** are the places that your tests will interact with through commands and assertions on each page. This is made simple using the **elements** property so that all your elements are defined in a single place. 
- You can add commands to your page object using the **commands** property. This is a useful way to encapsulate logic about the page that would otherwise live in a test, or multiple tests.
-  **command** will be called in the context of the page or section where it is defined.