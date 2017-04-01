# TRY OUT 01 


## GRAPHQL

### Data Schema

The schema for this project is about articles. It should contain title, content and author.
So this is the JSON schema that reflect this scenario:

```json
article = {
    id: Int,
    title: String,
    content: String,
    author: String
}
``` 
### How to run the project

### Run the server

- in the terminal, change dir into graphql directory
    ```
        cd graphql
    ```
- run npm install
    ```
        npm install
    ```
- Run it! this project use babel to transpile ES6 code to ES5
don't directly run it via **node** command. so use npm start instead:  
    ```
        npm start
    ```