import { renderWithTestProviders } from '@tests/utils/render';

import APIContextProvider from '../api-context-provider';

describe('API context', () => {
  it('should initialize correctly', () => {
    renderWithTestProviders(<APIContextProvider />);
    // ...
  });
});
