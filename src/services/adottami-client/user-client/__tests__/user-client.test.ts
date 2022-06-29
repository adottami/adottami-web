import axios from 'axios';

import globalConfig from '@/config/global-config/global-config';
import { UserResponse } from '@/models/user/types';
import UserFactory from '@/models/user/user-factory';
import { trackRequests } from '@tests/utils/requests';

import { USERS_ENDPOINT } from '../constants';
import { CreateUserData } from '../types';
import UserClient from '../user-client';

const baseURL = globalConfig.baseAdottamiURL();

describe('User client', () => {
  const userClient = new UserClient(axios.create({ baseURL }));

  it('should support creating a user', async () => {
    const userData: CreateUserData = {
      name: 'User',
      email: 'user@example.com',
      password: 'password',
      phoneNumber: '1100001111',
    };

    const createdUserResponse: UserResponse = {
      id: '1',
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
    };

    const creationRequests = trackRequests(`${baseURL}${USERS_ENDPOINT}`, 'post', {
      responseData: createdUserResponse,
    });

    const createdUser = await userClient.createUser(userData);

    expect(creationRequests).toHaveLength(1);
    expect(creationRequests[0].body).toEqual(userData);

    const expectedCreatedUser = UserFactory.createFromResponse(createdUserResponse);
    expect(createdUser).toEqual(expectedCreatedUser);
  });
});
