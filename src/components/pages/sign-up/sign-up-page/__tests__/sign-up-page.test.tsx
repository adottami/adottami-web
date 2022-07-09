import renderer from 'react-test-renderer';

import SignUpPage from '../sign-up-page';

describe('Sign up page', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<SignUpPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
