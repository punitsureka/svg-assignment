# **Simple Viral Games**

Simple crud app for games.

### Local Setup
1. Clone the repository
2. Run `npm install`
3. Run `npm run start:local`


### Assumptions
Took the following assumptions while developing the application:
- APIs are not secured.
- No two games can exist with the same name and url. 

### Schema
```mermaid
erDiagram
    game {
        serial id PK
        string name "NOT NULL, PUK 1"
        string url "PUK 1"
	    date published_date
	    string author
	    Boolean is_deleted "default=false"
        timestamptz created_at "NOT NULL,default=CURRENT_TIMESTAMP"
        timestamptz updated_at "NOT NULL,default=CURRENT_TIMESTAMP"
    }
	
```

### API Testing
- [CURLs](curl.md)

## Author
* [Punit Sureka](https://www.linkedin.com/in/punitsureka/)
