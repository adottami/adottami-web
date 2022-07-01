import { FC } from 'react';

import AdottamiClient from '@/services/adottami-client/adottami-client';
import { renderWithTestProviders } from '@tests/utils/render';

import APIContext, { APIContextValue } from '../api-context';
import APIContextProvider from '../api-context-provider';

describe('API context provider', () => {
  let api: APIContextValue;

  const ChildrenComponent: FC = () => {
    api = APIContext.useContext();
    return null;
  };

  beforeEach(() => {
    renderWithTestProviders(
      <APIContextProvider>
        <ChildrenComponent />
      </APIContextProvider>,
    );
  });

  it('should initialize correctly', () => {
    expect(api.adottami).toBeInstanceOf(AdottamiClient);
    expect(api.setAdottami).toEqual(expect.any(Function));
  });
});
