import axios from 'axios';

import globalConfig from '@/config/global-config/global-config';

import PublicationClient from './publication-client/publication-client';
import SessionClient from './session-client/session-client';
import UserClient from './user-client/user-client';

class AdottamiClient {
  private _baseURL: string;

  users: UserClient;
  session: SessionClient;
  publications: PublicationClient;

  constructor() {
    this._baseURL = globalConfig.baseAdottamiURL();
    const api = axios.create({ baseURL: this.baseURL() });
    this.users = new UserClient(api);
    this.session = new SessionClient(api);
    this.publications = new PublicationClient(api);
  }

  baseURL(): string {
    return this._baseURL;
  }
}

export default AdottamiClient;
