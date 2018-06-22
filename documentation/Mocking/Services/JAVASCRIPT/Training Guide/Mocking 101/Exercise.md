### 1. Create mock server with the following

1. Add a `GET` route `/get/message` with default variant returning `Hello` 
    - Add a variant that returns "Hello World"
    - Add another variant that returns "Hello Universe"
1. Add another `GET` route `/get/numbers` with default variant returning incremental values starting from 1
    - Add a variant that returns even number starting from 2 in increments
    - Add another variant to return odd numbers starting from 1 in increments

### 2. Start mock server

1. Make a REST call to `/get/message` and verify default variant returns 'Hello'
    - Switch back and forth to other two variants and verify that you see 'Hello World' and 'Hello Universe' message respectively.
1. Make a REST call to `/get/numbers` and verify default variant returns numbers in incremental order
    - Switch back and forth to other two variants and verify that you see even and odd numbers in incremental order respectively.