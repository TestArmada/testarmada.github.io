### 1. Pre-requisites

- node.js 4+ (npm is included in the package)

### 2. Add mock dependency to `package.json`

```json
"dependencies": {
  "shifu": "^1.0.0"
}
```

### 3. Add `.npmrc` file to the project

```bash
registry=https://registry.npmjs.org/
strict-ssl=false
```

### 4. Install mock dependency with `npm install`

Run `npm install` command to install mock related dependencies.

### 5. Add `resources/endpoints.js` and create `./resources/mocked-data` directory to store the mock data.

```js
require('./endpoints');
require('shifu').start({
  host: "localhost",
  mockedDirectory: "./resources/mocked-data",
  port: 8000,
  project: 'HelloShifu'
});
```

### 6. Add `resources/run-mock-server-console.js`

```js
require('./endpoints');
require('shifu').start({
  host: "localhost",
  mockedDirectory: "./resources/mocked-data",
  port: 8000,
  project: 'HelloShifu'
});
```
Please note that you will need to replace `HelloShifu` for key `project` field with your project name(without dashes).

### 7. Add script to start mock server in `package.json`

``` json
"scripts": {
  "lint": "eslint . --ext .js",
  "start-server": "node ./resources/run-mock-server-console.js"
},
```

### 8. Test mock server can be started

``` bash
npm run start-server
```