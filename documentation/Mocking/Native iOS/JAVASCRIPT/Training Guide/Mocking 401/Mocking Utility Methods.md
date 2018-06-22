### 1. RespondWithFile Utility
```js
shifu.route({
  id: 'message',
  label: 'hello message',
  path: '/message',
 
  handler: function(req, reply) {
    shifu.util.respondWithFile(this, reply);
  }
})
```

1. Setting Code
    ```js
    shifu.route({
        id: 'message',
        label: 'hello message',
        path: '/message',
 
        handler: function(req, reply) {
            shifu.util.respondWithFile(this, reply, {code: 400});
        }
    })
    ```

1. Custom File Location
    ```js
    shifu.route({
        id: 'message',
        label: 'hello message',
        path: '/message',
 
        handler: function(req, reply) {
            shifu.util.respondWithFile(this, reply, {code: 400, filePath: '../mocked-data/fileName.json'});
        }
    })
    ```

1. Setting Headers
    ```js
    shifu.route({
    id: 'message',
    label: 'hello message',
    path: '/message',
    
    handler: function(req, reply) {
        var myHeaders = {
            header1: 'test1',
            header2: 'test2',
            header3: true
        };
        shifu.util.respondWithFile(this, reply, {code: 400, filePath: '../mocked-data/fileName.json', headers: myHeaders});
    }
    });
    ```

1. Setting Cookies
    ```js
    shifu.route({
    id: 'message',
    label: 'hello message',
    path: '/message',
    
    handler: function(req, reply) {
        var myHeaders = {
            header1: 'test1',
            header2: 'test2',
            header3: true
        };
    
        var cookies = [
            {name: 'com.wm.customer', value: 'vz7.0b5c56'},
            {name: 'CID', value: 'SmockedCID', options: {domain: 'domain', path: '/'}},
            {name: 'anotherCookie', value: 'cookieValue'}
        ];
        shifu.util.respondWithFile(this, reply, {code: 400, filePath: '../mocked-data/fileName.json', headers: myHeaders, cookies: cookies});
    }
    });
    ```
    
1. Setting Delay
    ```js
    shifu.route({
        id: 'message',
        label: 'hello message',
        path: '/message',
        handler: function(req, reply) {
            var myHeaders = {
                header1: 'test1',
                header2: 'test2',
                header3: true
            };
            var cookies = [
                {name: 'com.wm.customer', value: 'vz7.0b5c56'},
                {name: 'CID', value: 'SmockedCID', options: {domain: 'domain', path: '/'}},
                {name: 'anotherCookie', value: 'cookieValue'}
            ];
            shifu.util.respondWithFile(this, reply, {code: 400, filePath: '../mocked-data/fileName.json', headers: myHeaders, cookies: cookies, delay: 1000});
        }
    });
    ```

1. Modifying Static JSON response

    If you have many variants for a REST end point and the mocked data for all variants can use the same JSON response with few changes to the values, than this feature is what you need. This feature allows you to dynamically change a JSON file before sending the response back from the mock server for the request. It removes the need of having one to one mapping of static JSON files with each variants. 
 
    ```json
    // Static Response JSON File
    {
        "id": "1234",
        "name": "toothpaste",
        "details": [
            {
                "flavor": "Mint 1",
                "Size": "10",
                "Size_Type": "ounce"
            },
            {
                "flavor": "Mint",
                "Size": "10",
                "Size_Type": "ounce"
            }
        ]
    }
    ```

    ```js
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
    ```

    ```json
    // Dynamic Response JSON File returned from Mock service

    {
        "id": "7777",
        "name": "toothpaste",
        "details": [
            {
                "flavor": "Mint 1",
                "Size": "10",
                "Size_Type": "ounce"
            },
            {
                "flavor": "Mint 2",
                "Size": "10",
                "Size_Type": "ounce"
            }
        ]
    }
    ```

### 2. Logging utility
Shifu exposes a logging utility which can be used to log data 

```js
shifu.log.debug('This is debug Message');
shifu.log.info('This is info Message');
shifu.log.error('This is error Message');
shifu.log.warn('This is warn Message');
shifu.log.setLogLevel('debug');
shifu.log.getLogLevel();
shifu.log.resetLogLevel();
// default level is INFO
```

### 3. Responding with a specific variant in handlers (respondWithMockVariant)

This function will respond with a variant on the main route handler. The `variant` passed in MUST be the variant on existing route. 
```js
shifu.util.respondWithMockVariant(this, 'variant', reply);
```

The `variant` passed in MUST be the variant on existing route. 
```js
shifu.route({
    id: 'respondWithVariant',
    label: 'Respond With Variant',
    path: '/respondWithVariant',
    variantLabel: 'Respond With Variant Main Route',
    handler: function (req, reply) {
        shifu.util.respondWithMockVariant(this, 'variant', reply); // make sure that the variant exist in the same route.
    }
})
.variant({
    id: 'variant',
    label: 'Respond With Variant Variant Route',
    handler: function (req, reply) {
        reply({'message': 'I am an example of respond_with_mock_variant instead of response of main route '});
    }
});
```

### 4. GetUrlCount
To get URL count for all Rest APIs mocked by mock server 
```js
Shifu API : shifu.getURLCount("default");
```

### 5. ResetUrlCount
To resets URL count to zero
```js
Shifu API : shifu.resetURLCount("default");
```
