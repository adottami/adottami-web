import SessionContext, { SessionContextValue } from '@/contexts/session-context/session-context';

type Session = SessionContextValue;

function useSession(): Session {
  return SessionContext.useContext();
}

export default useSession;
