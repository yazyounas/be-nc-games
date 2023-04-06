const db = require("../db/connection");
const app = require("../app");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const sorted = require("jest-sorted");
const { toString } = require("../db/data/test-data/categories");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  if (db.end) db.end();
});
describe("GET", () => {
  it("should get 200 if respond with the message are all ok", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.message).toBe("all okay");
      });
  });
  it("should return an array of category objects with slug and description properties", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        const { categories } = body;
        expect(Array.isArray(categories)).toBe(true);
        expect(categories.length).toBeGreaterThan(0);
        categories.forEach((category) => {
          expect(category).toHaveProperty("slug", expect.any(String));
          expect(category).toHaveProperty("description", expect.any(String));
        });
      });
  });
  it("returns a 404 error if the category does not exist", () => {
    return request(app)
      .get("/api/banana")
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe("End point does not exist");
      });
  });
});

describe("GET", () => {
  it("should responds with a review object with expected properties", () => {
    return request(app)
      .get(`/api/reviews/1`)
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;

        expect(reviews).toHaveProperty("review_id", 1);
        expect(reviews).toHaveProperty("title", "Agricola");
        expect(reviews).toHaveProperty("review_body", "Farmyard fun!");
        expect(reviews).toHaveProperty("designer", "Uwe Rosenberg");
        expect(reviews).toHaveProperty(
          "review_img_url",
          "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700"
        );
        expect(reviews).toHaveProperty("votes", 1);
        expect(reviews).toHaveProperty("category", "euro game");
        expect(reviews).toHaveProperty("owner", "mallionaire");
        expect(reviews).toHaveProperty(
          "created_at",
          "2021-01-18T10:00:20.514Z"
        );
      });
  });
  it("404: should respond with error message when review is non-existent", () => {
    return request(app)
      .get("/api/reviews/1000")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("review not found");
      });
  });
  it("400: GET invalid review_id", () => {
    return request(app)
      .get("/api/reviews/hello")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Invalid ID");
      });
  });
});

describe("GET", () => {
  it("should respond with an array of review objects with expected properties", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        const bodyReviews = body.reviews;
        expect(bodyReviews).toHaveLength(13);
        expect(bodyReviews).toBeInstanceOf(Array);
        bodyReviews.forEach((review) => {
          expect(review).toHaveProperty("review_id", expect.any(Number));
          expect(review).toHaveProperty("title", expect.any(String));
          expect(review).toHaveProperty("designer", expect.any(String));
          expect(review).toHaveProperty("review_img_url", expect.any(String));
          expect(review).toHaveProperty("votes", expect.any(Number));
          expect(review).toHaveProperty("category", expect.any(String));
          expect(review).toHaveProperty("owner", expect.any(String));
          expect(review).toHaveProperty("comment_count", expect.any(String));
          expect(review).toHaveProperty("created_at", expect.any(String));
          expect(Object.keys(review)).toHaveLength(9);
          expect(bodyReviews).toBeSortedBy("created_at", { descending: true });
        });
      });
  });
});
describe("GET", () => {
  it("should return an empty array of comments when given a valid ID but no comments", () => {
    return request(app)
      .get(`/api/reviews/5/comments`)
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toEqual([]);
      });
  });
  it("should return array of comments when given review_id with following properties", () => {
    return request(app)
      .get(`/api/reviews/2/comments`)
      .expect(200)
      .then(({ body }) => {
        const comments = body.comments;
        expect(comments.length).toBeDefined();
        comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id", expect.any(Number));
          expect(comment).toHaveProperty("body", expect.any(String));
          expect(comment).toHaveProperty("author", expect.any(String));
          expect(comment).toHaveProperty("votes", expect.any(Number));
          expect(comment).toHaveProperty("created_at", expect.any(String));
          expect(comment).toHaveProperty("review_id", expect.any(Number));
          expect(Object.keys(comment)).toHaveLength(6);
        });
      });
  });
  it("should return comments sorted by created_at in descending order", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toBeSortedBy("created_at", { descending: true });
      });
  });

  it("should return status 400 if given an invalid ID", () => {
    return request(app)
      .get(`/api/reviews/not-an-id/comments`)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Invalid ID");
      });
  });

  it("should return status 404 if given a non-existent ID", () => {
    return request(app)
      .get(`/api/reviews/9999`)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("review not found");
      });
  });
});

describe("POST /api/reviews/:review_id/comments", () => {
  it("should respond with username and body with comment", () => {
    const commentInput = {
      body: "I am slow but i am committed",
      author: "mallionaire",
    };
    return request(app)
      .post("/api/reviews/4/comments")
      .send(commentInput)
      .expect(201)
      .then((response) => {
        const { body } = response;
        const { comment } = body;
        expect(comment).toEqual({
          comment_id: 7,
          body: "I am slow but i am committed",
          votes: 0,
          author: "mallionaire",
          review_id: 4,
          created_at: expect.any(String),
        });
      });
  });
  it("should create a new comment on review 4 with the provided properties, ignoring any extra properties',", () => {
    const commentInput = {
      body: "I am slow but i am committed",
      author: "mallionaire",
      extraProperty: "This property should be ignored by the server",
    };
    return request(app)
      .post("/api/reviews/4/comments")
      .send(commentInput)
      .expect(201)
      .then((response) => {
        const { body } = response;
        const { comment } = body;
        expect(comment).toEqual({
          comment_id: 7,
          body: "I am slow but i am committed",
          votes: 0,
          author: "mallionaire",
          review_id: 4,
          created_at: expect.any(String),
        });
        expect(comment).not.toHaveProperty("extraProperty");
      });
  });
  it("should return status 404 if given a non-existent ID", () => {
    const commentInput = {
      body: "I am slow but i am committed",
      author: "mallionaire",
    };
    return request(app)
      .post(`/api/reviews/9999/comments`)
      .send(commentInput)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("ID not found");
      });
  });
  it("should return status 400 if given an invalid ID", () => {
    return request(app)
      .post(`/api/reviews/not-an-id/comments`)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Invalid ID");
      });
  });
  it("should respond with 400 if missing fields", () => {
    const commentInput = {
      author: "mallionaire",
    };

    return request(app)
      .post("/api/reviews/4/comments")
      .send(commentInput)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Missing required field");
      });
  });
  it("should respond with 404 if author does not exist", () => {
    const commentInput = {
      body: "I am slow but i am committed",
      author: "nonexistentUser", // Set a nonexistent username
    };
    return request(app)
      .post("/api/reviews/4/comments")
      .send(commentInput)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("ID not found");
      });
  });
});

describe("PATCH /api/reviews/:review_id", () => {
  it("should return the following properties and the vote incremented  by 1", () => {
    return request(app)
      .patch("/api/reviews/1")
      .send({ inc_votes: 1 })
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review).toEqual({
          review_id: 1,
          title: "Agricola",
          category: "euro game",
          designer: "Uwe Rosenberg",
          owner: "mallionaire",
          review_body: "Farmyard fun!",
          review_img_url:
            "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700",
          created_at: "2021-01-18T10:00:20.514Z",
          votes: 2,
        });
        expect(Object.keys(review)).toHaveLength(9);
      });
  });
  it("404:should respond with status 404 for non-existent review_id", () => {
    return request(app)
      .patch("/api/reviews/999")
      .send({ inc_votes: 1 })
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("ID not found");
      });
  });
  it("400:should have correct id format", () => {
    return request(app)
      .patch("/api/reviews/does-not-exist")
      .send({ inc_votes: 1 })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Invalid ID");
      });
  });
  it("400:should give an error when object sent is empty", () => {
    return request(app)
      .patch("/api/reviews/1")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Missing required field");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  it("should delete the given comment with comment_id", () => {
    const commentToDelete = {
      comment_id: 1,
      body: "I loved this game too!",
      review_id: 2,
      author: "bainesface",
      votes: 16,
      created_at: "2017-11-22T12:43:33.389Z",
    };
    return request(app)
      .delete(`/api/comments/${commentToDelete.comment_id}`)
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });
  it("400:should have correct id format", () => {
    return request(app)
      .delete("/api/comments/does-not-exist")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Invalid ID");
      });
  });
  it("should return a 404 error if the comment does not exist", () => {
    return request(app)
      .delete(`/api/comments/999`)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("ID not found");
      });
  });
  it("should return a 404 error if the comment ID is valid but out of scope", () => {
    const commentToDelete = {
      comment_id: 9999, // assume this ID is not in the database
      body: "I loved this game too!",
      review_id: 2,
      author: "bainesface",
      votes: 16,
      created_at: "2017-11-22T12:43:33.389Z",
    };

    return request(app)
      .delete(`/api/comments/${commentToDelete.comment_id}`)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("ID not found");
      });
  });
});

describe("GET /api/users", () => {
  it("should return an array of Object the following properties", () => {
    return request(app)
      .get("/api/users")
      .set("Authorization", "Bearer valid_token")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBeGreaterThan(0);
        users.forEach((user) => {
          expect(user).toHaveProperty("username", expect.any(String));
          expect(user).toHaveProperty("name", expect.any(String));
          expect(user).toHaveProperty("avatar_url", expect.any(String));
          expect(Object.keys(user)).toHaveLength(3);
        });
      });
  });
  it("returns a 404 error if the user does not exist", () => {
    return request(app)
      .get("/api/banana")
      .expect(404)
      .expect(({ body }) => {
        expect(body.message).toBe("End point does not exist");
      });
  });
});
