import { AxiosInstance } from 'axios';

import { UserResponse } from '@/models/user/types';
import User from '@/models/user/user';
import UserFactory from '@/models/user/user-factory';

import { USERS_ENDPOINT } from './constants';
import { ChangePasswordData, CreateUserData, EditUserData } from './types';
import { getUserEndpoint, getUserPasswordEndpoint } from './utils';

class UserClient {
  constructor(private api: AxiosInstance) {}

  async create(userData: CreateUserData): Promise<User> {
    const { data: createdUserResponse } = await this.api.post<UserResponse>(USERS_ENDPOINT, userData);
    const createdUser = UserFactory.createFromResponse(createdUserResponse);
    return createdUser;
  }

  async getById(userId: string): Promise<User | null> {
    const { data: userResponse } = await this.api.get<UserResponse | null>(getUserEndpoint(userId));
    const user = userResponse ? UserFactory.createFromResponse(userResponse) : null;
    return user;
  }

  async edit(userId: string, userData: EditUserData): Promise<User> {
    const { data: editedUserResponse } = await this.api.put<UserResponse>(getUserEndpoint(userId), userData);
    const editedUser = UserFactory.createFromResponse(editedUserResponse);
    return editedUser;
  }

  async changePassword(userId: string, passwordData: ChangePasswordData) {
    await this.api.patch(getUserPasswordEndpoint(userId), passwordData);
  }
}

export default UserClient;
