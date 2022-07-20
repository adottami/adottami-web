import { act, render, screen } from '@testing-library/react';

import { expectPageTitleWithApplicationName } from '@/components/common/page/__tests__/utils';

import AccountSettingsPage from '../account-settings-page';
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
    render(<AccountSettingsPage />);
    expectPageTitleWithApplicationName(PAGE_TITLE);
  });

  it('should render account settings page on my cadastre section correctly', () => {
    render(<AccountSettingsPage />);
    act(() => {
      screen.getByRole('button', { name: MY_CADASTRE_SECTION_TITLE }).click();
    });
    expect(screen.getByRole('heading', { name: MY_CADASTRE_SECTION_TITLE })).toBeInTheDocument();
  });
});
