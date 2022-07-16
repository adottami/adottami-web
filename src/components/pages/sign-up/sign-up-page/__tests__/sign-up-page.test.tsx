import { renderWithTestProviders } from '@tests/utils/render';

import SignUpPage from '../sign-up-page';

describe('Sign up page', () => {
  it('should render correctly', () => {
    const tree = renderWithTestProviders(<SignUpPage />);
    expect(tree).toMatchSnapshot();
  });
});
