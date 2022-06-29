import SessionClient from '../session-client';

describe('Session client', () => {
  it('should initialize correctly', () => {
    expect(() => new SessionClient()).not.toThrowError();
    // ...
  });
});
