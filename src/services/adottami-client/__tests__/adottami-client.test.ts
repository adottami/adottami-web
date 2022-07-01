import globalConfig from '@/config/global-config/global-config';
import createUser from '@/models/user/__tests__/factories/user-factory';
import { TrackedRequest, trackRequests } from '@tests/utils/requests';

import AdottamiClient from '../adottami-client';
import { UNAUTHORIZED_HTTP_CODE } from '../constants';
import PublicationClient from '../publication-client/publication-client';
import { ACCESS_TOKEN_ENDPOINT, LOGIN_ENDPOINT, LOGOUT_ENDPOINT } from '../session-client/constants';
import { LoginCredentials, LoginResponse } from '../session-client/types';
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

    const user = createUser();
    const loginResponse: LoginResponse = {
      accessToken,
      refreshToken,
      user: {
        id: user.id(),
        name: user.name(),
        email: user.email(),
        phoneNumber: user.phoneNumber(),
      },
    };

    it('should support logging in', async () => {
      const adottamiClient = new AdottamiClient(null);
      expect(adottamiClient.accessToken()).toBe(undefined);
      expect(adottamiClient.refreshToken()).toBe(undefined);

      trackRequests(withBaseAdottamiURL(LOGIN_ENDPOINT), 'post', { responseData: loginResponse });

      await adottamiClient.session.login(loginCredentials);

      expect(adottamiClient.accessToken()).toBe(loginResponse.accessToken);
      expect(adottamiClient.refreshToken()).toBe(loginResponse.refreshToken);
    });

    it('should support logging out', async () => {
      const adottamiClient = new AdottamiClient(authentication);
      expect(adottamiClient.accessToken()).toBe(authentication.accessToken);
      expect(adottamiClient.refreshToken()).toBe(authentication.refreshToken);

      trackRequests(withBaseAdottamiURL(LOGOUT_ENDPOINT), 'post');

      await adottamiClient.session.logout();

      expect(adottamiClient.accessToken()).toBe(undefined);
      expect(adottamiClient.refreshToken()).toBe(undefined);
    });
  });
});
