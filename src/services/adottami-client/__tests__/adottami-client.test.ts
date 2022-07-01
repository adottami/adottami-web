import axios from 'axios';

import globalConfig from '@/config/global-config/global-config';
import { TrackedRequest, trackRequests } from '@tests/utils/requests';

import AdottamiClient from '../adottami-client';
import { UNAUTHORIZED_HTTP_CODE } from '../constants';
import PublicationClient from '../publication-client/publication-client';
import { ACCESS_TOKEN_ENDPOINT, LOGIN_ENDPOINT, LOGOUT_ENDPOINT } from '../session-client/constants';
import SessionClient from '../session-client/session-client';
import { LoginCredentials, LoginResult } from '../session-client/types';
import { AuthenticationCredentials } from '../types';
import UserClient from '../user-client/user-client';
import { getUserEndpoint } from '../user-client/utils';
import { withBaseAdottamiURL } from '../utils';

describe('Adottami client', () => {
  const accessToken = 'access-token';
  const refreshToken = 'refresh-token';

  it('should initialize correctly', () => {
    const adottamiClient = new AdottamiClient();

    expect(adottamiClient.baseURL()).toBe(globalConfig.baseAdottamiURL());
    expect(adottamiClient.users).toBeInstanceOf(UserClient);
    expect(adottamiClient.publications).toBeInstanceOf(PublicationClient);
  });

  it('should support creating a copy', () => {
    const adottamiClient = new AdottamiClient();

    const adottamiClientCopy = adottamiClient.createCopy();
    expect(JSON.stringify(adottamiClientCopy)).toEqual(JSON.stringify(adottamiClient));
    expect(adottamiClientCopy.baseURL()).toBe(adottamiClient.baseURL());
    expect(adottamiClientCopy.accessToken()).toBe(adottamiClient.accessToken());
    expect(adottamiClientCopy.refreshToken()).toBe(adottamiClient.refreshToken());
    expect(adottamiClientCopy.users).toBe(adottamiClient.users);
    expect(adottamiClientCopy.publications).toBe(adottamiClient.publications);
  });

  describe('Authentication', () => {
    const adottamiClient = new AdottamiClient({ accessToken, refreshToken });

    const userId = '1';

    it('should authenticate requests if the credentials are provided', async () => {
      const userRequests = trackRequests(withBaseAdottamiURL(getUserEndpoint(userId)), 'get');
      await adottamiClient.users.getById(userId);

      expect(userRequests).toHaveLength(1);
      expect(userRequests[0].headers.authorization).toEqual(`Bearer ${accessToken}`);
    });

    it('should request a new access token if a request is unauthorized', async () => {
      const initialUserRequests = trackRequests(withBaseAdottamiURL(getUserEndpoint(userId)), 'get', {
        responseCode: UNAUTHORIZED_HTTP_CODE,
      });

      let finalUserRequests: TrackedRequest[] = [];

      const newAccessToken = 'new-access-token';
      const accessTokenRequests = trackRequests(withBaseAdottamiURL(ACCESS_TOKEN_ENDPOINT), 'post', {
        responseCode: 201,
        responseData: { accessToken: newAccessToken },
        beforeSendingResponse() {
          finalUserRequests = trackRequests(withBaseAdottamiURL(getUserEndpoint(userId)), 'get', { responseCode: 200 });
        },
      });

      await adottamiClient.users.getById(userId);

      expect(initialUserRequests).toHaveLength(1);
      expect(initialUserRequests[0].headers.authorization).toEqual(`Bearer ${accessToken}`);

      expect(finalUserRequests).toHaveLength(1);
      expect(finalUserRequests[0].headers.authorization).toEqual(`Bearer ${newAccessToken}`);

      expect(accessTokenRequests).toHaveLength(1);
      expect(accessTokenRequests[0].body).toEqual({ refreshToken });
    });
  });

  describe('Sessions', () => {
    const authentication: AuthenticationCredentials = { accessToken, refreshToken };
    const loginCredentials: LoginCredentials = { email: 'user@email.com', password: 'password' };
    const loginResult: LoginResult = { accessToken, refreshToken };

    const api = axios.create({ baseURL: globalConfig.baseAdottamiURL() });
    const sessionClient = new SessionClient(api);

    it('should support logging in', async () => {
      const sessionLoginSpy = jest.spyOn(sessionClient, 'login');

      const adottamiClient = new AdottamiClient(null, { sessions: sessionClient });
      expect(adottamiClient.accessToken()).toBe(undefined);
      expect(adottamiClient.refreshToken()).toBe(undefined);

      trackRequests(withBaseAdottamiURL(LOGIN_ENDPOINT), 'post', { responseData: loginResult });

      const loggedInAdottamiClient = await adottamiClient.login(loginCredentials);

      expect(sessionLoginSpy).toHaveBeenCalledWith(loginCredentials);

      expect(loggedInAdottamiClient).not.toBe(adottamiClient);
      expect(loggedInAdottamiClient.accessToken()).toBe(loginResult.accessToken);
      expect(loggedInAdottamiClient.refreshToken()).toBe(loginResult.refreshToken);
    });

    it('should support logging out', async () => {
      const sessionLogoutSpy = jest.spyOn(sessionClient, 'logout');

      const adottamiClient = new AdottamiClient(authentication, { sessions: sessionClient });
      expect(adottamiClient.accessToken()).toBe(authentication.accessToken);
      expect(adottamiClient.refreshToken()).toBe(authentication.refreshToken);

      trackRequests(withBaseAdottamiURL(LOGOUT_ENDPOINT), 'post');

      const loggedOutAdottamiClient = await adottamiClient.logout();

      expect(sessionLogoutSpy).toHaveBeenCalled();

      expect(loggedOutAdottamiClient).not.toBe(adottamiClient);
      expect(loggedOutAdottamiClient.accessToken()).toBe(undefined);
      expect(loggedOutAdottamiClient.refreshToken()).toBe(undefined);
    });

    it('should notify login listeners on login', async () => {
      const onLogin = jest.fn();
      const adottamiClient = new AdottamiClient(null, { listeners: { onLogin } });

      trackRequests(withBaseAdottamiURL(LOGIN_ENDPOINT), 'post', { responseData: loginResult });

      const loginCredentials: LoginCredentials = { email: 'user@email.com', password: 'password' };
      const loggedInAdottamiClient = await adottamiClient.login(loginCredentials);

      expect(onLogin).toHaveBeenCalledWith(loggedInAdottamiClient);
    });

    it('should notify logout listeners on logout', async () => {
      const onLogout = jest.fn();
      const adottamiClient = new AdottamiClient(null, { listeners: { onLogout } });

      trackRequests(withBaseAdottamiURL(LOGOUT_ENDPOINT), 'post');

      const loggedOutAdottamiClient = await adottamiClient.logout();

      expect(onLogout).toHaveBeenCalledWith(loggedOutAdottamiClient);
    });
  });
});
