const express = require("express");
const app = express();
const {
  getCategories,
  getReviewsId,
  getReviewsCount,
  getReviewComments,
  postReviewComments,
  updateVotes,
  deleteComment,
} = require("./controllers/getCategories.controller");
const {
  invalidPath,
  errorHandler,
  handlePSQL400s,
  handle500,
  handlePSQL404,
  handleSQL400,
} = require("./errors.js");
app.use(express.json());
app.get("/api", (req, res) => {
  res.status(200).send({ message: "all okay" });
});
app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewsId);
app.get("/api/reviews", getReviewsCount);
app.get("/api/reviews/:review_id/comments", getReviewComments);
app.post("/api/reviews/:review_id/comments", postReviewComments);
app.patch('/api/reviews/:review_id', updateVotes)
app.delete('/api/comments/:comment_id', deleteComment)

app.all("/*", invalidPath);
app.use(handlePSQL400s);
app.use(handlePSQL404);
app.use(handleSQL400);

app.use(errorHandler);
app.use(handle500);

module.exports = app;


// comment_id: 1,
// body: 'I loved this game too!',
// review_id: 2,
// author: 'bainesface',
// votes: 16,
// created_at: '2017-11-22T12:43:33.389Z'
