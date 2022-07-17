import { render } from '@testing-library/react';

import { expectPageTitleWithApplicationName } from '@/components/common/page/__tests__/utils';

import { PAGE_TITLE } from '../constants';
import CreatePublicationPage from '../create-publication-page';

describe('Create publication page', () => {
  it('should render correctly', () => {
    render(<CreatePublicationPage />);
    expectPageTitleWithApplicationName(PAGE_TITLE);
  });
});
