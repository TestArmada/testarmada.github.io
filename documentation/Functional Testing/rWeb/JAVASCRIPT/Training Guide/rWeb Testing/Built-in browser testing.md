### Built-in browser testing

- The sample project has some pre-configured browsers that you can use via `--local_browser` command. 
- For example, the following command triggers your test in the local Chrome.
```bash
DPRO=local ./node_modules/.bin/magellan  --local_browser chrome  --test tests/demo-simple.js --serial --max_test_attempts 1
```
- Full list of built in browser can be found at ***test_settings*** part in **conf/nightwatch.json** file
- To run test with a **new browser**, you can just create a new entry in **test_settings** part
