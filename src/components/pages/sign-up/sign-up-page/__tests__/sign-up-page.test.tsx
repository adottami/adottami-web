import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import { expectPageTitleWithBase } from '@/components/common/page/__tests__/utils';

import { PAGE_TITLE } from '../constants';
import SignUpPage from '../sign-up-page';

describe('Sign up page', () => {
  it('should render correctly', () => {
    render(<SignUpPage />);
    expectPageTitleWithBase(PAGE_TITLE);

    const tree = renderer.create(<SignUpPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
