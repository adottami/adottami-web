import { withBaseAdottamiURL } from '@/services/adottami-client/utils';
import { TrackedRequest, trackRequests } from '@tests/utils/requests';

import { LOGIN_ENDPOINT, ACCESS_TOKEN_ENDPOINT, LOGOUT_ENDPOINT } from '../../constants';
import { LoginResponse } from '../../types';

class SessionResponseHandler {
  mockLogin(loginResponse: LoginResponse): TrackedRequest[] {
    const loginRequests = trackRequests(withBaseAdottamiURL(LOGIN_ENDPOINT), 'post', {
      responseData: loginResponse,
    });
    return loginRequests;
  }

  mockRequestAccessToken(
    accessToken: string,
    options: {
      responseCode?: number;
      beforeSendingResponse?: () => void;
    } = {},
  ): TrackedRequest[] {
    const accessTokenRequests = trackRequests(withBaseAdottamiURL(ACCESS_TOKEN_ENDPOINT), 'post', {
      responseData: { accessToken },
      responseCode: options.responseCode,
      beforeSendingResponse: options.beforeSendingResponse,
    });
    return accessTokenRequests;
  }

  mockLogout(): TrackedRequest[] {
    const logoutRequests = trackRequests(withBaseAdottamiURL(LOGOUT_ENDPOINT), 'post');
    return logoutRequests;
  }
}

const sessionResponseHandler = new SessionResponseHandler();

export default sessionResponseHandler;
