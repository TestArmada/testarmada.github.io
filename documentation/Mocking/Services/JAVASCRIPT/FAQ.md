## What Can Be Mocked? 
Any Restful service API can be mocked such as:

 - GET
 - POST
 - PUT
 - DELETE
 - OPTIONS
 - and so on..

<br>

## Can AJAX Calls Be Mocked?
Yes - It is same as for any other backend service. For AJAX call, point it to the mocked server instance instead of 
the actual back end service and add a mocked route in the file containing mocked routes for mock server.

<br>

## What Are The Pre-Requisites?
 * node.js 4+ (npm is included in the package)

<br>

## How Can I Add Mock Server Dependency To My Node Project?

```javascript
"dependencies": {
  "shifu": "1.0.0" // add the latest version
}
```

<br>

## How To Add A Mocked Route?
Add the following code in your routes file, typically `endpoints.js`

```javascript
shifu.route({
  id: 'helloWorld',                 // required
  label: 'Hello World',             // Used for Mock Server UI
  path: '/helloWorld',              // the path you want to mock
  method: 'GET',                    // The Rest Method you want to mock for this API
  handler: function (req, reply) {  // Add Logic to massage data before returning back to the request.
    reply('Hello World');
  }
});
```

<br>

## How To Create Dynamic URLs?
By adding the URL part in curly brackets that you would liek to by dynamic such as `/get/customerInfo/{customerid}/{zipcode}`

For example:
```javascript
shifu.route({
  id: 'customerInfo',
  label: 'Customer Info',
  path: '/get/customerInfo/{customerid}/{zipcode}', // both customerid and zipcode will be dynamic
  method: 'GET',
  variantLabel: 'Get Customer Info',
  handler: function (req, reply) {
    reply('How to read the customer id :(');
  }
});
```

<br>

## How To Read Dynamic URLs In Request?

```javascript
var shifu = require('shifu');
shifu.route({
  path: '/get/customerInfo/{customerid}/{zipcode}'
  handler: function(request, reply) { 
    var params = request.params;
    var customerid = params.customerid; // customerid is 123 if request is "/get/customerInfo/123/92127"
    var zipcode = params.zipcode;       // zipcode is 92127 if request is "/get/customerInfo/123/92127"
  }
}); 
```

<br>

## How To Read Header Parameters In Request?

```javascript
var shifu = require('shifu');
shifu.route({
  path: '/api/getCart'
  handler: function(request, reply) {
    var headers = request.raw.req.headers;
    var authorization = headers.authorization;
  }
}); 
```

<br>

## How To Read Payload In Request?

```javascript
var shifu = require('shifu');
shifu.route({
  path: '/api/getCart'
  handler: function(request, reply) {
    var payload = request.payload;
    // foo would be "bar" if the posted body content (as JSON) is {"foo": "bar"}
    var foo = payload.foo;
  }
}); 
```

<br>

## How To Read Query Parameters In Request?

```javascript
var shifu = require('shifu');
shifu.route({
  path: '/api/getCart'
  handler: function(request, reply) {
    var queryParams = request.query;
    // foo would be "bar" if incoming request is "/api/getCart?foo=bar"
    var foo = queryParams.foo;
  }
}); 
``` 

<br>

## How To Set Custom Headers In Mocked Response?
### Preferred Way

```javascript
shifu.route({
  id: 'header',
  label: 'Test Headers',
  path: '/api/testHeaders',
  handler: function (req, reply) {
    var myHeaders = {
      header1: 'test1',
      header2: 'test2',
      header3: true
    };
    shifu.util.respondWithFile(this, reply, {headers: myHeaders});
  }
});
```

### Alternate Way

```javascript
shifu.route({
  id: 'Get Collection',
  label: 'Get Collections',
  path: '/product/grouping/api/collection/{collectionId}',
  handler: function(req, reply) {
  reply({message: 'test'})
    .header('X-Res-Header', 'I\'m a custom response header')
  }
});
``` 

<br>

## How To Set Custom Cookies In Mocked Response?
### Preferred Way

```javascript
shifu.route({
  id: 'cookie',
  label: 'Test Cookies',
  path: '/api/testCookies',
  handler: function (req, reply) {
    var cookies = [
      {name: 'com.wm.customer', value: 'vz7.0b5c56'},
      {name: 'CID', value: 'SmockedCID', options: {domain: 'domain', path: '/'}},
      {name: 'anotherCookie', value: 'cookieValue'}
    ];
    
    shifu.util.respondWithFile(this, reply, {cookies: cookies});
  }
});
```

### Alternate Way

```javascript
shifu.route({
  id: 'Get Collection',
  label: 'Get Collections',
  path: '/product/grouping/api/collection/{collectionId}',
  handler: function(req, reply) {
      reply({message: 'test'})
       .state('test-cookie', 'I\'m a custom response cookie')
  }
});  
```

<br>

## How To Set CORS Headers?

```javascript
var corsHeaders = {
  origin: ['*'],
  headers: ["Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"],
  credentials: true,
}

// Items
shifu.route({
  id: 'tempo',
  label: 'Tempo',
  path: '/tempo1',
    
  config: {
    cors: corsHeaders
  },
  handler: function(req, reply) {
    shifu.util.respondWithFile(this, reply);
  }
});
```

<br>

## What Is `respondWithFile` Utility?
This feature allows you to respond with a data stored in a file instead of hard coding the response data in the routes definition. This way user does not have to hard-code/change the response in handler and rather can just swap the file with different data without even bringing the server down.

```javascript
  shifu.route({
      id: 'ResponseFromFile',
      label: 'Response From File',
      path: '/get/fromFile',
      handler: function(req, reply) {
        shifu.util.respondWithFile(this, reply);
      }
  });
```  
In the above example, mock server will automatically look for a file `default.{some_extension}`  at `./mocked-data/get/fromFile/GET/default.{some_extension}`

<br>

## How File Path Is Calculated For `respondWithFile` Utility?
The path to the mocked data file is auto-calculated based on the route path. For example if the route path is /get/cart than for the default variant, mock server will look for the `default.{some_extension}` file at `./mocked-data/get/fromFile/GET/default.{some_extension}`. For variants, the name of the file should be changed from default to the variant name as shown below: 

```javascript
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
});
```
In above example mock server will look for `./resources/mocked-data/get/fromFile/GET/textData.{some_extension} file for the variant textData`

<br>

## Can I Provide A Custom File Location `respondWithFile` Utility?
Yes. By adding `filePath` parameter as shown in below example:

```javascript
shifu.route({
  id: 'CustomResponseFile',
  label: 'Response From Custom Path',
  path: '/get/customFile',
  handler: function(req, reply) {
    shifu.util.respondWithFile(this, reply, {filePath: './custom.json'});
  }
});
```
In above example mock server will look for the file under MockedDirectory only but at `./mocked-data/custom.json`

<br>

## How To Respond Only With Code?

```javascript
shifu.route({
  id: 'message',
  label: 'hello message',
  path: '/message',
  handler: function(req, reply) {
    reply().code(400);
  }
});
```

<br>

## Can I Return A Response Code With `respondWithFile` Utility?
Yes - by adding `code` parameter as shown in below example:

```javascript
shifu.route({
  id: 'message',
  label: 'hello message',
  path: '/message',
 
  handler: function(req, reply) {
    shifu.util.respondWithFile(this, reply, {code: 400});
  }
});
```

<br>

## What Is MockedDirectory Path?
Mocked directory path is the location to the base directory where all your mocked response file will be stored. This parameter is defined in run-mock-server-console.js file. It is defined at the start of mock server as shown in the code below: 

```javascript
require('./endpoints');
require('shifu').start({
  host: "localhost",
  mockedDirectory: "./resources/mocked-data",
  port: 8000,
  project: 'HelloShifu'
});
```

<br>

## Location For Response File For RespondWithFile?
If you have set your default folder to be `mocked-data`, then based on your URL path:

For default variant, mock server will look for `./mocked-data/product/grouping/api/collection/GET/default.json` 
and for `mixItem` variant mock server will look for `./mocked-data/product/grouping/api/collection/GET/mixItem.json` 

<br>

## What Are Variants?
Variants allows to return a different data set for a given mocked route. Variants can be selected either in the admin UI or through automation APIs to determine what type of response a route should have. Routes are defined using the variant method on the Route object (returned by calling the route method). An object parameter is provided with the following attributes

 * id: the variant id - used for the RESTful admin API and profile settings
 * label: (optional) the variant label - used for display on the admin panel
 * handler: (optional) the HAPI route handler which provides the route response

Variants are useful because they allow you to test multiple scenarios that can happen with your route. Say, for example, you have a route exposing the ability to update a password. You might have several exceptional scenarios that you would want to test out (each could be a variant that you simply select to tell the route handler to use the appropriate response)
 * the password was reset successfully
 * the password didn't pass validation
 * the old password wasn't entered correctly
 * the username doesn't exist
 * and so on...

<br>

## How To Add A Variant To A Route?
To add a one or more variants do the following:

```javascript
shifu.route({
  id: 'message',
  label: 'Message',
  path: '/get/message',
  method: 'GET',
  variantLabel: 'Hello',
  handler: function (req, reply) {
    reply('Hello');
  }
})
 
.variant({
    id: 'hello',
    label: 'Hello World',
    handler: function (req, reply) {
      reply('Hello World');
    }
  })

.variant({
    id: 'hello',
    label: 'Hello Universe',
    handler: function (req, reply) {
      reply('Hello Universe');
    }
  });  
```  

<br>

## How To Switch Variants In Test Case?

    browser.setMockVariant({ fixture: "fixture id", variant: "variant id" }); 

<br>

## How To Switch Variants With HTTP Call?
You can also switch the variants via HTTP call (Recommended only when not using Shifu as a library). As an example, if you want to set variant to `helloUniverse` for the route below:

```javascript
  shifu.route({
    id: 'helloWorld',
    label: 'Hello World',
    path: '/helloWorld',
    method: 'GET',
    handler: function (req, reply) {
      reply('Hello World');
    }
  })
  .variant({
    id: 'helloUniverse',
    label: 'Hello Universe',
    handler: function (req, reply) {
      reply('Hello Universe');
    }
  });
```

```
curl  -H "Content-type: application/json" -X POST -d '{"variant":"<variant>"}' <host>:<port>/shifu/api/route/<routeId>
```

So for the above route, you can switch the variant to `helloUniverse` like this:

```
curl  -H "Content-type: application/json" -X POST -d '{"variant":"helloUniverse"}' http://localhost:8000/shifu/api/route/helloWorld
```

When using parallel sessions, if you want to switch a variant for a route for a particular session, register the session with mock server like this:
 
```
curl <host>:<port>/shifu/api/registerSession

// e.g 
curl http://localhost:8000/shifu/api/registerSession
```
 
If sessions are available, mock server will return a response like: 
```
 {"session":"33b08d"}
```
 
Extract the session id from response and append it to the route id you want to switch variant for e.g:
```
curl -H "Content-type: application/json" -X POST -d "variant":"helloUniverse"}' http://localhost:8000/shifu/api/route/helloWorld-33b08d
```

<br>

## What Is Mock Server UI Used For? 
UI can be used to view and test mocked routes as well as for manual switching of variants when running tests manually. 


<br>

## What Is Parallel Sessions?
Parallel sessions allows you to run multiple instance of server virtually while running only one server. This is helpful when you are running multiple test cases which access the same routes but different variants as parallel sessions allow you to set different variants on same routes without conflicting. This saves CPU and RAM both as only one server is running instead of multiple. Please see the call flow explaination without and with Parallel Sessions Below:

### Call Flow Without Parallel Sessions
![without_parallel_sessions]

### Call Flow With Parallel Sessions
![with_parallel_sessions]

<br>

## How Can I Enable Parallel Sessions On Mock Server?
Add `sessions` parameter with number of virtual services you want as shown in below example while startung mock Server.

```javascript
require('./endpoints');
var shifu = require('shifu');
shifu.start({
  host: "localhost",
  mockedDirectory: "./resources/mocked-data",
  port: 8000,
  sessions: 2,
  project: 'HelloShifu'
});
```

<br>

## How Can I Register a Session For Parallel Sessions?

```javascript 
var sessionId = shifu.registerSession();
```

<br>

## How Can I Close A Session For Parallel Sessions?

```javascript 
var closeSession = shifu.closeSession(sessionId);
```

<br>

## Does Mock Server Has Any Utility To Modify JSON Data Stored In Files?
Yes - Mock Server exposes `transpose` option that cna be passed in `respondWithFile` method to modify the JSON files dynamically.

<br>

## How Does `transposeData` Work To Modify JSON Data Stored In Files?
If you have many variants for a Rest end point and the mocked data for all variants can use the same JSON response with few changes to the values, than this feature is what you need. This feature allows you to dynamically change a JSON file before sending the response back from the mock server for the request. It removes the need of having one to one mapping of static JSON files with each variants. 

```javascript
// Static Response JSON File
{
 id: "1234",
 name: "toothpaste"
 details: [
   {
    flavor: "Mint 1",
    Size: "10",
    Size_Type: ounce
    },
   {
    flavor: "Mint",
    Size: "10",
    Size_Type: ounce
   }
 ]
}

// Sample code for substituting id from 1234 to 7777 and flavor from Mint to Mint 2 for second array element in routes
shifu.route({
    id: 'Get Collection',
    label: 'Get Collections',
    path: '/product/grouping/api/collection/{collectionId}',
 
    handler: function(req, reply) {
      var dataToChange = {
        'id': '7777',
        'details[1].flavor': 'Mint 2'
      }
      shifu.util.respondWithFile(this, reply, {transpose: dataToChange}); 
    }
});

// Dynamic Response JSON File returned from Mock service
{
 id: "7777",
 name: "toothpaste"
 details: [
   {
    flavor: "Mint 1",
    Size: "10",
    Size_Type: ounce
    },
   {
    flavor: "Mint 2",
    Size: "10",
    Size_Type: ounce
   }
 ]
}
```

<br>

## Can I Use `transposeData` Functionality Outside Of `respondWithFile`?
Yes - You can use it by Shifu Utils.

```javascript
var fileLocation = require("path").join(__dirname, './resources/test-data/data-transposition-test.json');
var dataSet = utils.readJsonFile(fileLocation);
var dataToChange = {
 'items.item[0].id': 1234, // substitue id 0001 to 1234
 'items.item[0].val': "value", // Add 'val' to first array element of items.item
 'items.item[1].id': 4567, // Add 'id' to second array element of items.item
 'items.item[0].batters.batter[0].id': 5678 // substitue id 1001 to 5678
}
substitutedData = shifu.util.transposeData(dataSet, dataToChange);

// Base JSON file - data-transposition-test.json
{
  "items":
  {
    "item":
    [
      {
        "id": "0001",
        "type": "donut",
        "name": "Cake",
        "ppu": 0.55,
        "batters":
        {
          "type" : 1,
          "batter":
          [
            { "id": "1001", "type": "Regular" },
          ]
        },
        "topping":
        [
          { "id": "5001", "type": "None" }
        ]
      }
    ]
  }
};

// Resulted JSON
{
  "items": {
    "item": [
      {
        "id": 1234,
        "type": "donut",
        "name": "Cake",
        "ppu": 0.55,
        "val": "value"
        "batters": {
          "type": 1,
          "batter": [
            {"id": 5678, "type": "Regular"}
          ]
        },
        "topping": [
          {"id": "5001", "type": "None"}
        ]
      },
      {
        "id": 4567
      }
    ]
  }
};
```

<br>

## Why Mock Server Returns Error 415 Unsupported Media Type?
If you're using content type like `application/graphql`, follow this example

```javascript
  shifu.route({
    id: 'id',
    label: 'id',
    path: '/graphql',
    method: ['POST', 'PUT'],
    config : {
      payload: {
        parse: false,
        allow: 'application/graphql'
      }
    },
    handler: function (req, reply) {
      shifu.util.respondWithFile(this, reply, {code: 200});
    }
  });
```  
For more details, [read this](https://stackoverflow.com/questions/34640307/support-additional-mime-types-in-hapi)


[without_parallel_sessions]: ../../images/shifu_without_parallel_sessions.png?raw=true "Shifu Without Parallel Sessions"

[with_parallel_sessions]: ../../images/shifu_with_parallel_sessions.png?raw=true "Shifu With Parallel Sessions"
