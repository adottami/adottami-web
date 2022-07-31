import { AuthenticationCredentials } from '@/services/adottami-client/types';

export interface SessionData {
  userId: string;
  authentication: AuthenticationCredentials;
}
