import { render } from '@testing-library/react';

import { expectPageTitleWithApplicationName } from '@/components/common/page/__tests__/utils';

import { PAGE_TITLE } from '../constants';
import PublicationDetailsPage from '../publication-details-page';

describe('Publication details page', () => {
  it('should render correctly', () => {
    render(<PublicationDetailsPage />);
    expectPageTitleWithApplicationName(PAGE_TITLE);
  });
});
