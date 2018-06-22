1. Update the previous mock server with the following:
    1. Update the `Hello World` variant of 'get/message' request to
        - Remove the header parameters
        - Return the file as before by using RespondWithFile without handler
    1. Update the default handler to return ONLY code 400 if the customer id is greater than 5 characters

1. Start mock server and test Step 1

1. Now add data for setMockId for `/get/message` and `/get/number` routes.
    1. Return the following for URL hit count 1 
        - /get/message
        ```json
        {
            "message" : 1
        }
        ```
    
        - /get/number
        ```json
        {
            "number" : 1
        }
        ```

    1. Return the following for URL hit count 2 

        - /get/message
        ```json
        {
            "message" : 2
        }
        ```
        - /get/number
        ```json
        {
            "number" : 2
        }
        ```

    1. Return the following for default
        - /get/message
        ```json
        {
            "message" : "Undefined"
        }
        ```
        - /get/number
        ```json
        {
            "number" : "Undefined"
        }
        ```

1. Call API to setMockId to the folder name via Shifu UI

1. Hit the rest endpoint `/get/message` and `/get/number` one time each and verify the response is `"message" : 1` and `"number" : 1` respectively.

1. Hit the rest endpoint `/get/message` and `/get/number` once more and verify the response for second hit is `"message" : 2` and `"number" : 2` respectively.

1. Hit the rest endpoint `/get/message` and `/get/number` one more time to verify that the response is `"message" : "undefined"` and `"number" : "undefined"` respectively.

1. Call ResetMockId API via Shifu UI

1. Hit the rest endpoint `/get/message` and `/get/number` once each and verify the response is based on the handler and not on SetMockId - **_You may have to add appropriate file based on the route path._**

1. Update run-mock-server-console.js to add two parallel sessions to the server.

1. Now call GetSessionId to register a session using Shifu UI.

1. Now set `Hello World` and `Hello Universe` variant for `get/message` api for the two sessions Ids respectively. 

1. Now hit the server `https://localhost:8000/sessionId/get/message` for different session Ids and verify that you get different responses as per each variant.