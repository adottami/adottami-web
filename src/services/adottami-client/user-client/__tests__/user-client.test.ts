import axios from 'axios';

import globalConfig from '@/config/global-config/global-config';
import { UserResponse } from '@/models/user/types';
import UserFactory from '@/models/user/user-factory';
import { trackRequests } from '@tests/utils/requests';

import { USERS_ENDPOINT } from '../constants';
import { ChangePasswordData, CreateUserData, EditUserData } from '../types';
import UserClient from '../user-client';
import { getUserEndpoint, getUserPasswordEndpoint } from '../utils';

const baseURL = globalConfig.baseAdottamiURL();

describe('User client', () => {
  const userClient = new UserClient(axios.create({ baseURL }));

  const userResponse: UserResponse = {
    id: '1',
    name: 'User',
    email: 'user@email.com',
    phoneNumber: '1100001111',
  };

  it('should support creating a user', async () => {
    const userData: CreateUserData = {
      name: userResponse.name,
      email: userResponse.email,
      password: 'password',
      phoneNumber: userResponse.phoneNumber,
    };

    const creationRequests = trackRequests(`${baseURL}${USERS_ENDPOINT}`, 'post', {
      responseData: userResponse,
    });

    const createdUser = await userClient.create(userData);

    expect(creationRequests).toHaveLength(1);
    expect(creationRequests[0].body).toEqual(userData);

    const expectedCreatedUser = UserFactory.createFromResponse(userResponse);
    expect(createdUser).toEqual(expectedCreatedUser);
  });

  it('should support getting a user by id', async () => {
    const getRequests = trackRequests(`${baseURL}${getUserEndpoint(':userId')}`, 'get', {
      responseData: userResponse,
    });

    const userId = userResponse.id;
    const user = await userClient.getById(userId);

    expect(getRequests).toHaveLength(1);
    expect(getRequests[0].params).toEqual({ userId });

    const expectedUser = UserFactory.createFromResponse(userResponse);
    expect(user).toEqual(expectedUser);
  });

  it('should support editing a user', async () => {
    const editedUserData: EditUserData = {
      name: 'New User',
      email: 'newuser@email.coom',
      phoneNumber: '2211110000',
    };

    const editedUserResponse: UserResponse = {
      id: userResponse.id,
      name: editedUserData.name,
      email: editedUserData.email,
      phoneNumber: editedUserData.phoneNumber,
    };

    const editRequests = trackRequests(`${baseURL}${getUserEndpoint(':userId')}`, 'put', {
      responseData: editedUserResponse,
    });

    const userId = userResponse.id;
    const editedUser = await userClient.edit(userId, editedUserData);

    expect(editRequests).toHaveLength(1);
    expect(editRequests[0].params).toEqual({ userId });

    const expectedUser = UserFactory.createFromResponse(editedUserResponse);
    expect(editedUser).toEqual(expectedUser);
  });

  it('should support changing the password of a user', async () => {
    const editRequests = trackRequests(`${baseURL}${getUserPasswordEndpoint(':userId')}`, 'patch');

    const passwordData: ChangePasswordData = {
      currentPassword: 'current-password',
      newPassword: 'new-password',
    };

    const userId = userResponse.id;
    await userClient.changePassword(userId, passwordData);

    expect(editRequests).toHaveLength(1);
    expect(editRequests[0].params).toEqual({ userId });
    expect(editRequests[0].body).toEqual(passwordData);
  });
});
