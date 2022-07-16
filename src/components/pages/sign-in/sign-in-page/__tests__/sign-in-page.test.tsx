import { expectPageTitleWithApplicationName } from '@/components/common/page/__tests__/utils';
import { renderWithTestProviders } from '@tests/utils/render';

import { PAGE_TITLE } from '../constants';
import SignInPage from '../sign-in-page';

describe('Sign up page', () => {
  it('should render correctly', () => {
    const tree = renderWithTestProviders(<SignInPage />);
    expectPageTitleWithApplicationName(PAGE_TITLE);

    expect(tree).toMatchSnapshot();
  });
});
