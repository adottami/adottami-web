import { expectPageTitleWithApplicationName } from '@/components/common/page/__tests__/utils';
import SignUpPage from '@/pages/sign-up';
import { renderWithTestProviders } from '@tests/utils/render';

import { PAGE_TITLE } from '../constants';

describe('Sign up page', () => {
  it('should render correctly', () => {
    const tree = renderWithTestProviders(<SignUpPage />);
    expectPageTitleWithApplicationName(PAGE_TITLE);

    expect(tree).toMatchSnapshot();
  });
});
