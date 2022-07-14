import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import { expectPageTitleWithApplicationName } from '@/components/common/page/__tests__/utils';

import { PAGE_TITLE } from '../constants';
import SignInPage from '../sign-in-page';

describe('Sign in page', () => {
  it('should render correctly', () => {
    render(<SignInPage />);
    expectPageTitleWithApplicationName(PAGE_TITLE);

    const tree = renderer.create(<SignInPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
