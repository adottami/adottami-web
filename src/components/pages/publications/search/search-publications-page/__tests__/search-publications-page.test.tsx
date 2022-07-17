import { render } from '@testing-library/react';

import { expectPageTitleWithApplicationName } from '@/components/common/page/__tests__/utils';

import { PAGE_TITLE } from '../constants';
import SearchPublicationsPage from '../search-publications-page';

describe('Search publication page', () => {
  it('should render correctly', () => {
    render(<SearchPublicationsPage />);
    expectPageTitleWithApplicationName(PAGE_TITLE);
  });
});
