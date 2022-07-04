import SessionStorageClient from './session-storage-client/session-storage-client';

export class StorageClient {
  session: SessionStorageClient;

  constructor() {
    this.session = new SessionStorageClient();
  }
}

const storage = new StorageClient();

export default storage;
