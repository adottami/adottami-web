import UserFactory from '../user/user-factory';
import Publication from './publication';
import { PublicationFields, PublicationResponse } from './types';

class PublicationFactory {
  static createFromResponse(response: PublicationResponse) {
    return new Publication(this.mapResponseToFields(response));
  }

  static mapResponseToFields(response: PublicationResponse): PublicationFields {
    return {
      id: response.id,
      name: response.name,
      description: response.description,
      category: response.category,
      gender: response.gender,
      breed: response.breed,
      weightInGrams: response.weightInGrams,
      ageInYears: response.ageInYears,
      zipCode: response.zipCode,
      city: response.city,
      state: response.state,
      isArchived: response.isArchived,
      characteristics: response.characteristics,
      images: response.images,
      author: response.author,
      createdAt: response.createdAt,
    };
  }

  static toResponse(publication: Publication): PublicationResponse {
    return {
      id: publication.id(),
      name: publication.name(),
      description: publication.description(),
      category: publication.category(),
      gender: publication.gender(),
      breed: publication.breed(),
      weightInGrams: publication.weightInGrams(),
      ageInYears: publication.ageInYears(),
      zipCode: publication.zipCode(),
      city: publication.city(),
      state: publication.state(),
      isArchived: publication.isArchived(),
      characteristics: publication.characteristics(),
      images: publication.images(),
      author: UserFactory.toResponse(publication.author()),
      createdAt: publication.createdAt(),
    };
  }
}

export default PublicationFactory;
