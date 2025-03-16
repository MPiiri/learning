sequenceDiagram
    participant browser
    participant server

    browser->>server: GET app

    server-->>browser: GET html

    browser->>server: GET css

    browser->>server: GET js

    browser->>server: GET data
