import { UserFields } from '../types';
import User from '../user';

describe('User', () => {
  it('should initialize correctly', () => {
    const userFields: UserFields = {
      id: '1',
      name: 'User',
      email: 'user@email.com',
      phoneNumber: '1100001111',
    };

    const user = new User(userFields);

    expect(user.id()).toBe(userFields.id);
    expect(user.name()).toBe(userFields.name);
    expect(user.email()).toBe(userFields.email);
    expect(user.phoneNumber()).toBe(userFields.phoneNumber);
  });
});
