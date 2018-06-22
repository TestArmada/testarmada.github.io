### 1. What does it mean?

This feature allows you to respond with a data stored in a file instead of hard coding the response data in the routes definition. This way user does not have to change the response rather can just swap the file with different data.

### 2. How it works?

```js
shifu.route({
  id: 'ResponseFromFile',
  label: 'Response From File',
  path: '/get/fromFile',
  handler: function(req, reply) {
    shifu.util.respondWithFile(this, reply);
  }
});
```
> In the above setup, file needed for default route, which is /get/fromFile should be located at `./mocked-data/get/fromFile/GET/default.json`

### 3. What is `mockedDirectory` Path?

Mocked directory path is the location to the base directory where all your mocked response file will be stored. This parameter is defined in run-mock-server-console.js file. It is defined at the start of mock server as shown in the code below: 
```js
require('./endpoints-Shifu-201');
require('shifu').start({
  host: "localhost",
  mockedDirectory: "./resources/mocked-data",
  port: 8000,
  project: 'HelloShifu'
});
```

### 4. Automatic calculation of file location

The path to the mocked data file is auto-calculated based on the route path. For variants, the name of the file should be changed from default to the variant name as shown below: 
```js
shifu.route({
  id: 'ResponseFromFile',
  label: 'Response From File',
  path: '/get/fromFile',
  handler: function(req, reply) {
    shifu.util.respondWithFile(this, reply);
  }
})
.variant({
  id: 'textData',
  label: 'Text Data',
  handler: function (req, reply) {
    shifu.util.respondWithFile(this, reply);
  }
})
```
> In the above example, mock server would look for `./resources/mocked-data/get/fromFile/GET/textData.txt` file for the variant textData

### 5. Providing custom path to the response file

A custom file path could also be provided for a mocked data file. to do so, use the following code: 
```js
shifu.route({
  id: 'CustomResponseFile',
  label: 'Response From Custom Path',
  path: '/get/customFile',
  handler: function(req, reply) {
    shifu.util.respondWithFile(this, reply, {filePath: './custom.json'});
  }
})
```
> Shifu will look for the file under MockedDirectory only but at `./resources/mocked-data/custom.json`