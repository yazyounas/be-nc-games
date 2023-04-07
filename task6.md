## Endpoint

## POST /api/reviews/:review_id/comments
Creates a new comment on the given review_id. The request body should be an object with the following properties:

- username
- body

## Errors

The following errors may be returned by the API:

1. 404 Not Found - when the requested endpoint or resource is not found
2. 400 Bad Request - when a request is malformed or missing required parameters
3. 500 Internal Server Error - when there is an error processing the request on the server side