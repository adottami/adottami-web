import User from '../user';
import createUserFields from './factories/user-fields-factory';

describe('User', () => {
  it('should initialize correctly', () => {
    const userFields = createUserFields();

    const user = new User(userFields);

    expect(user.id()).toBe(userFields.id);
    expect(user.name()).toBe(userFields.name);
    expect(user.email()).toBe(userFields.email);
    expect(user.phoneNumber()).toBe(userFields.phoneNumber);
  });
});
