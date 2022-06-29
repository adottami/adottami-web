import { renderHookWithTestProviders } from '@tests/utils/render';

import useSession from '../use-session';

describe('useSession', () => {
  it('should initialize correctly', () => {
    renderHookWithTestProviders(useSession);
    // ...
  });
});
