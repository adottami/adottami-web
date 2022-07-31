import createUserFields from '@/models/user/__tests__/factories/user-fields-factory';

import { PublicationFields } from '../../types';

let nextIdAsNumber = 1;

function createPublicationFields(partialFields: Partial<PublicationFields> = {}): PublicationFields {
  return {
    id: (nextIdAsNumber++).toString(),
    name: 'Pet',
    description: 'My pet',
    category: 'Cat',
    gender: 'Male',
    breed: null,
    weightInGrams: null,
    ageInYears: null,
    zipCode: '00000000',
    city: 'City',
    state: 'State',
    isArchived: false,
    hidePhoneNumber: false,
    characteristics: [],
    images: [],
    author: createUserFields(),
    createdAt: new Date('2022-07-30'),
    ...partialFields,
  };
}

export default createPublicationFields;
