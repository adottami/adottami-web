import { AxiosInstance } from 'axios';

import { UserResponse } from '@/models/user/types';
import UserFactory from '@/models/user/user-factory';

import { USERS_ENDPOINT } from './constants';
import { CreateUserData } from './types';

class UserClient {
  constructor(private api: AxiosInstance) {}

  async createUser(userData: CreateUserData) {
    const { data: userResponse } = await this.api.post<UserResponse>(USERS_ENDPOINT, userData);
    const user = UserFactory.createFromResponse(userResponse);
    return user;
  }
}

export default UserClient;
