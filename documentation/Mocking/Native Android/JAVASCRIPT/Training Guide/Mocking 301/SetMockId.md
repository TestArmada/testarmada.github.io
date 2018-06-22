### 1. What is SetMockId
This feature is very handy when you want to stub all the endpoints for a particular test without manually writing the paths for those endpoints. Generally applicable in scenarios where one page calls different endpoints according to test flows. You do not need to set variant or create variants for these endpoints. You will need to manually store the stubbed JSON files in the file structure location which are specified by your endpoints. The endpoints responses can be captured and stored under mocked data directory as a one time setup.

### 2. How SetMockId works?

**Scenario**

Lets say your test case requires to mock two end points `/api/message` and `/api/product/getStatus`. These endpoints are called three times each. For the first end point you always want to return the same data (in json) while for the second endpoint you want to return the same data for the first and third call (in html) and a different data for the second call (in html).

**Implementation**

 Create a folder under the mocked-data of your test directory (*this folder name is configurable when you start your mock server by passing mockedDirectory option*) by the name `test1`. Under this folder add the following files for your mocked response.

- `api-message-GET.json` - This will be returned for all the calls for the first endpoint with default response code 200
- `api-product-getStatus-GET.html` - This will be returned for all the calls for the second endpoint with default response code 200, except for the second and third call as it has its own file
- `api-product-getStatus-GET-2.html` - This will be returned for the second call for the second endpoint with default response code 200
- `api-product-getStatus-GET-3-code-201.html` - This will be returned for the third call for the second endpoint with response code 201

> Now set the setMockId either by mock api, UI or rest call to set to `test1`

**Explanation**
The underlying mock service automatically figures out the file extension so that you do not have to specify it. If you have the same file with multiple file extension than the following order is used: 
- JSON
- HTML
- TXT
- First file encountered of any other extension 

> Once the `shifu.setMockId(“test1”)` API is called, Shifu only looks for the responses under the test1 folder. If it does not find the response, it will return 404 with the file name that it did not find. Shifu internally keeps track of the number of times each individual endpoint is called after `client.setMockId(“test1”)` API is called and first looks for the file with count specific name such as `api-message-GET-1.json`, if it does not find the said file then it looks for the default file which is `api-message-GET.json`.

### 3. Good To Know

 If setMockId is set, then custom file path in handler
```js
shifu.util.respondWithFile(this, reply, {filePath: ‘./message/GET/default.json’});
```

and file based on URL path `./mocked-data/api/message/get/default.json` are ignored for the mocked response. Here is the order followed for file lookup:
- SetMockId
- Custom File Path for default or variants endpoints.
- File based on URL Path for default or variants endpoints.

> SetMockId does not work with in-line Handler
```js
shifu.route({
  id: 'message',
  label: 'Message',
  path: '/get/message/{customerid}',
  method: 'GET',
  variantLabel: 'Hello',
  handler: function (req, reply) {
    var lname = req.query.lname;
    var fname = req.query.fname;
    var customerid = req.params.customerid;
    if (customerid.length > 5) {
      reply().code(400);
    } else {
      reply('Hello ' + fname + " " + lname);
    }
  }
})
```