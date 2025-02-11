import { User } from "@prisma/client";
import { ContactResponse, CreateContactRequest, toContactResponse } from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../app/database";
import { logger } from "../app/logging";
import { ResponseError } from "../error/response-error";

export class ContactService {
  static async create(user: User, request: CreateContactRequest): Promise<ContactResponse> {
    // TODO: Implement contact creation logic here
    const createRequest = Validation.validate(ContactValidation.CREATE, request);

    const record = {
      ...createRequest,
      ...{ username: user.username },
    };
    const contact = await prismaClient.contact.create({
      data: record,
    });
    logger.info(contact);
    return toContactResponse(contact);
  }
  static async get(user: User, id: number): Promise<ContactResponse> {
    // TODO: Implement contact retrieval logic here
    const contact = await prismaClient.contact.findUnique({
      where: {
        id: id,
        username: user.username,
      },
    });
    if (!contact) {
      throw new ResponseError(404, "Contact not found");
    }
    return toContactResponse(contact);
  }
}
