import { act, render, waitFor } from '@testing-library/react';
import { AxiosError } from 'axios';
import { FC } from 'react';

import APIContext, { APIContextValue } from '@/contexts/api-context/api-context';
import APIContextProvider from '@/contexts/api-context/api-context-provider';
import createUser from '@/models/user/__tests__/factories/user-factory';
import UserFactory from '@/models/user/user-factory';
import sessionResponseHandler from '@/services/adottami-client/session-client/__tests__/mocks/session-response-handler';
import { LoginCredentials, LoginResponse } from '@/services/adottami-client/session-client/types';
import { AuthenticationCredentials } from '@/services/adottami-client/types';
import userResponseHandler from '@/services/adottami-client/user-client/__tests__/mocks/user-response-handler';
import { HTTPResponseCode } from '@/services/types';
import storage from '@/utils/storage-client/storage-client';
import { ignoreConsole } from '@tests/utils/console';

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

  function renderSessionContext() {
    render(
      <APIContextProvider>
        <SessionContextProvider>
          <ChildrenComponent />
        </SessionContextProvider>
      </APIContextProvider>,
    );
  }

  beforeEach(() => {
    storage.session.clear();
  });

  it('should initialize correctly', () => {
    renderSessionContext();

    expect(session.user).toBe(null);
    expect(session.login).toEqual(expect.any(Function));
    expect(session.logout).toEqual(expect.any(Function));
    expect(session.isLoading).toBe(false);
  });

  describe('Session lifecycle', () => {
    const user = createUser();

    const authentication: AuthenticationCredentials = {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    };

    describe('Login and logout', () => {
      const loginResponse: LoginResponse = {
        accessToken: authentication.accessToken,
        refreshToken: authentication.refreshToken,
        user: UserFactory.toResponse(user),
      };

      const loginCredentials: LoginCredentials = {
        email: 'user@email.com',
        password: 'password',
      };

      function expectActiveSession() {
        expect(session.user).toEqual(user);
        expect(session.isLoading).toBe(false);
        expect(api.adottami.accessToken()).toBe(authentication.accessToken);
        expect(api.adottami.refreshToken()).toBe(authentication.refreshToken);

        const sessionData = storage.session.read();
        expect(sessionData).toEqual({ userId: user.id(), authentication });
      }

      async function loginAndExpectActiveSession() {
        sessionResponseHandler.mockLogin(loginResponse);

        await act(async () => {
          await session.login(loginCredentials);
        });

        expectActiveSession();
      }

      it('should support logging in', async () => {
        renderSessionContext();

        expect(session.user).toBe(null);
        expect(session.isLoading).toBe(false);
        expect(api.adottami.accessToken()).toBe(undefined);
        expect(api.adottami.refreshToken()).toBe(undefined);
        expect(storage.session.read()).toBe(null);

        sessionResponseHandler.mockLogin(loginResponse);

        await act(async () => {
          const loggedInUser = await session.login(loginCredentials);
          expect(loggedInUser).toEqual(user);
        });

        expectActiveSession();
      });

      it('should support logging out', async () => {
        renderSessionContext();

        await loginAndExpectActiveSession();

        sessionResponseHandler.mockLogout();

        await act(async () => {
          await session.logout();
        });

        expect(session.user).toBe(null);
        expect(session.isLoading).toBe(false);
        expect(api.adottami.accessToken()).toBe(undefined);
        expect(api.adottami.refreshToken()).toBe(undefined);
        expect(storage.session.read()).toBe(null);
      });

      it('should reset session after an unexpected logout', async () => {
        renderSessionContext();

        await loginAndExpectActiveSession();

        userResponseHandler.mockGetById(user.id(), null, { responseCode: HTTPResponseCode.UNAUTHORIZED });
        sessionResponseHandler.mockRequestAccessToken(null, { responseCode: HTTPResponseCode.UNAUTHORIZED });

        await act(async () => {
          await expect(async () => {
            await api.adottami.users.getById(user.id());
          }).rejects.toThrowError(AxiosError);
        });

        expect(session.user).toBe(null);
        expect(session.isLoading).toBe(false);
        expect(api.adottami.accessToken()).toBe(undefined);
        expect(api.adottami.refreshToken()).toBe(undefined);
        expect(storage.session.read()).toBe(null);
      });
    });

    describe('Session restoration', () => {
      it('should support restoring a previous session', async () => {
        storage.session.save({ userId: user.id(), authentication });
        userResponseHandler.mockGetById(user.id(), UserFactory.toResponse(user));

        renderSessionContext();

        expect(session.user).toBe(null);
        expect(session.isLoading).toBe(true);
        expect(api.adottami.accessToken()).toBe(undefined);
        expect(api.adottami.refreshToken()).toBe(undefined);

        await waitFor(() => {
          expect(session.user).toEqual(user);
        });

        expect(session.isLoading).toBe(false);
        expect(api.adottami.accessToken()).toBe(authentication.accessToken);
        expect(api.adottami.refreshToken()).toBe(authentication.refreshToken);
      });

      it('should clear a previous session if it could not be restored', async () => {
        storage.session.save({ userId: user.id(), authentication });
        userResponseHandler.mockGetById(user.id(), null, { responseCode: HTTPResponseCode.NOT_FOUND });

        const restoreConsole = ignoreConsole('error');

        renderSessionContext();

        expect(session.user).toBe(null);
        expect(session.isLoading).toBe(true);
        expect(api.adottami.accessToken()).toBe(undefined);
        expect(api.adottami.refreshToken()).toBe(undefined);

        await waitFor(() => {
          expect(session.isLoading).toBe(false);
        });

        restoreConsole();

        expect(session.user).toBe(null);
        expect(api.adottami.accessToken()).toBe(undefined);
        expect(api.adottami.refreshToken()).toBe(undefined);
        expect(storage.session.read()).toBe(null);
      });

      it('should not restore a previous session if not present', async () => {
        renderSessionContext();

        expect(session.user).toBe(null);
        expect(session.isLoading).toBe(false);
        expect(api.adottami.accessToken()).toBe(undefined);
        expect(api.adottami.refreshToken()).toBe(undefined);
        expect(storage.session.read()).toBe(null);
      });
    });
  });
});
