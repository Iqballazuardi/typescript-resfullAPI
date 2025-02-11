import { User } from "@prisma/client";
import { ContactResponse, CreateContactRequest, toContactResponse } from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../app/database";
import { logger } from "../app/logging";

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
}
