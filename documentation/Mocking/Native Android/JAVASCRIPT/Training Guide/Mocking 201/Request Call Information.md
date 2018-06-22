### 1. Query Parameters

Let's say you go to the following URL: http://localhost:8000/get/customerInfo/12345?ctype=new . To read the query parameter, do the following:

```js
var ctype = req.query.ctype;
```
> To run the above scenario, hit the following in any browser with Shifu server running: http://localhost:8000/get/customerInfo/12345?ctype=new after updating the route to
```js
shifu.route({
  id: 'customerInfo',
  label: 'Customer Info',
  path: '/get/customerInfo/{customerid}',
  method: 'GET',
  variantLabel: 'Get Customer Info',
  handler: function (req, reply) {
    var id = req.params.customerid;
    var ctype = req.query.ctype;
    var replyString = 'Customer Type: ' + ctype + ' customer id: ' + id;
    reply(replyString);
  }
});
```

### 2. Header information

Let's say there is a header parameter 'name' with value 'John' is passed with the request. To read the testHeader parameter, do the following: 

```js
var req = req.raw.req;
var name = req.headers.name;
```

> To run the above scenario, use postman to make the following get call: http://localhost:8000/get/customerInfo/12345?ctype=new and add header 'name' with value 'John' after updating the route to

```js
shifu.route({
  id: 'customerInfo',
  label: 'Customer Info',
  path: '/get/customerInfo/{customerid}',
  method: 'GET',
  variantLabel: 'Get Customer Info',
  handler: function (req, reply) {
    var id = req.params.customerid;
    var ctype = req.query.ctype;
    var req = req.raw.req;
    var name = req.headers.name;
    var replyString = 'Customer Type: ' + ctype + ' customer id: ' + id + ' nameFromHeader: ' + name;
    reply(replyString);
  }
});
```

### 3. Payload

The payload can be read using the following code: 

```js
//fname would be "Bob" if the posted body content (as JSON) was {"fname": "Bob"}
var fname = req.payload.fname;
```

> To run the above scenario, use postman to make the following POST call: http://localhost:8000/payload and add payload `{"fname": "Bob"} ` in the request.
```js
shifu.route({
  id: 'payload',
  label: 'Reading Payload',
  path: '/payload',
  method: 'POST',
  variantLabel: 'Payload',
  handler: function (req, reply) {
    var fname = req.payload.fname;
    reply(fname);
  }
});
```

### 4. Content Types

The mock module is independent of content-types i.e. user can set any content type and mocking route is intercepted only based on the path defined in the mocked routes file.