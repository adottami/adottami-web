import { render } from '@testing-library/react';

import { expectPageTitleWithApplicationName } from '@/components/common/page/__tests__/utils';

import { PAGE_TITLE } from '../constants';
import PublicationDashboardPage from '../publication-dashboard-page';

describe('Publication dashboard page', () => {
  it('should render correctly', () => {
    render(<PublicationDashboardPage />);
    expectPageTitleWithApplicationName(PAGE_TITLE);
  });
});
