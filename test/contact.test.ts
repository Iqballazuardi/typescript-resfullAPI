import supertest from "supertest";
import { ContactTest, UserTest } from "./test-util";
import { web } from "../src/app/web";
import { logger } from "../src/app/logging";

describe("post/api/contacts", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await ContactTest.deleteAll();

    await UserTest.delete();
  });

  it("should create a new contact", async () => {
    const response = await supertest(web).post("/api/contacts").set("X-API-TOKEN", "test").send({
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
    });

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe("John");
    expect(response.body.data.last_name).toBe("Doe");
    expect(response.body.data.email).toBe("johndoe@example.com");
    expect(response.body.data.phone).toBe("1234567890");
  });
});
