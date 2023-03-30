const db = require("../db/connection");
const app = require("../app");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const sorted = require("jest-sorted");

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
        expect(comments.length).toBeGreaterThan(0);
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
