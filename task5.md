## Endpoint

## GET /api/reviews/:review_id/comments

Returns an array of comments for the given review_id with the most recent comments first. Each comment object should have the following properties:

- comment_id
- votes
- created_at
- author
- body
- review_id

## Errors
The following errors may be returned by the API:

1. 404 Not Found - when the requested endpoint or resource is not found
1. 400 Bad Request - when a request is malformed or missing required parameters
1. 500 Internal Server Error - when there is an error processing the request on the server side