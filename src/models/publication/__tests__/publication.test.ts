import User from '@/models/user/user';

import Publication from '../publication';
import createPublicationFields from './factories/publication-fields-factory';

describe('Publication', () => {
  it('should initialize correctly', () => {
    const publicationFields = createPublicationFields();

    const publication = new Publication(publicationFields);

    expect(publication.id()).toEqual(publicationFields.id);
    expect(publication.name()).toEqual(publicationFields.name);
    expect(publication.description()).toEqual(publicationFields.description);
    expect(publication.category()).toEqual(publicationFields.category);
    expect(publication.gender()).toEqual(publicationFields.gender);
    expect(publication.breed()).toEqual(publicationFields.breed);
    expect(publication.weightInKilograms()).toEqual(publicationFields.weightInKilograms);
    expect(publication.ageInYears()).toEqual(publicationFields.ageInYears);
    expect(publication.zipCode()).toEqual(publicationFields.zipCode);
    expect(publication.city()).toEqual(publicationFields.city);
    expect(publication.state()).toEqual(publicationFields.state);
    expect(publication.isArchived()).toEqual(publicationFields.isArchived);
    expect(publication.characteristics()).toEqual(publicationFields.characteristics);
    expect(publication.images()).toEqual(publicationFields.images);
    expect(publication.author()).toEqual(new User(publicationFields.author));
  });
});
