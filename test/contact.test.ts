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

describe("get/api/contact/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });
  afterEach(async () => {
    await ContactTest.deleteAll();

    await UserTest.delete();
  });
  it("should get a contact by id", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web).get(`/api/contacts/${contact.id}`).set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe(contact.first_name);
    expect(response.body.data.last_name).toBe(contact.last_name);
    expect(response.body.data.email).toBe(contact.email);
    expect(response.body.data.phone).toBe(contact.phone);
  });
  it("should reject get a contact by id", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("put/api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });
  afterEach(async () => {
    await ContactTest.deleteAll();

    await UserTest.delete();
  });
  it("should update a contact by id", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web).put(`/api/contacts/${contact.id}`).set("X-API-TOKEN", "test").send({
      first_name: "Jane",
      last_name: "Doe",
      email: "janedoe@example.com",
      phone: "0987654321",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(contact.id);
    expect(response.body.data.first_name).toBe("Jane");
    expect(response.body.data.last_name).toBe("Doe");
    expect(response.body.data.email).toBe("janedoe@example.com");
    expect(response.body.data.phone).toBe("0987654321");
  });
  it("should rejecet update  contact if invalid", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web).put(`/api/contacts/${contact.id}`).set("X-API-TOKEN", "test").send({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});
