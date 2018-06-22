### Tests framework structure

####  Where to find mobile commands
 1. When look at commands in page files, e.g. **setMobileElValue()** may look new to you. Those mobile commands are defined in ***./node_modules/testarmada-nightwatch-extra/lib/commands/mobile***.
 2. Assertions, e.g. **mobileElAttrContains()**, are defined in ***./node_modules/testarmada-nightwatch-extra/lib/assertions/mobile***.
 3. To use those mobile commands and assertions, need to add the following lines in nightwatch.json file: 
```bash
  "custom_commands_path": [
    "./node_modules/testarmada-nightwatch-extra/lib/commands/mobile"
  ],
  "custom_assertions_path": [
    "./node_modules/testarmada-nightwatch-extra/lib/assertions/mobile"
  ],
```
 4. You can also add your customized commands into folder **./lib/custom_commands**, to increase code reusability. And please remember to add the path to nightwatch.json file, e.g. 
```bash
  "custom_commands_path": [
    "./node_modules/testarmada-nightwatch-extra/lib/commands/mobile",
    "./lib/custom_commands"
  ],
```