
<!-- TOC -->

- [Mocking API's](#mocking-apis)
    - [Start Mock Server - start()](#start-mock-server---start)
    - [Stop Mock Server - stop()](#stop-mock-server---stop)
    - [Create Mocked Route - route()](#create-mocked-route---route)
    - [Create Variant - variant()](#create-variant---variant)
    - [Set variant - setMockVariant()](#set-variant---setmockvariant)
    - [Add global variants - addGlobalVariant()](#add-global-variants---addglobalvariant)
    - [Respond With File - respondWithFile()](#respond-with-file---respondwithfile)
    - [Respond with mock variant - respondWithMockVariant()](#respond-with-mock-variant---respondwithmockvariant)
    - [Set Mock Id - setMockId()](#set-mock-id---setmockid)
    - [Get Mock Id - getMockId()](#get-mock-id---getmockid)
    - [Reset Mock Id - resetMockId()](#reset-mock-id---resetmockid)
    - [Reset url count - resetURLCount()](#reset-url-count---reseturlcount)
    - [Get url count - getURLCount()](#get-url-count---geturlcount)
    - [Register session - registerSession()](#register-session---registersession)
    - [Close session - closeSession()](#close-session---closesession)
    - [Check session - checkSession()](#check-session---checksession)
    - [Get sessions - getSessions()](#get-sessions---getsessions)
    - [Clear sessions - clearSessions()](#clear-sessions---clearsessions)
    - [Get project name - getProjectName()](#get-project-name---getprojectname)
    - [Get port information - getPortInfo()](#get-port-information---getportinfo)
    - [Add state - addState()](#add-state---addstate)
    - [Get state - getState()](#get-state---getstate)
    - [Clear state - clearState()](#clear-state---clearstate)
    - [Enable Metrics - enableMetrics()](#enable-metrics---enablemetrics)
    - [Check if metrics are enabled - isMetricsEnabled()](#check-if-metrics-are-enabled---ismetricsenabled)
    - [Dynamic transposition of JSON data - transposeData()](#dynamic-transposition-of-json-data---transposedata)
    - [Kill process - killProcess()](#kill-process---killprocess)
    - [Read contents of a file - readFile()](#read-contents-of-a-file---readfile)
    - [Read contents of a file - readFileSynchronously()](#read-contents-of-a-file---readfilesynchronously)
    - [Read contents of JSON file - readJsonFile()](#read-contents-of-json-file---readjsonfile)
    - [Write to file - writeFile()](#write-to-file---writefile)
    - [Delete file - deleteFile()](#delete-file---deletefile)
    - [Check if directory exists - checkDirectoryExists()](#check-if-directory-exists---checkdirectoryexists)
    - [Check if file exists - checkFileExists()](#check-if-file-exists---checkfileexists)
    - [Set Log level - setLogLevel()](#set-log-level---setloglevel)
    - [Get Log level - getLogLevel()](#get-log-level---getloglevel)
    - [Reset Log level - resetLogLevel()](#reset-log-level---resetloglevel)

<!-- /TOC -->

## Mocking API's

### Start Mock Server - start()

This API allows to start the mock server.

```
shifu.start(options, callback);
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
options | JSON object with the attributes described in the table below | No |
callback | The first argument to callback function is the server instance if the start is successful, else it is an error. | No |

where ***`options`*** has the following attributes:

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
host | Hostname for mock server (default: localhost) | No |
port | Port for mock server (default: 8080) | No |
httpsPort | Https port for mock server | No |
mockedDirectory |Path to the mocked data directory (default: `resources/mocked-data` w.r.t working directory). | No |
sessions | Number of parallel sessions to start the mock server with (default: 0) | No |
collectMetrics | Enable mock server to collect usage metrics (default: true) | No |
project | Name for your project (default: default) | No |

**Example**

```
var shifu = require('shifu');
shifu.start({
  host: 'localhost',
  port: 12000,
  httpsPort: 12001,
  mockedDirectory: '/resources/mockedData',
  sessions: 3,
  project: 'My Project'
});
```

---

<br>
 
### Stop Mock Server - stop()

This API allows to stop the mock server.
  
```
shifu.stop(server, callback);
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
server | server instance returned by start() method | Yes |
callback | The first argument to callback function is an error if an error is encountered in stopping the server, null otherwise | No |

**Example**

```
var shifu = require('shifu');
var server = shifu.start(options, callback);

// do something with mock server

shifu.stop(server, function (error) {
  if (error) {
      console.log('Unable to stop mock server');
  } else {
      console.log('Mock Server stopped');
  }
});
```

---

<br>

### Create Mocked Route - route()

This API allows to create/add required mocked REST endpoints.

```
shifu.route(options);
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
options | JSON object with the attributes described in the table below | Yes |

where ***`options`*** has the following attributes:

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
id | The unique route id for the mock server | Yes |
label | The route label used for display on the Shifu Admin Panel | No |
path | The route path | Yes |
method | The HTTP route method (defaults to `GET`) | No |
handler | The HAPI route handler which provides the route response. This is optional because you could use multiple variants to handle the response (See Variants) | No |

**Example**

```
var shifu = require('shifu');
shifu.route({
  id: 'my_route',
  label: 'My Route',
  path: '/api/foo',
  method: 'GET',
  handler: function(request, reply) {
    // Add logic for handler
    reply('Hello');
  }
});
```

---

<br>

### Create Variant - variant()

This API allows to create/add variants. Variants are route handlers that you can select manually (via Shifu Admin panel) or Rest call or through Node API to select a different dataset for the response for a given route. Variants are defined using the `variant()` method on the Route object (returned by calling the route method).

```
shifu.route(routeOptions).variant(options)
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
options | JSON object with the attributes described in the table below | Yes |

where ***`options`*** has the following attributes:

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
id | The unique variant id for a given route | Yes |
label | The route label used for display on the Admin Panel | No |
handler | The HAPI route handler which provides the variant response for the route | No |

**Example**

```javascript
var shifu = require('shifu');
shifu.route({
  id: 'my_route',
  path: '/api/foo',
  handler: function(request, reply) {
    // this is essentially the same as the "default" variant
    reply({firstName: 'John'});
  }
})
.variant({
  id: 'Billy',
  handler: function(request, reply) {
    reply({firstName: 'Billy'});
  }
})
.variant({
  id: 'Clark',
  handler: function(request, reply) {
    reply({firstName: 'Billy'});
  }
});
```

---

<br>

### Set variant - setMockVariant()
`setMockVariant` can be used to set a variant to an existing API path.

```
shifu.setMockVariant(options, callback) // with Shifu library

or 

browser.setMockVariant(options, callback) // when using Magellan
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
options | JSON object with the attributes described in the table below | No |
callback | callback function to be called after setMockVariant() | Yes |

where `options` has the following attributes:

| Attribute |  Description | Required |
| :---------: | ------------- | :--------: |
| fixture | Id defined in route | Yes |
| variant |  The variant defined in endpoint.js for the fixture you entered | Yes |
| portNumber | Port number where the mock server is running on | No |
| shifuSessionId | Shifu session id, if using parallel sessions | No|

**Example**

If the routes are defined like

```
var shifu = require('shifu');
shifu.route({
  id: 'hello',
  path: '/helloWorld',
  handler: function(request, reply) {
    reply('Hello World');
  }
})
.variant({
  id: 'universe',
  handler: function(request, reply) {
    reply('Hello Universe');
  }
});
```

For the route and variant defined as above, you can set the variant to `universe` as follows:
``` 
// when using Shifu library
shifu.setMockVariant({
    fixture: 'hello', // same as id in the .route() options
    variant: 'universe' // same as id in the .variant() options
}, function (err) {
    if (err) {
        console.log('Error in setting variant:' + err);
    } else {
        console.log('Successfully set variant');
    }
});

or 

// When using Magellan
browser.setMockVariant({ fixture: "hello", variant: "universe" });

or 

Alternately, you can also use `curl` call to set a variant with this POST call to `{host}:{port}/shifu/api/route/{routeId}`

curl -H "Content-Type: application/json" -X POST -d '{"variant":"{universe}"}' http://localhost:8080/shifu/api/route/hello?returnConfig=true
```

You can confirm if this works by going to Admin panel and see that for `helloWorld` route, the variant `universe` will be highlighted. Also, hitting this url `http://localhost:8080/helloWorld` will reply with `Hello Universe`.

If the variant does not exist on the route, mock server returns with an Internal Server error (HTTP 500).

---


<br>

### Add global variants - addGlobalVariant()

You can also add global variants that will affect all routes. The attributes to the `options` are same as that of `variant()`.

```
shifu.route(routeOptions).addGlobalVariant(options)
```

where

**options** - JSON object with the same attributes as of variant [described in this section](#set-variant---setmockvariant)

**Example**
```
var shifu = require('shifu');

shifu.addGlobalVariant({
  id: '500',
  label: '500 error',
  handler: function(request, reply) {
    reply({
      statusCode: 500,
      error: 'Internal Server Error'
    }).code(500);
  }
})
```
---

<br>

### Respond With File - respondWithFile()

This API allows to respond with static data stored in a file instead of hard coding the response data in the routes definition. Based on the path of the URL that is being mocked, the response file can be dropped in the directory location and the file will be automatically used by Shifu for sending the response. It also allows to specify the absolute path of the response files.

```
shifu.util.respondWithFile(route, reply, options);
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
route | Handle to the shifu route object | Yes |
reply | Handle to the reply object | Yes |
options | JSON object with additional options desribed below | No |


Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
code | HTTP Status code to reply with | No |
filePath | Static file path of the mocked data | No |
delay | Delay response time by this value (in milliseconds) | No |

To use this feature, you can call `respondWithFile()` from inside route configuration as follows:

**Example**
```
var shifu = require('shifu');

// Automatic reply of the file
shifu.route({
  id: 'Get Collection',
  label: 'Get Collections',
  path: '/product/grouping/api/collection/{collectionId}'

  handler: function(req, reply) {
    shifu.util.respondWithFile(this, reply);
  }
})

.variant({
  id: 'mixItem',
  label: 'Mix Item'

  handler: function(req, reply) {
    shifu.util.respondWithFile(this, reply, {code: 204, filePath: '../mocked-data/fileName.json', delay: 1000});
  }
})
```

***Note the Use of `shifu.util` to access the method `respondWithFile`***

---

<br>

### Respond with mock variant - respondWithMockVariant()

This API allows to respond with a variant on the main route handler. The 'variant' passed in MUST be the variant on existing route. 

```
shifu.util.respondWithMockVariant(route, variant, req, reply)
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
route | The route object | Yes |
variant | Variant on the route | Yes |
request | Request object | Yes |
reply | Reply object | Yes |

**Example**
```
var shifu = require('shifu');
shifu.route({
    id: 'respondWithVariant',
    label: 'Respond With Variant',
    path: '/respondWithVariant',
    variantLabel: 'Respond With Main Route',
    handler: function(req, reply) {
        shifu.util.respondWithMockVariant(this, 'variant', req, reply); // make sure that the variant exist in the same route.
    }
}).variant({
    id: 'variant',
    label: 'Respond With Variant Route',
    handler: function(req, reply) {
        reply({
            'message': 'I am an example of respond_with_mock_variant instead of response of main route '
        });
    }
});
```

***Note the Use of `shifu.util` to access the method `respondWithMockVariant`***

---

<br>

### Set Mock Id - setMockId()

This API allows to set mock id for a given test case. If this is set, it overrides all the variants and mocked URLs responses to return mocked data from the given directory as `mock-id`, where `mock-id` is the directory name.

```
shifu.setMockId(mockId, shifuSessionId) // with Shifu library

or 

browser.setMockId(mocKId, shifuSessionId, callback); // when using Magellan
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
mockId | Mock id which is the directory name you want to respond data from | Yes |
shifuSessionId | Shifu session id, if using parallel sessions | No |
callback | callback function to be invoked after mock id is set (only when using Magellan) | No |

The file name should be in the format `url-methodName-urlCount.extension` for the responses stored under file. For example, for the given route below 

```
var shifu = require('shifu');

shifu.route({
  id: 'my_route',
  label: 'My Route',
  path: '/api/foo',
  method: 'GET',

  handler: function(req, reply) {
    shifu.util.respondWithFile(this, reply);
  }
});
```

the file name should be `api-foo-GET-1.json` for the first time the URL is hit. For second time the URL is hit, the file name returned would be `api-foo-GET-2.json`. If the specific file for the count is not present, Shifu will look for default file `api-foo-GET.json`, which is also helpful if you want to always return the same response irrespective of the number of times the URL is hit.



**Example**:

```
var shifu = require('shifu');
shifu.setMockId('cart', 'abcdef'); // All responses should be under "cart" directory under your mocked data directory

or 

browser.setMockId('cart', 'abcdef' , callback);

or

curl http://localhost:8000/shifu/api/setMockId/cart/abcdef

```

`TIP!` For a dynamic url such as `/app/{cartid}/getStatus` the default file name should be `app-cartid-getStatus-GET.json` and the count specific file name should be like `app-cartid-getStatus-GET-1.json`.

---

<br>

### Get Mock Id - getMockId()

This API is used to retrieve the currently set mock id.

```
shifu.getMockId(shifuSessionId);
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
shifuSessionId | Shifu session id, if using parallel sessions | No |

**Example**:

```
var shifu = require('shifu');
var mockId = shifu.getMockId('abcdef');

or 

curl http://localhost:8000/shifu/api/getMockId/cart/abcdef

```

Note that `abcdef` is the session id in use for the current test (optional, if not using parallel sessions)

---

<br>

### Reset Mock Id - resetMockId()

This API is used to reset currently set mock id.

```
shifu.resetMockId(shifuSessionId) // with Shifu library

or 

browser.resetMockId(shifuSessionId, callback); // when using Magellan
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
shifuSessionId | Shifu session id, if using parallel sessions | No |
callback | callback function to be invoked after mock id is set (only when using Magellan) | No |

**Example**:

```
var shifu = require('shifu');
shifu.resetMockId('abcdef');

or 

browser.resetMockId('abcdef', callback);

or 

curl http://localhost:8000/shifu/api/resetMockId/cart/abcdef

```

Note that `abcdef` is the session id in use for the current test (optional, if not using parallel sessions)

---

<br>

### Reset url count - resetURLCount()

This API is used to reset URL count to zero. This works in conjunction with `setMockId` function where you want to restart over for the URL count.

```
shifu.resetURLCount(shifuSessionId)

or 

browser.resetURLCount(shifuSessionId, callback)
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
shifuSessionId | Shifu session id, if using parallel sessions | No |
callback | callback function to be be invoked after the mock id is reset | No |

**Example**:

```
var shifu = require('shifu');
shifu.resetURLCount('abcdef');

or 

browser.resetCount('abcdef', callback); // 'abcdef' is a shifu session id in use for the test

or

curl http://localhost:8000/shifu/api/resetURLCount/abcdef
```

Note that `abcdef` is the session id in use for the current test (optional, if not using parallel sessions)

---

<br>

### Get url count - getURLCount()

This API is used in conjunction with `setMockId` function where you want to get the URL count for all mocked calls.

```
shifu.getURLCount(shifuSessionId)
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
shifuSessionId | Shifu session id, if using parallel sessions | No |

**Example**:

```
var shifu = require('shifu');
shifu.getURLCount('abcdef');

or 

curl http://localhost:8000/shifu/api/getURLCount/abcdef

```

Note that `abcdef` is the session id in use for the current test (optional, if not using parallel sessions)

---

<br>

### Register session - registerSession()

This API is used to register a session with Shifu for a test case when using parallel sessions. Shifu needs to be started with `sessions`.

```
shifu.registerSession(); // with Shifu library

or 

browser.registerSession(callback); // with browser tests
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
callback | callback function to be be invoked after the session is registered. First argument to the callback is an error object, in case of error, null otherwise. The second argument is the registered session id (Only for browser tests) | Yes |

You can use `registerSession()` to register a session with Shifu and can subsequently use that session id for the current test. Shifu returns a unique identifier when registering a session.

If no session is available to use, Shifu returns with the message `NOT_AVAILABLE`.

**Example**

If `shifu` server is started with sessions, for e.g 3 sessions as shown below,

```
var shifu = require('shifu');
shifu.start({
    host: 'localhost',
    port: 8080,
    mockedDirectory: 'resources/mockedData',
    sessions: 3
});
var shifuSessionId = shifu.registerSession();

or


 browser.registerSession(function (err, sessId) {
    if (err) {
      return callback(new Error("Unable to get the sessionId"));
    }
    self.shifuSessionId = sessId;
    client.shifuSessionId = sessId; 
    return callback();
});

or

curl http://localhost:8000/shifu/api/registerSession
```

---

<br>

### Close session - closeSession()

This API is used to close a session after running a test so it can be made available for subsequent tests.

```
shifu.closeSession(shifuSessionId);

or 

browser.closeSession(shifuSessionId, callback);
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
shifuSesssionId | Shifu session id to be closed | Yes |
callback | callback function to be be invoked after the session is registered. First argument to the callback is an error object, in case of error, null otherwise (Only when using browser tests) | Yes |


**Example**

```
var shifu = require('shifu);
shifu.closeSession('abcdef'); // abcdef is a previously registered session with Shifu

or 

client.closeSession('abcdef', function (err) {
  if (err) {
    console.error("Error in closing session:");
  }
});

or

curl http://localhost:8000/shifu/api/closeSession/abcdef
```

Note that `abcdef` is a previously registered session with Shifu.

---

<br>

### Check session - checkSession()

This API is used to check status of a session id. It returns one of these states

* `AVAILABLE` - If the session is available for use
* `IN_USE` - If the session is in use 
* `DOES_NOT_EXISTS` - If the session id passed is invalid or does not exist

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
shifuSessionId | Shifu session id | Yes |

**Example**

```
var shifu = require('shifu);
var status = shifu.checkSession('abcdef');

or 

curl http://localhost:8000/shifu/api/checkSession/abcdef
```

---

<br>

### Get sessions - getSessions()

This API is used to get sessions information

```
shifu.getSessions();
```

**Example**

```
var shifu = require('shifu);
var status = shifu.getSessions();

or 

curl http://localhost:8000/shifu/api/getSessions
```

---

<br>

### Clear sessions - clearSessions()

This API is used to clear the sessions information.

```
shifu.clearSessions();
```

**Example**

```
var shifu = require('shifu);
var status = shifu.clearSessions();
```

---

<br>

### Get project name - getProjectName()

This API is used to get the project name passed in Shifu options

```
shifu.getProjectName();
```

**Example**

```
var shifu = require('shifu);
var projectName = shifu.getProjectName();
```

---

<br>

### Get port information - getPortInfo()

This API is used to get the port information passed in Shifu options

```
shifu.getPortInfo();
```

**Example**

```
var shifu = require('shifu);
var portInfo = shifu.getPortInfo();
```

---

<br>

### Add state - addState()

This API is used to add a value to the server state.

```
shifu.addState(route, key, value);
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
route | Route object | Yes |
key | Key for the state variable | Yes |
value | Value of the state variable | Yes |

**Example**

```
var shifu = require('shifu);

shifu.route({
  id: 'setState',
  label: 'Add State',
  path: '/login',
  handler: function (req, reply) {
    shifu.addState(this, 'loggedIn', true);
    reply().code(204);
  }
});
```

---
<br>

### Get state - getState()

This API is used to read a value from the server state.

```
shifu.getState(route, key);
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
route | Route object | Yes |
key | Key for the state variable | Yes |

**Example**

```
var shifu = require('shifu);

shifu.route({
  id: 'getState',
  label: 'Get State',
  path: '/isLogin',
  handler: function (req, reply) {
    var isLoggedIn = shifu.getState(this, 'login');
    reply(isLoggedIn);
  }
});
```

---
<br>

### Clear state - clearState()

This API is used to clear a state for a given session id (Defaults to `default` session).

```
shifu.clearState(shifuSessionId);
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
shifuSessionId | Shifu session id | No |

**Example**

```
var shifu = require('shifu);

shifu.clearState(); // Clears state for default session

shifu.clearState('abcdef') // Clears state for session id `abcdef`
```

---
<br>

### Enable Metrics - enableMetrics()

This API is used to enable gathering of usage metrics.

```
shifu.enableMetrics(boolean);
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
boolean | true to enable, false to disable | No |

**Example**

```
var shifu = require('shifu);

shifu.enableMetrics(true); // Enables gathering of usage metrics

shifu.enableMetrics(false); // Disables gathering of usage metrics
```

---

<br>

### Check if metrics are enabled - isMetricsEnabled()

This API is used to check if metrics gathering is enabled on Shifu. Returns true if metrics gathering is enabled, false otherwise

```
shifu.isMetricsEnabled();
```

**Example**

```
var shifu = require('shifu);

shifu.isMetricsEnabled();
```

---

<br>

### Dynamic transposition of JSON data - transposeData()

This API allows to dynamically transpose the JSON data

```
shifu.util.transposeData(dataSet, dataToChange);
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
dataSet | The data set which needs to change | Yes |
dataToChange | The changes needed in the data set | Yes |

To change the JSON data on fly (edit existing values or add values).

```
// Base JSON file
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
}

// Code example
var dataToChange = {
 'items.item[0].id': 1234, // substitue id 0001 to 1234
 'items.item[0].val': "value", // Add 'val' to first array element of items.item
 'items.item[1].id': 4567, // Add 'id' to second array element of items.item
 'items.item[0].batters.batter[0].id': 5678 // substitue id 1001 to 5678
}

// when using utils class
var fileLocation = require("path").join(__dirname, './resources/test-data/data-transposition-test.json');
var dataSet = utils.readJsonFile(fileLocation);
substitutedData = shifu.util.transposeData(dataSet, dataToChange);

// When using with respondwithFile (This will read the file based on url path and transpose the data)
shifu.util.respondWithFile(this, reply, {transpose: dataToChange});

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
}

```

***Note the Use of `shifu.util` to access the method `transposeData`***

---

<br>

### Kill process - killProcess()

This API allows to Kill a process with a pid

```
shifu.util.killProcess(pid, signal, callback);
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
pid | process id to kill | Yes |
signal | Signal to send (defaults to `SIGKILL` if passed undefined) | Yes |
callback | Callback function  after killprocess completes | No |

***Example***

```
var shifu = require('shifu);

shifu.util.killProcess(18222, 'SIGKILL', function () {
  console.log('Process killed);
});
```

***Note the Use of `shifu.util` to access the method `killProcess`***

---

<br>

### Read contents of a file - readFile()

This API allows to read contents of a file asynchronously

```
shifu.util.readFile(filePath, callback);
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
file path | Absolute or relative location of file | Yes |
callback | Callback function after file is read. If file is read successfully, the second argument is the file data. In case of error, the first argument is an error. Returns `promise` if callback is omitted | No |

***Example***

```
var shifu = require('shifu);

shifu.util.readFile('data.json', function (err, fileData) {
  if (err) {
    console.log('Error in reading file ', err);
  } else {
    console.log(fileData);
  }
});
```

***Note the Use of `shifu.util` to access the method `readFile`***

---

<br>

### Read contents of a file - readFileSynchronously()

This API allows to read contents of a file synchronously

```
shifu.util.readFileSynchronously(filePath);
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
file path | Absolute or relative location of file | Yes |

***Example***

```
var shifu = require('shifu);

shifu.util.readFileSynchronously('data.json');
```

***Note the Use of `shifu.util` to access the method `readFileSynchronously`***

---

<br>

### Read contents of JSON file - readJsonFile()

This API allows to read contents of a JSON file synchronously

```
shifu.util.readJsonFile(filePath);
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
file path | Absolute or relative location of JSON file | Yes |

***Example***

```
var shifu = require('shifu);

shifu.util.readJsonFile('data.json');
```

***Note the Use of `shifu.util` to access the method `readJsonFile`***

---

<br>

### Write to file - writeFile()

This API allows to write file contents to a file

```
shifu.util.writeFile(filePath, file data, callback);
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
file path | Absolute or relative location of file | Yes |
file data | contents to write | Yes |
callback | Callback function after writeFile completes | Yes |

***Example***

```
var shifu = require('shifu);

shifu.util.writeFile('hello.txt', 'hello world blah blah', function () {
  console.log('Wrote to file successfully');
});
```

***Note the Use of `shifu.util` to access the method `writeFile`***

---

<br>

### Delete file - deleteFile()

This API allows to write file contents to a file

```
shifu.util.deleteFile(filePath, callback);
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
file location | Absolute or relative location of file to delete | Yes |
callback | Callback function after deleteFile completes | Yes |

***Example***

```
var shifu = require('shifu);

shifu.util.deleteFile('filetoDelete.txt', function (err) {
  if (err) {
    console.log('Error in deleting file');
  }
});
```

***Note the Use of `shifu.util` to access the method `deleteFile`***


<br>

### Check if directory exists - checkDirectoryExists()

This API allows to check if a directory exists. Returns true if directory exists, false otherwise.

```
shifu.util.checkDirectoryExists(directoryPath);
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
directory path | Location of directory to check | Yes |

***Example***

```
var shifu = require('shifu);

shifu.util.checkDirectoryExists('/home/data');
```

***Note the Use of `shifu.util` to access the method `checkDirectoryExists`***


<br>
### Check if file exists - checkFileExists()

This API allows to check if a file exists. Returns true if file exists, false otherwise.

```
shifu.util.checkFileExists(filePath);
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
file path | Location of file to check | Yes |

***Example***

```
var shifu = require('shifu);

shifu.util.checkFileExists('/home/data');
```

***Note the Use of `shifu.util` to access the method `checkFileExists`***

---

<br>
### Set Log level - setLogLevel()
This API allows to set log level on Shifu

```
shifu.log.setLogLevel(logLevel); // when using Shifu

or

Logger.setLogLevel(logLevel); // when using Shifu-Logger
```

***The following attributes are supported:***

Attribute | Description | Required |
:--------------: | -------------- | :--------------: |
logLevel | Log level you want to set .Valid values (warn/info/debug/error) | Yes |

***Example***

```
var shifu = require('shifu);

shifu.log.setLogLevel('debug');

or

curl -X GET http://localhost:8080/shifu/api/setloglevel/debug
```

---

<br>
### Get Log level - getLogLevel()
This API allows to get the current log level on Shifu

```
shifu.log.getLogLevel(); // when using Shifu

or 

Logger.getLogLevel(); // when using Shifu-Logger
```

***Example***

```
var shifu = require('shifu);

shifu.log.getLogLevel();

or

var Logger = require('shifu-logger');
Logger.getLogLevel();

or

curl -X GET http://localhost:8080/shifu/api/getloglevel
```

---

<br>
### Reset Log level - resetLogLevel()
This API allows to reset the log level of Shifu to `info` (Default log level)

```
shifu.log.resetLogLevel();

or 

Logger.resetLogLevel();
```

***Example***

```
var shifu = require('shifu);
shifu.log.resetLogLevel();

or

var Logger = require('shifu-logger');
Logger.resetLogLevel();

or 

curl -X GET http://localhost:8080/shifu/api/resetloglevel
```

---