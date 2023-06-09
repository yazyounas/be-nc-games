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
    });
};

const fetchComments = (review_id) => {
  return db
    .query(
      "SELECT * FROM comments WHERE review_id = $1 ORDER BY created_at DESC",
      [review_id]
    )
    .then((result) => {
      return result.rows;
    });
};

const postComment = (review_id, newComment) => {
  const votes = 0;
  const { body, author } = newComment;

  return db
    .query(
      `INSERT INTO comments (author, votes, body, review_id) VALUES ($1, $2, $3, $4) RETURNING *;`,
      [author, votes, body, review_id]
    )
    .then((result) => {
      return result.rows[0];
    });
};

const updateReviewVotes = (review_id, newVotes) => {
  return db
    .query(
      `
  
    UPDATE reviews
    SET votes = votes + $1
    WHERE review_id = $2
    RETURNING *
  `,
      [newVotes, review_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, message: "ID not found" });
      }
      return result.rows[0];
    });
};

const deleteCommentById = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1`, [comment_id])
    .then((result) => {
      if (result.rowCount === 0) {
        return Promise.reject({ status: 404, message: "ID not found" });
      }
      return result.rowCount;
    });
};

const fetchUsers = (isAuthorized) => {
  return db.query(`SELECT * FROM users`).then((result) => {
    return result;
  });
};

module.exports = {
  fetchCategories,
  fetchReviewsId,
  fetchAllReviews,
  fetchComments,
  postComment,
  updateReviewVotes,
  deleteCommentById,
  fetchUsers,
};
