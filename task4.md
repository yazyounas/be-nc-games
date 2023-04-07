

## Endpoint GET /api/reviews
This endpoint returns an array of review objects, each of which has the following properties:

- owner: The owner of the review.
- title: The title of the review.
- review_id: The ID of the review.
- category: The category of the review.
- review_img_url: The URL of the review image.
- created_at: The date and time when the review was created.
- votes: The number of votes the review has received.
- designer: The designer of the product being reviewed.
- comment_count: The total count of all the comments with this review_id.

 The reviews are sorted by date in descending order.
 
## Errors
The following errors may be returned by the API:

1. 404 Not Found: When the requested endpoint or resource is not found.
2. 400 Bad Request: When a request is malformed or missing required parameters.
3. 500 Internal Server Error: When there is an error processing the request on the server side.