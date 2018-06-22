### 1. How to create dynamic urls

```
/get/customerInfo/{customerid}/{zipcode}
```

### 2. Adding a dynamic URL in mock server

``` js
shifu.route({
  id: 'customerInfo',
  label: 'Customer Info',
  path: '/get/customerInfo/{customerid}',
  method: 'GET',
  variantLabel: 'Get Customer Info',
  handler: function (req, reply) {
    reply('How to read the customer id :(');
  }
});
```

### 3. Reading dynamic URL parameters

```js
var id = req.params.customerid;
```

### 4. Using dynamic values to define response

```js
shifu.route({
  id: 'customerInfo',
  label: 'Customer Info',
  path: '/get/customerInfo/{customerid}',
  method: 'GET',
  variantLabel: 'Get Customer Info',
  handler: function (req, reply) {
    var id = req.params.customerid;
    reply('Customer id is ' + id + ' :)');
  }
});
```

### 5. Passing dynamic URL parameters from the Shifu UI 

Try to pass dynamic url parameters generated from Shifu UI