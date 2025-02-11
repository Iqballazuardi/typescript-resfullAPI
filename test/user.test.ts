import supertest from "supertest";
import { web } from "../src/app/web";
import { logger } from "../src/app/logging";
import { UserTest } from "./test-util";
import bcrypt from "bcrypt";
describe("POST/api/users", () => {
  afterEach(async () => {
    await UserTest.delete();
  });
  it("should reject register new user if request is invalid", async () => {
    // Your test code here
    const response = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
  it("should register new user", async () => {
    // Your test code here
    const response = await supertest(web).post("/api/users").send({
      username: "test",
      password: "test",
      name: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });
});

describe("post/api/users/login", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should be able to login", async () => {
    // Your test code here
    const response = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "test",
    });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.token).toBeDefined();
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });
  it("should be reject login id username is wrong!", async () => {
    // Your test code here
    const response = await supertest(web).post("/api/users/login").send({
      username: "salah",
      password: "test",
    });
    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
  it("should be reject login id password is wrong!", async () => {
    // Your test code here
    const response = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "wrong",
    });
    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET/api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should be able to get current user", async () => {
    // Your test code here
    const response = await supertest(web).get("/api/users/current").set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });
  it("should reject get user if token is invalid", async () => {
    // Your test code here
    const response = await supertest(web).get("/api/users/current").set("X-API-TOKEN", "invalid");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PACTH/api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should reject upuudate user if request is invalid", async () => {
    // Your test code here
    const response = await supertest(web).patch("/api/users/current").set("X-API-TOKEN", "test").send({
      name: "",
      password: "",
    });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
  it("should reject upudate user if token is wrong", async () => {
    // Your test code here
    const response = await supertest(web).patch("/api/users/current").set("Wrong!", "test").send({
      name: "test",
      password: "test",
    });
    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
  it("should be able to update user name", async () => {
    // Your test code here
    const response = await supertest(web).patch("/api/users/current").set("X-API-TOKEN", "test").send({
      name: "test",
    });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("test");
  });
  it("should be able to update user password", async () => {
    // Your test code here
    const response = await supertest(web).patch("/api/users/current").set("X-API-TOKEN", "test").send({
      password: "benar",
    });
    logger.debug(response.body);
    expect(response.status).toBe(200);

    const user = await UserTest.get();
    expect(await bcrypt.compare("benar", user.password)).toBe(true);
  });
});
