import { expectPageTitleWithApplicationName } from '@/components/common/page/__tests__/utils';
import { renderWithTestProviders } from '@tests/utils/render';

import { PAGE_TITLE } from '../constants';
import { PageQueryKey } from '../hooks/use-page-parameters/types';
import PublicationDetailsPage from '../publication-details-page';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/publications/details/publication-details-page',
      query: { [PageQueryKey.PUBLICATION_ID]: '1' },
    };
  },
}));

describe('Publication details page', () => {
  it('should render correctly', () => {
    renderWithTestProviders(<PublicationDetailsPage />);
    expectPageTitleWithApplicationName(PAGE_TITLE);
  });
});
