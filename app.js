const express = require("express");
const app = express();
const {
  getCategories,
  getReviewsId,
  getReviewsCount,
  getReviewComments,
  postReviewComments,
  
} = require("./controllers/getCategories.controller");
const {
  invalidPath,
  errorHandler,
  handlePSQL400s,
  handle500,
  handlePSQL404,
  handleAuthorNotFoundError,
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

app.all("/*", invalidPath);
app.use(handlePSQL400s);
app.use(handleAuthorNotFoundError);
app.use(handlePSQL404);
app.use(handleSQL400 )
app.use(errorHandler);
app.use(handle500);

module.exports = app;
