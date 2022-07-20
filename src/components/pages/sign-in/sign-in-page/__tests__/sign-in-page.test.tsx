import { screen } from '@testing-library/dom';

import { expectPageTitleWithApplicationName } from '@/components/common/page/__tests__/utils';
import { renderWithTestProviders } from '@tests/utils/render';

import { PAGE_TITLE, singInPageTestIds } from '../constants';
import SignInPage from '../sign-in-page';

describe('Sign in page', () => {
  it('should render correctly', () => {
    renderWithTestProviders(<SignInPage />);
    expectPageTitleWithApplicationName(PAGE_TITLE);
    expect(screen.getByTestId(singInPageTestIds.title())).toBeInTheDocument();
    expect(screen.getByTestId(singInPageTestIds.emailInput())).toBeInTheDocument();
    expect(screen.getByTestId(singInPageTestIds.passwordInput())).toBeInTheDocument();
    expect(screen.getByTestId(singInPageTestIds.decorativeImage())).toBeInTheDocument();
    expect(screen.getByTestId(singInPageTestIds.button())).toBeInTheDocument();
    expect(screen.getByText(/Cadastre-se/i)).toBeInTheDocument();
  });
});
