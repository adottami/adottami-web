import { screen } from '@testing-library/react';

import { renderWithTestProviders } from '@tests/utils/render';

import { footerTestIds } from '../constants';
import Footer from '../footer';

describe('Footer', () => {
  it('should render footer correctly', () => {
    renderWithTestProviders(<Footer />);

    expect(screen.getByTestId(footerTestIds.logo())).toBeInTheDocument();
    expect(screen.getByTestId(footerTestIds.description())).toBeInTheDocument();
    expect(screen.getByTestId(footerTestIds.inlineLinks())).toBeInTheDocument();
    expect(screen.getByTestId(footerTestIds.copyright())).toBeInTheDocument();
    expect(screen.getByTestId(footerTestIds.policyAndTerms())).toBeInTheDocument();
  });
});
