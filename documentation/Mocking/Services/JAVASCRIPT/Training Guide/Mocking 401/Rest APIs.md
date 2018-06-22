### 1. Set Variant

```js
Method    : POST
Syntax    : {host}:{port}/_admin/api/route/{routeId}
Rest API  : curl -H "Content-Type: application/json" -X POST -d '{"variant":"preorder"}' http://localhost:8000/_admin/api/route/getCollection?returnConfig=true
shifu.route({
    id: 'getCollection',
    label: 'Get Collection',
    path: '/product/grouping/api/collection/{collectionId}',
 
    variantLabel: 'default',
    handler: function(req, reply) {
        var response = getResponseData('/product/grouping/api/collection', 'default');
        reply(response);
    }
})
.variant({
    id: 'preorder',
    label: 'Get Pre-order Collection',
    handler: function (req, reply) {
        reply({message: 'hello pre-order'});
    }
});
```
> To get the config back as a response, add query parameter `returnConfig=true` as shown in example above

### 2. Set Mock Id

```
Method    : GET
Syntax    : {host}:{port}/_admin/api/shifu/setMockId/{mockid}/{sessionid}
Rest API  : curl http://localhost:8000/_admin/api/shifu/setMockId/1234/default
```

### 3. Get Mock Id

```
Method    : GET
Syntax    : {host}:{port}/_admin/api/shifu/getMockId/{sessionid}
Rest API  : curl http://localhost:8000/_admin/api/shifu/getMockId/default
```

### 4. Reset Mock Id

```
Method    : GET
Syntax    : {host}:{port}/_admin/api/shifu/resetMockId/{sessionid}
Rest API  : curl http://localhost:8000/_admin/api/shifu/resetMockId/default
```

### 5. Get Url Count

```
Method    : GET
Syntax    : {host}:{port}/_admin/api/shifu/getURLCount/{sessionid}
Rest API  : curl http://localhost:8000/_admin/api/shifu/getURLCount/default
```

### 6. Reset Url Count

```
Method    : GET
Syntax    : {host}:{port}/_admin/api/shifu/resetURLCount/{sessionid}
Rest API  : curl http://localhost:8000/_admin/api/shifu/resetURLCount/default
```

### 7. Re-set the state of Mock Server

```
Method    : POST
Syntax    : {host}:{port}/_admin/api/state/reset
Rest API  : curl -X POST http://localhost:8000/_admin/api/state/reset
```

### 8. Register Session

```
Method    : GET
Syntax    : {host}:{port}/_admin/api/shifu/registerSession
Rest API  : curl http://localhost:8000/_admin/api/shifu/registerSession
```

### 9. Get Sessions
```
Method    : GET
Syntax    : {host}:{port}/_admin/api/shifu/getSessions
Rest API  : curl http://localhost:8000/_admin/api/shifu/getSessions
```

### 10. Check Session
```
Method    : GET
Syntax    : {host}:{port}/_admin/api/shifu/checkSession/{sessionid}
Rest API  : curl http://localhost:8000/_admin/api/shifu/checkSession/{sessionid}
```

### 11. Close Session
```
Method    : GET
Syntax    : {host}:{port}/_admin/api/shifu/closeSession/{sessionid}
Rest API  : curl http://localhost:8000/_admin/api/shifu/closeSession/{sessionid}
```