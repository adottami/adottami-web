import User from '../user';

describe('User', () => {
  it('should initialize correctly', () => {
    expect(() => new User()).not.toThrowError();
    // ...
  });
});
