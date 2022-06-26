import { renderWithTestProviders } from '@tests/utils/render';

import APIContextProvider from '../api-context-provider';

describe('API context provider', () => {
  it('should initialize correctly', () => {
    renderWithTestProviders(<APIContextProvider />);
    // ...
  });
});
