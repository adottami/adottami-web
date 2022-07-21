import { screen } from '@testing-library/react';

import { expectPageTitleWithApplicationName } from '@/components/common/page/__tests__/utils';
import { renderWithTestProviders } from '@tests/utils/render';

import { FORM_TITLE, PAGE_TITLE } from '../constants';
import CreatePublicationPage from '../create-publication-page';

describe('Create publication page', () => {
  it('should render correctly', () => {
    renderWithTestProviders(<CreatePublicationPage />);
    expectPageTitleWithApplicationName(PAGE_TITLE);
  });

  it('should render correctly publication form for this page', () => {
    renderWithTestProviders(<CreatePublicationPage />);
    expect(screen.getByText(FORM_TITLE)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Publicar anúncio' })).toBeInTheDocument();
  });
});
