import APIContext from '@/contexts/api-context/api-context';
import AdottamiClient from '@/services/adottami-client/adottami-client';
import { renderHookWithTestProviders } from '@tests/utils/render';

import useAPI from '../use-api';

describe('useAPI', () => {
  it('should initialize correctly', () => {
    const useAPIContextSpy = jest.spyOn(APIContext, 'useContext');

    const { result } = renderHookWithTestProviders(useAPI);

    expect(useAPIContextSpy).toHaveBeenCalled();
    expect(result.current.adottami).toBeInstanceOf(AdottamiClient);
    expect(result.current.setAdottami).toEqual(expect.any(Function));
  });
});
