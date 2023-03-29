const express = require("express");
const app = express();
const {
  getCategories,
  getReviewsId,
  getReviewsCount,
} = require("./controllers/getCategories.controller");
const {
  invalidPath,
  errorHandler,
  handlePSQL400s,
  handle500,
} = require("./errors.js");

app.get("/api", (req, res) => {
  res.status(200).send({ message: "all okay" });
});
app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewsId);
app.get("/api/reviews", getReviewsCount);

app.all("/*", invalidPath);
app.use(handlePSQL400s);
app.use(errorHandler);
app.use(handle500);

module.exports = app;
