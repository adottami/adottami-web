import { render } from '@testing-library/react';

import { expectPageTitleWithApplicationName } from '@/components/common/page/__tests__/utils';

import { PAGE_TITLE } from '../constants';
import EditPublicationPage from '../edit-publication-page';

describe('Edit publication page', () => {
  it('should render correctly', () => {
    render(<EditPublicationPage />);
    expectPageTitleWithApplicationName(PAGE_TITLE);
  });
});
