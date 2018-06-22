### 1. What are variants?

Variants allows to return a different data set for a given mocked route. Variants can be selected in the admin UI to determine what type of response a route should have. Routes are defined using the variant method on the Route object (returned by calling the route method). An object parameter is provided with the following attributes
- id: the variant id - used for the RESTful admin API and profile settings
- label: (optional) the variant label - used for display on the admin panel
- handler: (optional) the HAPI route handler which provides the route response

Variants are useful because they allow you to test multiple scenarios that can happen with your route. Say, for example, you have a route exposing the ability to update a password. You might have several exceptional scenarios that you would want to test out (each could be a variant that you simply select to tell the route handler to use the appropriate response)
- the password was reset successfully
- the password didn't pass validation
- the old password wasn't entered correctly
- the username doesn't exist
- and so on...

### 2. Default Handler

The handler defined under route is the default handler 

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

### 3. Creating a variant

``` js
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
});
```

  ### 4. Selecting a different variant to be returned from UI

  You can select a different variant from admin UI to determine what type of response a route should have.

  ### 5. Adding more variants

```js
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
    id: 'helloUniverse',
    label: 'Hello Universe',
    handler: function (req, reply) {
        reply('Hello Universe');
    }
});
```