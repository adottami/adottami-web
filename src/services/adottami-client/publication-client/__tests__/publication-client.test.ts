import PublicationClient from '../publication-client';

describe('Publication client', () => {
  it('should initialize correctly', () => {
    expect(() => new PublicationClient()).not.toThrowError();
    // ...
  });
});
