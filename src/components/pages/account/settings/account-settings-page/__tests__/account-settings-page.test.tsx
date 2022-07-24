import { act, render, screen } from '@testing-library/react';

import { expectPageTitleWithApplicationName } from '@/components/common/page/__tests__/utils';
import AccountMenuContextProvider from '@/contexts/account-menu-context/account-menu-context-provider';
import APIContextProvider from '@/contexts/api-context/api-context-provider';
import SessionContextProvider from '@/contexts/session-context/session-context-provider';
import { renderWithTestProviders } from '@tests/utils/render';

import AccountSettingsPage from '../account-settings-page';
import { SECTION_TITLE as LOGIN_AND_SECURITY_SECTION_TITLE } from '../components/login-and-security/constants';
import { SECTION_TITLE as MY_CADASTRE_SECTION_TITLE } from '../components/my-cadastre/constants';
import { PAGE_TITLE } from '../constants';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/account/settings',
    };
  },
}));

describe('Account settings page', () => {
  it('should render correctly', () => {
    renderWithTestProviders(
      <AccountMenuContextProvider>
        <AccountSettingsPage />
      </AccountMenuContextProvider>,
    );
    expectPageTitleWithApplicationName(PAGE_TITLE);
  });

  it('should render account settings page on my cadastre section correctly', () => {
    render(
      <AccountMenuContextProvider>
        <APIContextProvider>
          <SessionContextProvider>
            <AccountSettingsPage />
          </SessionContextProvider>
        </APIContextProvider>
      </AccountMenuContextProvider>,
    );
    act(() => {
      screen.getByRole('button', { name: MY_CADASTRE_SECTION_TITLE }).click();
    });
    expect(screen.getByRole('heading', { name: MY_CADASTRE_SECTION_TITLE })).toBeInTheDocument();
  });

  it('should render account settings page on login and security section correctly', () => {
    renderWithTestProviders(
      <AccountMenuContextProvider>
        <AccountSettingsPage />
      </AccountMenuContextProvider>,
    );
    act(() => {
      screen.getByRole('button', { name: LOGIN_AND_SECURITY_SECTION_TITLE }).click();
    });
    expect(screen.getByRole('heading', { name: LOGIN_AND_SECURITY_SECTION_TITLE })).toBeInTheDocument();
  });
});
