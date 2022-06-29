import { createContext } from '@/utils/contexts';

export interface SessionContextValue {}

const SessionContext = createContext<SessionContextValue>('SessionContext');

export default SessionContext;
