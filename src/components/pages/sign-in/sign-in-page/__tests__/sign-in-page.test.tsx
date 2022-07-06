import renderer from 'react-test-renderer';

import SignInPage from '../sign-in-page';

describe('Sign in page', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<SignInPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
