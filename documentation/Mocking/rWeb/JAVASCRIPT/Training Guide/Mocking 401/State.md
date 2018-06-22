### 1. What is state?
State allows you to maintain state of your server, for example if a user is logged in or logged out. The mock server internally uses `Hapi` node server, which helps you return the state of the current application state. Within any response handler, use `this.state('varName')` to access an object stored in the state and this.state`('varName', 'varValue')` where varValue can be any type of object you want to set the state.

### 2. How to set a state in mock server?
```js
shifu.route({
  path: '/api/login',
  label: 'LogIn',
  method: 'POST',
  handler: function(request, reply) {
    // now you can use this.state('loggedIn') in any route handler to see if the user has logged in
    this.state('loggedIn', true);
    reply().code(204);
  }
});
```