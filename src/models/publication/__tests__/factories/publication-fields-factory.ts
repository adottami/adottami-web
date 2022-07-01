import createUserFields from '@/models/user/__tests__/factories/user-fields-factory';

import { PublicationFields } from '../../types';

let nextIdAsNumber = 1;

function createPublicationFields(partialFields: Partial<PublicationFields> = {}): PublicationFields {
  return {
    id: (nextIdAsNumber++).toString(),
    name: 'Pet',
    description: 'Meu pet',
    category: 'Gato',
    gender: 'Macho',
    breed: null,
    weightInGrams: null,
    ageInYears: null,
    zipCode: '00000000',
    city: 'Cidade',
    state: 'Estado',
    isArchived: false,
    characteristics: [],
    images: [],
    author: createUserFields(),
    ...partialFields,
  };
}

export default createPublicationFields;
