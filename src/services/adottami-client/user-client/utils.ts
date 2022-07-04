import { USERS_ENDPOINT } from './constants';

export function getUserEndpoint(userId: string) {
  return `${USERS_ENDPOINT}/${userId}`;
}

export function getUserPasswordEndpoint(userId: string) {
  return `${getUserEndpoint(userId)}/password`;
}
