import UserClient from '../user-client';

describe('User client', () => {
  it('should initialize correctly', () => {
    expect(() => new UserClient()).not.toThrowError();
    // ...
  });
});
