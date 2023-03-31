const {
  fetchCategories,
  fetchReviewsId,
  fetchAllReviews,
  fetchComments,
  postComment,
} = require("../models/fetchCategories.model");

exports.getCategories = (req, res) => {
  fetchCategories().then(({ rows }) => {
    res.status(200).send({ categories: rows });
  });
};

exports.getReviewsId = (req, res, next) => {
  const { review_id } = req.params;

  fetchReviewsId(review_id)
    .then(({ rows }) => {
      res.status(200).send({ reviews: rows[0] });
    })
    .catch((err) => {
      if (err.status === 404) {
        res.status(404).send({ message: "review not found" });
      } else {
        next(err);
      }
    });
};
exports.getReviewsCount = (req, res, next) => {
  fetchAllReviews().then(({ rows }) => {
    res.status(200).send({ reviews: rows });
  });
};

exports.getReviewComments = (req, res, next) => {
  const { review_id } = req.params;
  fetchComments(review_id)
    .then((rows) => {
      res.status(200).send({ comments: rows });
    })
    .catch((err) => {
      next(err);
    });
};
exports.postReviewComments = (req, res, next) => {
  const { review_id } = req.params;
  const newComment = req.body;

  postComment(review_id, newComment)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
