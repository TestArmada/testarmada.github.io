### 1. What REST APIs can be mocked?

- GET
- HEAD
- POST
- PUT
- PATCH
- DELETE
- OPTIONS

### 2. Add a route to be mocked in `endpoints.js`

```js
shifu.route({
  id: 'helloWorld',
  label: 'Hello World',
  path: '/helloWorld',
  method: 'GET',
  handler: function (req, reply) {
    reply('Hello World');
  }
});
```
**Now start mock server and hit http://localhost:8000/helloWorld**

### 3. Understanding route parameters

- id: Unique route id
- label: Description of the route
- path: Path of the route
- method: HTTP method
- handler: Function which handles the request for the path

### 4. Adding multiple routes to be mocked

```js
shifu.route({
  id: 'helloUniverse',
  label: 'Hello Universe',
  path: '/helloUniverse',
  method: 'GET',
  handler: function (req, reply) {
    reply('Hello Universe');
  }
});
```

**Now start mock server and hit http://localhost:8000/helloUniverse**

