import axios from 'axios';

import globalConfig from '@/config/global-config/global-config';
import { UserResponse } from '@/models/user/types';
import UserFactory from '@/models/user/user-factory';

import { ChangePasswordData, CreateUserData, EditUserData } from '../types';
import UserClient from '../user-client';
import userResponseHandler from './mocks/user-response-handler';

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
      phoneNumber: userResponse.phoneNumber!,
    };

    const creationRequests = userResponseHandler.mockCreate(userResponse);

    const createdUser = await userClient.create(userData);

    expect(creationRequests).toHaveLength(1);
    expect(creationRequests[0].body).toEqual(userData);

    const expectedCreatedUser = UserFactory.createFromResponse(userResponse);
    expect(createdUser).toEqual(expectedCreatedUser);
  });

  it('should support getting an existing user by id', async () => {
    const getRequests = userResponseHandler.mockGetById(':userId', userResponse);

    const userId = userResponse.id;
    const user = await userClient.getById(userId);

    expect(getRequests).toHaveLength(1);
    expect(getRequests[0].params).toEqual({ userId });

    const expectedUser = UserFactory.createFromResponse(userResponse);
    expect(user).toEqual(expectedUser);
  });

  it('should support getting a non-existing user by id', async () => {
    userResponseHandler.mockGetById(':userId', null);
    const user = await userClient.getById(userResponse.id);
    expect(user).toBe(null);
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

    const editRequests = userResponseHandler.mockEdit(':userId', editedUserResponse);

    const userId = userResponse.id;
    const editedUser = await userClient.edit(userId, editedUserData);

    expect(editRequests).toHaveLength(1);
    expect(editRequests[0].params).toEqual({ userId });

    const expectedUser = UserFactory.createFromResponse(editedUserResponse);
    expect(editedUser).toEqual(expectedUser);
  });

  it('should support changing the password of a user', async () => {
    const changePasswordRequests = userResponseHandler.mockChangePassword(':userId');

    const passwordData: ChangePasswordData = {
      currentPassword: 'current-password',
      newPassword: 'new-password',
    };

    const userId = userResponse.id;
    await userClient.changePassword(userId, passwordData);

    expect(changePasswordRequests).toHaveLength(1);
    expect(changePasswordRequests[0].params).toEqual({ userId });
    expect(changePasswordRequests[0].body).toEqual(passwordData);
  });
});
