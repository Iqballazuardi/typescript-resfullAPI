import { Contact, User } from "@prisma/client";
import { ContactResponse, CreateContactRequest, UpdateContactRequest, toContactResponse } from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../app/database";
import { logger } from "../app/logging";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";

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
  static async checkContactMustExits(username: string, contactId: number): Promise<Contact> {
    const contact = await prismaClient.contact.findUnique({
      where: {
        id: contactId,
        username: username,
      },
    });
    if (!contact) {
      throw new ResponseError(404, "Contact not found");
    }
    return contact;
  }
  static async get(user: User, id: number): Promise<ContactResponse> {
    // TODO: Implement contact retrieval logic here
    const contact = await this.checkContactMustExits(user.username, id);
    return toContactResponse(contact);
  }
  static async update(user: User, request: UpdateContactRequest): Promise<ContactResponse> {
    // TODO: Implement contact update logic here
    const updateRequest = Validation.validate(ContactValidation.UPDATE, request);
    await this.checkContactMustExits(user.username, updateRequest.id);

    const contact = await prismaClient.contact.update({
      where: {
        id: updateRequest.id,
        username: user.username,
      },
      data: updateRequest,
    });
    return toContactResponse(contact);
  }
  static async remove(user: User, id: number): Promise<ContactResponse> {
    // TODO: Implement contact removal logic here
    await this.checkContactMustExits(user.username, id);
    const contact = await prismaClient.contact.delete({
      where: {
        id: id,
        username: user.username,
      },
    });
    return toContactResponse(contact);
  }
  static async search(user: User, request: SearchContactRequest): Promise<Pageable<ContactResponse>> {
    // TODO: Implement contact search logic here
    const searchRequest = Validation.validate(ContactValidation.SEARCH, request);
    const skip = (searchRequest.page - 1) * searchRequest.size;
    const filters = [];
    // check name exists
    if (searchRequest.name) {
    }
    // check email exists
    // check phone exists

    const contacts = await prismaClient.contact.findMany({
      where: {
        username: user.username,
        AND: filters,
      },

      take: searchRequest.size,
      skip: skip,
    });
    const contact = await prismaClient.contact.count({
      where: {
        username: user.username,
        AND: filters,
      },
    });
    return {
      data: contacts.map((coantact) => toContactResponse(coantact)),
      paging: {
        current_page: searchRequest.page,
        total_page: Math.ceil(total / searchRequest.size),
        size: searchRequest.size,
      },
    };
  }
}
