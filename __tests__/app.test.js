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
        console.log(categories);
        expect(Array.isArray(categories)).toBe(true);
        categories.forEach((category) => {
          expect(category).toHaveProperty("slug", expect.any(String));
          expect(category).toHaveProperty("description", expect.any(String));
        });
      });
  });
  it.only("returns a 404 error if the category does not exist", () => {
    return request(app)
      .get("/api/banana")
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe("End point does not exist");
      });
  });
});
