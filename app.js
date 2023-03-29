const express = require("express");
const app = express();
const {
  getCategories,
  getReviewsId,
} = require("./controllers/getCategories.controller");
const { invalidPath, errorHandler, handlePSQL400s } = require("./errors.js");

app.get("/api", (req, res) => {
  res.status(200).send({ message: "all okay" });
});
app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewsId);
app.get("api/reviews");

app.use(handlePSQL400s);
app.use(errorHandler);

app.all("/*", invalidPath);

module.exports = app;
