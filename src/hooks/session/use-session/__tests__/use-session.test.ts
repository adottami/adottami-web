import SessionContext from '@/contexts/session-context/session-context';
import { renderHookWithTestProviders } from '@tests/utils/render';

import useSession from '../use-session';

describe('useSession', () => {
  it('should initialize correctly', () => {
    const useSessionContextSpy = jest.spyOn(SessionContext, 'useContext');

    const { result } = renderHookWithTestProviders(useSession);

    expect(useSessionContextSpy).toHaveBeenCalled();
    expect(result.current.user).toBe(null);
    expect(result.current.login).toEqual(expect.any(Function));
    expect(result.current.logout).toEqual(expect.any(Function));
    expect(result.current.isLoading).toBe(false);
  });
});
