import { DeepPartial } from '@/types/utils';

import { SESSION_DATA_STORAGE_KEY } from './constants';
import { SessionData } from './types';

class SessionStorageClient {
  save(sessionData: SessionData) {
    window.localStorage.setItem(SESSION_DATA_STORAGE_KEY, JSON.stringify(sessionData));
  }

  read(): SessionData | null {
    const stringifiedSessionData = window.localStorage.getItem(SESSION_DATA_STORAGE_KEY);
    if (!stringifiedSessionData) return null;

    const sessionData: DeepPartial<SessionData> = JSON.parse(stringifiedSessionData);

    const isValidSessionData =
      !!sessionData.userId &&
      !!sessionData.authentication &&
      !!sessionData.authentication.accessToken &&
      !!sessionData.authentication.refreshToken;

    return isValidSessionData ? (sessionData as SessionData) : null;
  }

  clear() {
    window.localStorage.removeItem(SESSION_DATA_STORAGE_KEY);
  }
}

export default SessionStorageClient;
