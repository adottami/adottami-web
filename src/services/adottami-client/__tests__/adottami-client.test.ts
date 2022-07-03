import { AxiosError } from 'axios';

import globalConfig from '@/config/global-config/global-config';
import createUser from '@/models/user/__tests__/factories/user-factory';
import { HTTPResponseCode } from '@/services/types';
import { TrackedRequest } from '@tests/utils/requests';

import AdottamiClient from '../adottami-client';
import PublicationClient from '../publication-client/publication-client';
import sessionResponseHandler from '../session-client/__tests__/mocks/session-response-handler';
import { LoginCredentials, LoginResponse } from '../session-client/types';
import { AuthenticationCredentials } from '../types';
import userResponseHandler from '../user-client/__tests__/mocks/user-response-handler';
import UserClient from '../user-client/user-client';

describe('Adottami client', () => {
  const authentication: AuthenticationCredentials = {
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
  };

  it('should initialize correctly', () => {
    const adottamiClient = new AdottamiClient(null);

    expect(adottamiClient.baseURL()).toBe(globalConfig.baseAdottamiURL());
    expect(adottamiClient.users).toBeInstanceOf(UserClient);
    expect(adottamiClient.publications).toBeInstanceOf(PublicationClient);
  });

  describe('Authentication', () => {
    const adottamiClient = new AdottamiClient(authentication);

    const userId = '1';

    it('should authenticate requests if the credentials are provided', async () => {
      const userRequests = userResponseHandler.mockGetById(userId, null);
      await adottamiClient.users.getById(userId);

      expect(userRequests).toHaveLength(1);
      expect(userRequests[0].headers.authorization).toEqual(`Bearer ${authentication.accessToken}`);
    });

    it('should request a new access token if a request is unauthorized', async () => {
      const initialUserRequests = userResponseHandler.mockGetById(userId, null, {
        responseCode: HTTPResponseCode.UNAUTHORIZED,
      });

      let finalUserRequests: TrackedRequest[] = [];

      const newAccessToken = 'new-access-token';
      const accessTokenRequests = sessionResponseHandler.mockRequestAccessToken(newAccessToken, {
        responseCode: 201,
        beforeSendingResponse() {
          finalUserRequests = userResponseHandler.mockGetById(userId, null, { responseCode: HTTPResponseCode.OK });
        },
      });

      await adottamiClient.users.getById(userId);

      expect(initialUserRequests).toHaveLength(1);
      expect(initialUserRequests[0].headers.authorization).toEqual(`Bearer ${authentication.accessToken}`);

      expect(finalUserRequests).toHaveLength(1);
      expect(finalUserRequests[0].headers.authorization).toEqual(`Bearer ${newAccessToken}`);

      expect(accessTokenRequests).toHaveLength(1);
      expect(accessTokenRequests[0].body).toEqual({ refreshToken: authentication.refreshToken });
    });

    it('should throw an error if a request is unauthorized and no new token could be requested', async () => {
      const onUnexpectedLogout = jest.fn();
      const adottamiClient = new AdottamiClient(authentication, { listeners: { onUnexpectedLogout } });

      userResponseHandler.mockGetById(userId, null, { responseCode: HTTPResponseCode.UNAUTHORIZED });
      sessionResponseHandler.mockRequestAccessToken(null, { responseCode: HTTPResponseCode.UNAUTHORIZED });

      await expect(async () => {
        await adottamiClient.users.getById(userId);
      }).rejects.toThrowError(AxiosError);

      expect(onUnexpectedLogout).toHaveBeenCalled();
    });
  });

  describe('Sessions', () => {
    const loginCredentials: LoginCredentials = { email: 'user@email.com', password: 'password' };

    const user = createUser();
    const loginResponse: LoginResponse = {
      accessToken: authentication.accessToken,
      refreshToken: authentication.refreshToken,
      user: {
        id: user.id(),
        name: user.name(),
        email: user.email(),
        phoneNumber: user.phoneNumber(),
      },
    };

    it('should populate the authentication credentials after log in', async () => {
      const adottamiClient = new AdottamiClient(null);
      expect(adottamiClient.accessToken()).toBe(undefined);
      expect(adottamiClient.refreshToken()).toBe(undefined);

      sessionResponseHandler.mockLogin(loginResponse);

      await adottamiClient.session.login(loginCredentials);

      expect(adottamiClient.accessToken()).toBe(loginResponse.accessToken);
      expect(adottamiClient.refreshToken()).toBe(loginResponse.refreshToken);
    });

    it('should clear the authentication credentials after log out', async () => {
      const onUnexpectedLogout = jest.fn();
      const adottamiClient = new AdottamiClient(authentication, { listeners: { onUnexpectedLogout } });

      expect(adottamiClient.accessToken()).toBe(authentication.accessToken);
      expect(adottamiClient.refreshToken()).toBe(authentication.refreshToken);

      sessionResponseHandler.mockLogout();

      await adottamiClient.session.logout();

      expect(adottamiClient.accessToken()).toBe(undefined);
      expect(adottamiClient.refreshToken()).toBe(undefined);

      expect(onUnexpectedLogout).not.toHaveBeenCalled();
    });
  });
});
