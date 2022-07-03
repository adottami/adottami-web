import User from '@/models/user/user';
import { LoginCredentials } from '@/services/adottami-client/session-client/types';
import { createContext } from '@/utils/contexts';

export interface SessionContextValue {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<User>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextValue>('SessionContext');

export default SessionContext;
