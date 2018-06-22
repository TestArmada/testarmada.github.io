[**Magellan**](https://github.com/TestArmada/magellan) is a massively parallel test runner. By distributing tests across available CPU cores, Magellan blazes through long test suites in a fraction of the time, aggregating results in one friendly report.

There are two ways to tell magellan how you want to scale your tests:

### Via Command Line Arguments

All command line arguments of **magellan** and its components (executors, reporters and plugins) that are enabled can be listed out by running following command:
```bash
./node_modules/.bin/magellan --help
``` 
E.g. Run tests with 30 workers, 5 retry attempts per failed test:
```bash
./node_modules/.bin/magellan --max_workers 30 --max_test_attempts 5
```
### Via magellan.json File

All command line arguments of **magellan** can be placed into `magellan.json`. You can copy the key value pair straightly into it. 

For example, 
```bash
./node_modules/.bin/magellan --max_workers 30
```
Is equal to this in magellan.json file:
```bash
{
  "max_workers": 30
}
```
###  Configuration Notes
- If a configuration exists in both  *magellan.json*  and command line arguments, the one in  **magellan.json**  will take effect.

- **Magellan** searches **magellan.json** in your repo root by default. If you put it in a different folder, make sure to tell where it is by:

```bash
./node_modules/.bin/magellan --config ${PATH_TO_MAGELLAN.JSON}
```
### Quick Reference Guide for Command-Line Use

- By default,  **magellan** will run your test suite the fastest way possible, in parallel
- You can also run it serially (one at a time) by using **--serial** option
- You can view detailed debug info in *--serial* mode, with **--debug** option
- To control which tests to run, could use **--tag**, **--tags** option
```bash
#Specify one tag:
$ magellan --tag=smoke
#Specify multiple tags:
$ magellan --tags=smoke,web
```
- To limit the tests by a file path prefix, use the **--group** option
- To run **one specific test**, use the **--test** flag with a path to the test file