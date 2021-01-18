# REST API example application

REST API built for the [G2I code challenge](https://gist.github.com/TejasQ/686e08eeab91f78ea2d946d7766a508c).
This API is built for uses the following the data for the `World Texting Foundation`, also known as `WTF`.
It enables users to access and manupilate acronyms stored in the data base in variety of ways.

## Install

    npm install
## URL

### Local Development
    http://localhost:8282

### Production
    https://g2i-rest-api.vercel.app/

## Run the API
### Production Build
    npm run production 
### Development Build with Hot Reloading
    npm run dev
# REST API

The REST API to the example app is described below.

## Search for a term with optional pagination

### Request

`GET /acronym?from=:from&limit=:limit&search=:seach`

### Sample Call 

```javascript
    $.ajax({
      url: "/acronym/acronym?from=50&limit=10&search=what",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

### Query Parameters 

* **Required:**
 
   `search=[string]`

* **Optional:**
 
    `from=[number]`
    `limit=[number]`

### Successful Response
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Credentials: true
    Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
    Access-Control-Expose-Headers: Content-Length
    Access-Control-Allow-Headers: Accept, Authorization, Content-Type, X-Requested-With, Range
    More-Acronyms-Available: true | false
    Content-Type: application/json; charset=utf-8
    Content-Length: 5602
    ETag: W/"15e2-NHhx5hUVUB4vbofS+3dV94Po3Jk"
    Date: Mon, 18 Jan 2021 16:26:44 GMT
    Connection: close

    {
        "acronyms": [
            {
                "_id": "6003893ab710e5d02532af6a",
                "acronym": ";S",
                "meaning": "Gentle warning, like 'Hmm? What did you say?'",
                "__v": 0,
                "id": "6003893ab710e5d02532af6a"
            },
            {
                "_id": "6003893ab710e5d02532b053",
                "acronym": "BFFLNMW",
                "meaning": "Best friends for life, no matter what",
                "__v": 0,
                "id": "6003893ab710e5d02532b053"
            },
            .
            .
            .
        ]
        "moreAcronymsAvailable": true | false
    }
### No Results Found Response
    HTTP/1.1 204 No Content
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Credentials: true
    Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
    Access-Control-Expose-Headers: Content-Length
    Access-Control-Allow-Headers: Accept, Authorization, Content-Type, X-Requested-With, Range
    Date: Mon, 18 Jan 2021 16:35:33 GMT
    Connection: close
=
### Server Error Response
    HTTP/1.1 503 Server Error
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Credentials: true
    Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
    Access-Control-Expose-Headers: Content-Length
    Access-Control-Allow-Headers: Accept, Authorization, Content-Type, X-Requested-With, Range
    Date: Mon, 18 Jan 2021 16:35:33 GMT
    Connection: close


-------
rest of the documentaion is coming soon, stay tuned