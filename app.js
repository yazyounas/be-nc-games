const express = require("express");
const cors = require('cors');
const app = express();
const {
  getCategories,
  getReviewsId,
  getReviewsCount,
  getReviewComments,
  postReviewComments,
  updateVotes,
  deleteComment,
  getUsers,
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
app.use(cors());
app.get("/api", (req, res) => {
  res.status(200).send({ message: "all okay" });
});
app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewsId);
app.get("/api/reviews", getReviewsCount);
app.get("/api/reviews/:review_id/comments", getReviewComments);
app.post("/api/reviews/:review_id/comments", postReviewComments);
app.patch("/api/reviews/:review_id", updateVotes);
app.delete("/api/comments/:comment_id", deleteComment);
app.get("/api/users", getUsers);

app.all("/*", invalidPath);
app.use(handlePSQL400s);
app.use(handlePSQL404);
app.use(handleSQL400);

app.use(errorHandler);
app.use(handle500);

module.exports = app;
