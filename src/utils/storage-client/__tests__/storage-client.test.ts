import SessionStorageClient from '../session-storage-client/session-storage-client';
import storage from '../storage-client';

describe('Storage client', () => {
  it('should initialize correctly', () => {
    expect(storage.session).toBeInstanceOf(SessionStorageClient);
  });
});
