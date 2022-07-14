import { render } from '@testing-library/react';

import { expectPageTitleWithBase } from '@/components/common/page/__tests__/utils';

import AccountSettingsPage from '../account-settings-page';
import { PAGE_TITLE } from '../constants';

describe('Account settings page', () => {
  it('should render correctly', () => {
    render(<AccountSettingsPage />);
    expectPageTitleWithBase(PAGE_TITLE);
  });
});
