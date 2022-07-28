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
    weightInKilograms: null,
    ageInYears: null,
    zipCode: '00000000',
    city: 'City',
    state: 'State',
    isArchived: false,
    characteristics: [],
    images: [],
    author: createUserFields(),
    ...partialFields,
  };
}

export default createPublicationFields;
