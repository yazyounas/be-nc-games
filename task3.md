## Endpoint

## GET /reviews/:review_id
Returns a review object with the following properties:

- review_id
- title
- review_body
- designer
- review_img_url
- votes
- category
- owner
- created_at
- Example response:

## Errors

The following errors may be returned by the API:

1. 404 Not Found - when the requested endpoint or resource is not found
2. 400 Bad Request - when a request is malformed or missing required parameters
3. 500 Internal Server Error - when there is an error processing the request on the server side
