### 1. Set custom headers

``` js
shifu.route({
  id: 'header',
  label: 'Custom Headers',
  path: '/set/headers',
  handler: function(req, reply) {
  reply({message: 'custom headers'})
    .header('header1', 'test1')
    .header('header2', 'test2')
    .header('header3', 'test3')
  }
})
 
shifu.route({
  id: 'header',
  label: 'Custom Headers',
  path: '/set/headers',
  handler: function (req, reply) {
    var myHeaders = {
      header1: 'test1',
      header2: 'test2',
      header3: true
    };
    shifu.util.respondWithFile(this, reply, {headers: myHeaders});
  }
});
```

### 2. Set custom cookies

```js
shifu.route({
  id: 'cookies',
  label: 'Custom Cookies',
  path: '/set/cookies',
  handler: function(req, reply) {
    reply({message: 'test'})
    .state('cookie1', 'testCookie1')
    .state('cookie2', 'testCookie2')
    }
});
 
shifu.route({
  id: 'cookies',
  label: 'Custom Cookies',
  path: '/set/cookies',
  handler: function (req, reply) {
    var cookies = [
      {name: 'cookie1', value: 'testCookie1'},
      {name: 'cookie2', value: 'testCookie2'},
    ];
    shifu.util.respondWithFile(this, reply, {cookies: cookies});
  }
});
```

### 3. Set CORS headers

```js
var corsHeaders = {
  origin: ['*'],
  headers: ["Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"],
  credentials: true,
}
 
// Items
shifu.route({
  id: 'corsheaders',
  label: 'CORS',
  path: '/set/cors',
 
  config: {
    cors: corsHeaders
  },
  handler: function(req, reply) {
    reply('cors headers set');
  }
});
```