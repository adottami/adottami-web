import { act, render } from '@testing-library/react';
import { AxiosError } from 'axios';
import { FC } from 'react';

import APIContext, { APIContextValue } from '@/contexts/api-context/api-context';
import APIContextProvider from '@/contexts/api-context/api-context-provider';
import createUser from '@/models/user/__tests__/factories/user-factory';
import UserFactory from '@/models/user/user-factory';
import sessionResponseHandler from '@/services/adottami-client/session-client/__tests__/mocks/session-response-handler';
import { LoginCredentials, LoginResponse } from '@/services/adottami-client/session-client/types';
import userResponseHandler from '@/services/adottami-client/user-client/__tests__/mocks/user-response-handler';
import { HTTPResponseCode } from '@/services/types';

import SessionContext, { SessionContextValue } from '../session-context';
import SessionContextProvider from '../session-context-provider';

describe('Session context provider', () => {
  let session: SessionContextValue;
  let api: APIContextValue;

  const ChildrenComponent: FC = () => {
    session = SessionContext.useContext();
    api = APIContext.useContext();
    return null;
  };

  beforeEach(() => {
    render(
      <APIContextProvider>
        <SessionContextProvider>
          <ChildrenComponent />
        </SessionContextProvider>
      </APIContextProvider>,
    );
  });

  it('should initialize correctly', () => {
    expect(session.user).toBe(null);
    expect(session.login).toEqual(expect.any(Function));
    expect(session.logout).toEqual(expect.any(Function));
    expect(session.isLoading).toBe(false);
  });

  describe('Session lifecycle', () => {
    const user = createUser();

    const loginResponse: LoginResponse = {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      user: UserFactory.toResponse(user),
    };

    const loginCredentials: LoginCredentials = {
      email: 'user@email.com',
      password: 'password',
    };

    async function loginAndEnsureActiveSession() {
      sessionResponseHandler.mockLogin(loginResponse);

      await act(async () => {
        await session.login(loginCredentials);
      });

      expect(session.user).toEqual(user);
      expect(session.isLoading).toBe(false);
      expect(api.adottami.accessToken()).toBe(loginResponse.accessToken);
      expect(api.adottami.refreshToken()).toBe(loginResponse.refreshToken);
    }

    it('should support logging in', async () => {
      expect(session.user).toBe(null);
      expect(session.isLoading).toBe(false);
      expect(api.adottami.accessToken()).toBe(undefined);
      expect(api.adottami.refreshToken()).toBe(undefined);

      sessionResponseHandler.mockLogin(loginResponse);

      await act(async () => {
        const loggedInUser = await session.login(loginCredentials);
        expect(loggedInUser).toEqual(user);
      });

      expect(session.user).toEqual(user);
      expect(session.isLoading).toBe(false);
      expect(api.adottami.accessToken()).toBe(loginResponse.accessToken);
      expect(api.adottami.refreshToken()).toBe(loginResponse.refreshToken);
    });

    it('should support logging out', async () => {
      await loginAndEnsureActiveSession();

      sessionResponseHandler.mockLogout();

      await act(async () => {
        await session.logout();
      });

      expect(session.user).toBe(null);
      expect(session.isLoading).toBe(false);
      expect(api.adottami.accessToken()).toBe(undefined);
      expect(api.adottami.refreshToken()).toBe(undefined);
    });

    it('should reset the correct state after an unexpected logout', async () => {
      await loginAndEnsureActiveSession();

      const userId = '1';
      userResponseHandler.mockGetById(userId, null, { responseCode: HTTPResponseCode.UNAUTHORIZED });
      sessionResponseHandler.mockRequestAccessToken(null, { responseCode: HTTPResponseCode.UNAUTHORIZED });

      await act(async () => {
        await expect(async () => {
          await api.adottami.users.getById(userId);
        }).rejects.toThrowError(AxiosError);
      });

      expect(session.user).toBe(null);
      expect(session.isLoading).toBe(false);
      expect(api.adottami.accessToken()).toBe(undefined);
      expect(api.adottami.refreshToken()).toBe(undefined);
    });
  });
});
