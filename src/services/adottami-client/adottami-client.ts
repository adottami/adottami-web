import axios, { AxiosError, AxiosInstance } from 'axios';

import globalConfig from '@/config/global-config/global-config';

import { UNAUTHORIZED_HTTP_CODE } from './constants';
import PublicationClient from './publication-client/publication-client';
import SessionClient from './session-client/session-client';
import { LoginResult } from './session-client/types';
import { AuthenticationCredentials } from './types';
import UserClient from './user-client/user-client';

class AdottamiClient {
  private api: AxiosInstance;
  private authentication: AuthenticationCredentials | null;

  session: SessionClient;
  users: UserClient;
  publications: PublicationClient;

  constructor(
    authentication: AuthenticationCredentials | null = null,
    options: {
      baseURL?: string;
      session?: SessionClient;
      users?: UserClient;
      publications?: PublicationClient;
    } = {},
  ) {
    const baseURL = options.baseURL ?? globalConfig.baseAdottamiURL();
    this.authentication = authentication;

    this.api = this.createAPIInstance(baseURL);

    this.session =
      options.session ??
      new SessionClient(this.api, {
        listeners: {
          onLogin: (loginResult) => this.handleLogin(loginResult),
          onLogout: () => this.handleLogout(),
        },
      });

    this.users = options.users ?? new UserClient(this.api);
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
    const isRequestAccessTokenError = this.session.matchesRequestAccessTokenConfig(error.config);

    if (!isUnauthorizedError || isRequestAccessTokenError || this.authentication === null) {
      return Promise.reject(error);
    }

    const newAccessToken = await this.session.requestAccessToken(this.authentication.refreshToken);
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

  private handleLogin(loginResult: LoginResult) {
    this.authentication = {
      accessToken: loginResult.accessToken,
      refreshToken: loginResult.refreshToken,
    };
  }

  private handleLogout() {
    this.authentication = null;
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

  createCopy(authentication: AuthenticationCredentials | null = this.authentication) {
    return new AdottamiClient(authentication, {
      baseURL: this.baseURL(),
      session: this.session,
      users: this.users,
      publications: this.publications,
    });
  }
}

export default AdottamiClient;
