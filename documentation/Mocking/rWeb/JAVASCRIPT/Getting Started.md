## Pre-Requisite
1. Please install the latest [Node.js]

<br>

## Setting Mock Server
To set up mock server, you need only three things:
* Install mock-server module.
* Routes for mock-server.
* Script to start mock-server.

<br>

**_Follow the steps below to set-up mock server:_**
1. Create a new directory `mock-server`.
1. Create a new file `package.json` under `mock-server` directory.
1. Add Mock Server module dependency in `package.json` as shown below.

    ```
    "name": "<name-for-your-project>",
    "dependencies": {
      "shifu": "^1.0.0",
      "shifu-magellan-nightwatch": "^1.0.0" // needed only for magellan/nightwatch
    },
    "scripts": {
        "start-mock": "node mocks/run-mock-server-console.js"
    }
    ```
1. Create another directory `mocks` under the `mock-server` directory.
1. Under the directory `mocks`, create a file `endpoints.js` with the following code - _This file will contain the routes that you want to mock_

    ```
        var shifu = require('shifu'); // Required
        shifu.id('example'); // Required

        // add a route that returns a message "hello world"
        shifu.route({
            id: 'message',
            label: 'hello message',
            path: '/message',
            method: 'GET',
            variantLabel: 'hello world',
            handler: function(req, reply) {
              reply({message: 'hello world'});
            }
        });
    ```
1. Under the directory `mocks`, create a file `run-mock-server-console.js`with the following code - _This file will contain the start-up script for mock server_

    ```
        // load mocked endpoint
        require('./endpoints'); 
        var shifu = require('shifu');

        shifu.start({
          host: 'localhost',
          mockedDirectory: './mocks', // this can be provided as an absolute path as well.
          port: 8080,
          project: 'HelloShifu', //Replace HelloShifu with your project name (without dashes).
        });
    ```

1. Now open terminal/cmd prompt and navigate to the directory `mock-server` and run the following command to install Mock Server and dependencies:

    ```
    npm install
    ```    
<br>

## Starting Mock Server
1. To start mock-server use the following command and than go to `http://localhost:8080/shifu` for mock-server admin-ui.

    ```
    npm run start-mock
    ```

<br>

## Common Use Cases
1. **_Starting mock server on HTTPS port -_** 
    To enable `https`, add `httpsPort` with the desired port number in server start script as shown below:
    
    ```
     shifu.start({
       port: 8080,
       httpsPort: 4444,
       host: 'localhost',
       mockedDirectory: './test/resources/mocked-data',
       project: 'HelloShifu'
     });
    ```

1. **_Mocking different REST methods -_**
    To mock different rest methods, change the `method` value in the `shifu.route()` object to any one of the following desired values:
    * POST
    * GET
    * PUT
    * DELETE
    * OPTIONS
    * PATCH

1. **_Returning different data set for the same mocked route (Variants) -_**
    Variants allows to return a different set of data for the same mocked route. To add one or more variants, attach the variant object to `shifu.route()` as shown below:

    ```
    shifu.route({
      id: 'message',
      label: 'Hello message',
      path: '/message',
      method: 'GET',
      variantLabel: 'hello world',
      handler: function (req, reply) {
        reply({message:'Hello World'})
      }
    })

    .variant({
       id: 'universe',
       label: 'hello universe',
       handler: function (req, reply) {
         reply({message:'hello universe'})
       }
     })

     .variant({
       id: 'universe',
       label: 'hello galaxy',
       handler: function (req, reply) {
         reply({message:'Hello Galaxy'})
       }
     });
    ```

    To get a different set of response, go to admin-ui and select a different variant for the above route and hit `http://localhost:8080/message` on your favorite browser.

1. **_Storing mocked response in a file -_**
    This feature allows you to respond with a static data stored in a file instead of hard coding the response data in the routes definition.

    ```
    // Automatic reply of the file
    shifu.route({
      id: 'Get Collection',
      label: 'Get Collections',
      path: '/product/grouping/api/collection/test',
      method: 'GET',
      variantLabel: 'test-1',
      handler: function(req, reply) {
        shifu.util.respondWithFile(this, reply);
      }
    })

    .variant({
       id: 'universe',
       label: 'test-2',
       handler: function (req, reply) {
         shifu.util.respondWithFile(this, reply);
       }
     });
    ```

    In the above setup, file needed for default route handler (`test-1`) should be located at (file location/name is based on `mockedDirectory/route/method/[default|variant_name].{ext}`) 
    
    ```
    ./mocks/product/grouping/api/collection/GET/default.{ext}
    ```

    If this would be a POST call than the file should have been at 
    
    ```
    ./mocks/product/grouping/api/collection/POST/default.{ext}
    ``` 

    The file name for variants should change from `default.{ext}` to universe.{ext} in above example that is the file name should be the variant name.

<br>

## Directing Traffic To Mock Server
To mock live services, your application should allow to configure it to be directed to a mock service instead of live services as shown below:

![directing_traffic]

Please update your app server or application by changing the host name of your live service with the host name for your mock server.

<br>

## Mock Server Set-up Flow
1. Identify REST endpoints that needs to be mocked.
1. Gather mocked data for those REST endpoints.
1. Create Mocked Routes by adding them in `endpoints.js` file.
1. Start Mock Server.
1. Start Your Application server that points to the Mock Server host name instead of live-service.
1. Run your application and the mocked data will be returned for mocked routes.

![mock_server_setup_flow]


[directing_traffic]: ../../images/mock_service_design.png?raw=true
[Node.js]: https://nodejs.org/en/download/
[mock_server_setup_flow]: ../../images/work_flow.png?raw=true
