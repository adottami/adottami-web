import { USERS_ENDPOINT } from './constants';

export function getUserEndpoint(userId: string) {
  return `${USERS_ENDPOINT}/${userId}`;
}
