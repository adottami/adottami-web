import { expectPageTitleWithApplicationName } from '@/components/common/page/__tests__/utils';
import publicationResponseHandler from '@/services/adottami-client/publication-client/__tests__/mocks/publication-response-handler';
import { renderWithTestProviders } from '@tests/utils/render';

import { PAGE_TITLE } from '../constants';
import EditPublicationPage from '../edit-publication-page';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/',
      push: jest.fn(),
    };
  },
}));

describe('Edit publication page', () => {
  beforeEach(() => {
    publicationResponseHandler.mockGetCharacteristics([]);
  });

  it('should render correctly', () => {
    renderWithTestProviders(<EditPublicationPage />);
    expectPageTitleWithApplicationName(PAGE_TITLE);
  });
});
