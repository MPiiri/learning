sequenceDiagram
    participant browser
    participant server

    browser->>server: POST message
    
    server->>browser: Get content