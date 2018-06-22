1. Update the previous mock server with the following:
    1. Add a logg-in route `api/login`
    1. Add a log-out route `api/logout`
    1. Add a state variable `loggedIn` and set true/false value based on the above APIs.

1. Update the `get/message` default handler to return the message `Hello: fname lname` if user is logged in by reading from the query parameters otherwise  `Hello: Guest` is the customer Id is less than equal to 5 characters.

1. Update the `get/message` `Hello Universe` variant to modify the file to following using transpose data based on if user is logged in or logged out
    ```js
    - User Logged In
    {
        message: fname lname
    }
    
    - User Logged Out
    {
        message: Guest
    }
    ```

1. Start mock server

1. Hit `get/message` with customer id length <=5 and see you should get `Hello: Guest`

1. Set the variant to `Hello Universe`

1. Hit `get/message` with customer id length <=5 and see you should get `message: Guest`

1. Hit `api/login`

1. Set the variant to default

1. Hit http://localhost:8000/get/message/12345?fname=John&lname=Doe with customer id length <=5 and see you should get `Hello: John Doe`.

1. Set the variant to `Hello Universe`

1. Hit http://localhost:8000/get/message/12345?fname=John&lname=Doe with customer id length <=5 and see you should get `message:John Doe`

1. Hit `api/logout` and repeat 5 to 7.

1. Create and install certificates to enable HTTPS in Shifu.

1. Update run-mock-server-console.js to enable https in mock server.

1. Start mock server and navigate to https://localhost:4444/_admin and repeat 5 to 12 steps.
