import { UserFields, UserResponse } from './types';
import User from './user';

class UserFactory {
  static createFromResponse(response: UserResponse) {
    return new User(this.mapResponseToFields(response));
  }

  static mapResponseToFields(response: UserResponse): UserFields {
    return {
      id: response.id,
      name: response.name,
      email: response.email,
      phoneNumber: response.phoneNumber,
    };
  }

  static toResponse(user: User): UserResponse {
    return {
      id: user.id(),
      name: user.name(),
      email: user.email(),
      phoneNumber: user.phoneNumber(),
    };
  }
}

export default UserFactory;
