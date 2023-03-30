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
const fetchComments = (review_id) => {
  return db.query("SELECT * FROM comments WHERE review_id = $1 ORDER BY created_at DESC", [review_id])
    .then((result) => {
      return result.rows;
    });
    
};

module.exports = { fetchCategories, fetchReviewsId, fetchComments };
