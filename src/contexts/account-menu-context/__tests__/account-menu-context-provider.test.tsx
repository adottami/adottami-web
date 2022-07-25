import { render } from '@testing-library/react';
import { FC } from 'react';

import APIContextProvider from '@/contexts/api-context/api-context-provider';
import SessionContextProvider from '@/contexts/session-context/session-context-provider';

import AccountMenuContext, { AccountMenuContextValue } from '../account-menu-context';
import AccountMenuContextProvider from '../account-menu-context-provider';

describe('AccountMenu context provider', () => {
  let accountMenu: AccountMenuContextValue;

  const ChildrenComponent: FC = () => {
    accountMenu = AccountMenuContext.useContext();
    return null;
  };

  function renderAccountMenuContext() {
    render(
      <AccountMenuContextProvider>
        <APIContextProvider>
          <SessionContextProvider>
            <ChildrenComponent />
          </SessionContextProvider>
        </APIContextProvider>
      </AccountMenuContextProvider>,
    );
  }

  it('should initialize correctly', () => {
    renderAccountMenuContext();

    expect(accountMenu.page).toEqual('my-cadastre');
    expect(accountMenu.setPage).toEqual(expect.any(Function));
  });
});
