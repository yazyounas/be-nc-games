const db = require("../db/connection");
const app = require("../app");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");

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
