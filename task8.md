## Endpoint 
## DELETE /api/comments/:comment_id
This endpoint is used to delete a comment with the given comment_id.

## Request
- Method: DELETE
- URL path: /api/comments/:comment_id


## Response
- Status code: 204 No Content

## Errors
The following errors may be returned by the API:

1. 404 Not Found - when the requested comment_id or endpoint is not found
2. 400 Bad Request - when a request is malformed or missing required parameters
3. 500 Internal Server Error - when there is an error processing the request on the server side




