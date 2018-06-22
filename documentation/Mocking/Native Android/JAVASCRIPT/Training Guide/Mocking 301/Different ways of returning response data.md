### 1. Returning only the code
 
 ```js
 shifu.route({
  id: 'message',
  label: 'hello message',
  path: '/message',
  handler: function(req, reply) {
    reply().code(400);
  }
})
```

### 2. Using `RespondWithFile` without handler

```js
shifu.route({
  path: '/api/customer/getId',
  label: 'Get Customer Id',
  method: 'GET',
 }).respondWithFile();
```

### 3. Returning static mocked data with a response code

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