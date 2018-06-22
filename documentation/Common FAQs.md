## Functional Testing: I’m having npm install failure, what should I do?

Please make sure that you’re using compatible node and npm. Check versions by node -v and npm -v

## Functional Testing: Which magellan command should I use to launch my test?

Please read magellan help by ./node_modules/.bin/magellan –help first. If you cannot find what you want there, or if you’re still not sure, please reach out to us

## Functional Testing: Why my test passes in one browser but fails in another one?

There are couple of things can impact the test results. Page rendering speed, css selector compatibility, viewport size or even the way element’s being rendered. However in most cases the descrepancy is because we’re not really simulating user behaviors in the test. For instance, please make sure your code is not clicking on an element that is not in the viewport.

## Mocking: How To Read Dynamic URLs In Request?

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

## Mocking: How To Read Query Parameters In Request?

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

## Mocking: How To Set CORS Headers?

The [Cross-Origin Resource Sharing](https://www.w3.org/TR/cors/) protocol allows browsers to make cross-origin API calls. CORS is required by web application running inside a browser which are loaded from a different domain than the API server. CORS headers are disabled by default. To enable, set `cors` to true, or to an object with the following options:

| Option | Description |
| ------- | :-----------: |
| origin | a string array of allowed origin servers `Access-Control-Allow-Origin`. Defaults to any origin ['*'] |
| maxAge | number of seconds the browser should cache the CORS response ('Access-Control-Max-Age'). The greater the value, the longer it will take before the browser checks for changes in policy. Defaults to 86400 (one day). |
| headers | string array of allowed headers `Access-Control-Allow-Headers`. Defaults to `['Authorization', 'Content-Type', 'If-None-Match']`. |
| additionalHeaders | string array of additional headers to headers. Use this to keep the default headers in place. |
| methods | string array of allowed HTTP methods Access-Control-Allow-Methods. Defaults to `['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS']` |
| additionalMethods | string array of additional methods to methods. Use this to keep the default methods in place |
| exposedHeaders | string array of exposed headers Access-Control-Expose-Headers. Defaults to `['WWW-Authenticate', 'Server-Authorization'` |
| additionalExposedHeaders | a string array of additional headers to exposedHeaders. Use this to keep the default headers in place. |
| credentials | if true, allows user credentials to be sent Access-Control-Allow-Credentials. Defaults to false. |


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
