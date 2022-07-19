import { render } from '@testing-library/react';

import { expectPageTitleWithApplicationName } from '@/components/common/page/__tests__/utils';

import AccountSettingsPage from '../account-settings-page';
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
});
