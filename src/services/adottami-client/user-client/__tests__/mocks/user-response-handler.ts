import { UserResponse } from '@/models/user/types';
import { withBaseAdottamiURL } from '@/services/adottami-client/utils';
import { TrackedRequest, trackRequests } from '@tests/utils/requests';

import { USERS_ENDPOINT } from '../../constants';
import { getUserEndpoint, getUserPasswordEndpoint } from '../../utils';

class UserResponseHandler {
  mockCreate(userResponse: UserResponse): TrackedRequest[] {
    const creationRequests = trackRequests(withBaseAdottamiURL(USERS_ENDPOINT), 'post', { responseData: userResponse });
    return creationRequests;
  }

  mockGetById(
    userId: string,
    userResponse: UserResponse | null,
    options: { responseCode?: number } = {},
  ): TrackedRequest[] {
    const getRequests = trackRequests(withBaseAdottamiURL(getUserEndpoint(userId)), 'get', {
      responseData: userResponse,
      responseCode: options?.responseCode,
    });
    return getRequests;
  }

  mockEdit(userId: string, userResponse: UserResponse): TrackedRequest[] {
    const editRequests = trackRequests(withBaseAdottamiURL(getUserEndpoint(userId)), 'put', {
      responseData: userResponse,
    });
    return editRequests;
  }

  mockChangePassword(userId: string): TrackedRequest[] {
    const changePasswordRequests = trackRequests(withBaseAdottamiURL(getUserPasswordEndpoint(userId)), 'patch');
    return changePasswordRequests;
  }
}

const userResponseHandler = new UserResponseHandler();

export default userResponseHandler;
