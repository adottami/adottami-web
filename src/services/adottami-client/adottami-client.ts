import axios, { AxiosError, AxiosInstance } from 'axios';

import globalConfig from '@/config/global-config/global-config';

import { UNAUTHORIZED_HTTP_CODE } from './constants';
import PublicationClient from './publication-client/publication-client';
import SessionClient from './session-client/session-client';
import { LoginCredentials } from './session-client/types';
import { AuthenticationCredentials } from './types';
import UserClient from './user-client/user-client';

class AdottamiClient {
  private api: AxiosInstance;
  private authentication: AuthenticationCredentials | null;

  users: UserClient;
  private sessions: SessionClient;
  publications: PublicationClient;

  constructor(
    authentication: AuthenticationCredentials | null = null,
    options: {
      baseURL?: string;
      users?: UserClient;
      sessions?: SessionClient;
      publications?: PublicationClient;
    } = {},
  ) {
    const baseURL = options.baseURL ?? globalConfig.baseAdottamiURL();
    this.authentication = authentication;

    this.api = this.createAPIInstance(baseURL);

    this.users = options.users ?? new UserClient(this.api);
    this.sessions = options.sessions ?? new SessionClient(this.api);
    this.publications = options.publications ?? new PublicationClient(this.api);
  }

  private createAPIInstance(baseURL: string): AxiosInstance {
    const api = axios.create({ baseURL });

    if (this.authentication) {
      api.defaults.headers.common.authorization = `Bearer ${this.authentication.accessToken}`;
    }

    this.registerAuthenticationErrorInterceptor(api);
    return api;
  }

  private registerAuthenticationErrorInterceptor(api: AxiosInstance) {
    api.interceptors.response.use(
      (response) => response,
      async (error: unknown) => {
        if (!(error instanceof AxiosError)) return Promise.reject(error);
        return this.handleAPIResponseError(api, error);
      },
    );
  }

  private async handleAPIResponseError(api: AxiosInstance, error: AxiosError) {
    const isUnauthorizedError = error.response?.status === UNAUTHORIZED_HTTP_CODE;
    const isRequestAccessTokenError = this.sessions.matchesRequestAccessTokenConfig(error.config);

    if (!isUnauthorizedError || isRequestAccessTokenError || this.authentication === null) {
      return Promise.reject(error);
    }

    const newAccessToken = await this.sessions.requestAccessToken(this.authentication.refreshToken);
    this.authentication.accessToken = newAccessToken;

    const newAuthorizationHeader = `Bearer ${newAccessToken}`;
    api.defaults.headers.common.authorization = newAuthorizationHeader;

    if (error.config.headers) {
      error.config.headers.authorization = newAuthorizationHeader;
    } else {
      error.config.headers = { authorization: newAuthorizationHeader };
    }

    return api(error.config);
  }

  baseURL(): string | undefined {
    return this.api.defaults.baseURL;
  }

  accessToken(): string | undefined {
    return this.authentication?.accessToken;
  }

  refreshToken(): string | undefined {
    return this.authentication?.refreshToken;
  }

  async withLogin(credentials: LoginCredentials): Promise<AdottamiClient> {
    const loginResult = await this.sessions.login(credentials);

    const loggedInAdottamiClient = this.createCopy({
      accessToken: loginResult.accessToken,
      refreshToken: loginResult.refreshToken,
    });

    return loggedInAdottamiClient;
  }

  async withLogout(): Promise<AdottamiClient> {
    await this.sessions.logout();
    const loggedOutAdottamiClient = this.createCopy(null);
    return loggedOutAdottamiClient;
  }

  createCopy(authentication: AuthenticationCredentials | null = this.authentication) {
    return new AdottamiClient(authentication, {
      baseURL: this.baseURL(),
      users: this.users,
      sessions: this.sessions,
      publications: this.publications,
    });
  }
}

export default AdottamiClient;
