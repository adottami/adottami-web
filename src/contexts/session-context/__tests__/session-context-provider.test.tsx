import { renderWithTestProviders } from '@tests/utils/render';

import SessionContextProvider from '../session-context-provider';

describe('Session context provider', () => {
  it('should initialize correctly', () => {
    renderWithTestProviders(<SessionContextProvider />);
    // ...
  });
});
