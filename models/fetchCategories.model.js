const db = require("../db/connection");

const fetchCategories = () => {
  return db.query("SELECT * FROM categories").then((rows) => {
    return rows;
  });
};
const fetchReviewsId = (review_id) => {
  return db
    .query("SELECT * From reviews WHERE review_id = $1", [review_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, message: "review not found" });
      }
      return result;
    });
};

const fetchAllReviews = () => {
  return db
    .query(
      `SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer, COUNT(comments.comment_id) AS comment_count
  FROM reviews
  LEFT JOIN comments ON reviews.review_id = comments.review_id
  GROUP BY reviews.review_id
  ORDER BY reviews.created_at DESC;
`
    )
    .then((rows) => {
      return rows;
    })
    .catch((err) => console.log('this is an err', err))
};

module.exports = { fetchCategories, fetchReviewsId, fetchAllReviews };
