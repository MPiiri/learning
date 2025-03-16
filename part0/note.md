```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST Message

    browser->>server: GET html

    browser->>server: GET css

    browser->>server: GET js

    browser->>server: GET data
```

