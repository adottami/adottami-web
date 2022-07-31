import { UserFields } from '../../types';
import User from '../../user';
import createUserFields from './user-fields-factory';

function createUser(partialFields: Partial<UserFields> = {}): User {
  return new User(createUserFields(partialFields));
}

export default createUser;
