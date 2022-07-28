import { expectPageTitleWithApplicationName } from '@/components/common/page/__tests__/utils';
import { renderWithTestProviders } from '@tests/utils/render';

import { PAGE_TITLE } from '../constants';
import EditPublicationPage from '../edit-publication-page';

describe('Edit publication page', () => {
  it('should render correctly', () => {
    renderWithTestProviders(<EditPublicationPage />);
    expectPageTitleWithApplicationName(PAGE_TITLE);
  });
});
