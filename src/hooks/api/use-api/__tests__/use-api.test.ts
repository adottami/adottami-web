import { renderHookWithTestProviders } from '@tests/utils/render';

import useAPI from '../use-api';

describe('useAPI', () => {
  it('should initialize correctly', () => {
    renderHookWithTestProviders(useAPI);
    // ...
  });
});
