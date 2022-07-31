import { screen } from '@testing-library/dom';

import { expectPageTitleWithApplicationName } from '@/components/common/page/__tests__/utils';
import { renderWithTestProviders } from '@tests/utils/render';

import { PAGE_TITLE, signUpPageTestIds } from '../constants';
import SignUpPage from '../sign-up-page';

describe('Sign up page', () => {
  it('should render correctly', () => {
    renderWithTestProviders(<SignUpPage />);
    expectPageTitleWithApplicationName(PAGE_TITLE);
    expect(screen.getByTestId(signUpPageTestIds.title())).toBeInTheDocument();
    expect(screen.getByTestId(signUpPageTestIds.emailInput())).toBeInTheDocument();
    expect(screen.getByTestId(signUpPageTestIds.passwordInput())).toBeInTheDocument();
    expect(screen.getByTestId(signUpPageTestIds.decorativeImage())).toBeInTheDocument();
    expect(screen.getByTestId(signUpPageTestIds.button())).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});
