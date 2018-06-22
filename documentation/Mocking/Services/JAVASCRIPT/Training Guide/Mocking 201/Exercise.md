### 1. Update the previous mock server with the following

a. Update the route `/get/message` to a dynamic URL which takes `customer id` as a parameter.

b. Update the 'Hello World' variant to 
    - return the following file with auto file location calculation.
    ```json
    {
        "message" : "Hello World"
    }
    ```
    - Set the following header params in response 
    ```
    {
        fname: John
        lname: Doe
    }
    ```
1. Update the `Hello Universe` variant
    - to return the following file and the file location should be hard coded.
    ```json
    {
        "message" : "Hello Universe"
    }
    ```
    - Set the following cookie params in response
    ```
    {
        customerId: 123456
    }
    ```
1. Update the default handler to do the following:
    - Add reading of query parameter 'fname' and 'lname' from the request.
    - If the customer id is greater than 5 characters 
        - return 'invalid id' as response
    - If the customer id is less than or equal to 5 characters 
        - return following response from the handler (**NOT** Using The File)
            > Hello - fname lname
1. Add a `POST` route `/set/customerId` and in default handler read the payload value and log it on console. 
```json
{
    "customerid": 123456
}
```

### 2. Start mock server
1. Make a REST call to `/get/message` with customer id greater than 5 characters and check the response is `Invalid Id`
1. Make a REST call to `/get/message` with customer id equal to 5 characters and check the response to be `Hello undefined undefined`
1. Make a REST call to `http://localhost:8000/get/message/12345?fname=John&lname=Doe` and check the response to be `Hello John Doe`
1. Switch to `Hello World` variant and check the response is `"message" : "Hello World"` and use dev tools on Chrome browser to verify that the header params are set (fname: John and lname: Doe)
1. Switch to `Hello Universe` variant and check the response is `"message" : "Hello Universe"` and use dev tools on Chrome browser to verify that the cookie is set (customerId: `123456`)
1. Make a post call to mock server at `http://localhost:8000/set/customerId` using Postman (or any other HTTP client) with the following data and verify that `12345` is logged on the console
```json
{
 "customerId" : 12345
}
```
