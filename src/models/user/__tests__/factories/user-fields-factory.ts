import { UserFields } from '../../types';

let nextUserIdAsNumber = 1;

function createUserFields(partialFields: Partial<UserFields> = {}): UserFields {
  return {
    id: (nextUserIdAsNumber++).toString(),
    name: 'User',
    email: 'user@email.com',
    phoneNumber: '1100001111',
    ...partialFields,
  };
}

export default createUserFields;
