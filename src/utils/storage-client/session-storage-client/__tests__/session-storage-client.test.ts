import { DeepPartial } from '@/types/utils';

import { SESSION_DATA_STORAGE_KEY } from '../constants';
import SessionStorageClient from '../session-storage-client';
import { SessionData } from '../types';

describe('Session storage client', () => {
  const sessionStorage = new SessionStorageClient();

  const sessionData: SessionData = {
    userId: '1',
    authentication: {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    },
  };

  function savePartialSessionData(partialSessionData: DeepPartial<SessionData>) {
    window.localStorage.setItem(SESSION_DATA_STORAGE_KEY, JSON.stringify(partialSessionData));
  }

  beforeEach(() => {
    window.localStorage.removeItem(SESSION_DATA_STORAGE_KEY);
  });

  it('should support saving session data to storage', () => {
    sessionStorage.save(sessionData);
    const savedSessionData = window.localStorage.getItem(SESSION_DATA_STORAGE_KEY);
    expect(savedSessionData).toBe(JSON.stringify(sessionData));
  });

  it('should support reading session data from storage', () => {
    sessionStorage.save(sessionData);
    const readSessionData = sessionStorage.read();
    expect(readSessionData).toEqual(sessionData);
  });

  it('should return null if no session data is present or it is incomplete', () => {
    expect(sessionStorage.read()).toBe(null);

    savePartialSessionData({});
    expect(sessionStorage.read()).toBe(null);

    savePartialSessionData({ userId: '1' });
    expect(sessionStorage.read()).toBe(null);

    savePartialSessionData({ authentication: {} });
    expect(sessionStorage.read()).toBe(null);

    savePartialSessionData({ authentication: { accessToken: '1' } });
    expect(sessionStorage.read()).toBe(null);

    savePartialSessionData({ authentication: { refreshToken: '1' } });
    expect(sessionStorage.read()).toBe(null);

    savePartialSessionData({ authentication: { accessToken: '1', refreshToken: '1' } });
    expect(sessionStorage.read()).toBe(null);
  });

  it('should support clearing session data from storage', () => {
    sessionStorage.save(sessionData);

    sessionStorage.clear();
    const savedSessionData = window.localStorage.getItem(SESSION_DATA_STORAGE_KEY);
    expect(savedSessionData).toBe(null);
  });
});
