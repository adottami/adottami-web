import { screen } from '@testing-library/react';

import publicationResponseHandler from '@/services/adottami-client/publication-client/__tests__/mocks/publication-response-handler';
import { renderWithTestProviders } from '@tests/utils/render';

import { FORM_LABELS } from '../contants';
import PublicationForm from '../publication-form';

describe('Publication form tests', () => {
  const title = 'test-publication-form-title';
  const onSubmit = jest.fn();

  beforeEach(() => {
    publicationResponseHandler.mockGetCharacteristics([]);
  });

  function renderPublicationForm() {
    renderWithTestProviders(<PublicationForm title={title} type="create" onSubmit={onSubmit} />);
  }

  it('should render publication form correctly', () => {
    renderPublicationForm();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should render publication form with all fields correctly', () => {
    renderPublicationForm();

    FORM_LABELS.forEach((formLabel) => expect(screen.getByText(formLabel)).toBeInTheDocument());
  });

  it('should render publication form with correctly footer, for create version', () => {
    renderWithTestProviders(<PublicationForm title={title} type="create" onSubmit={onSubmit} />);
    expect(screen.getByRole('button', { name: 'Publicar anúncio' })).toBeInTheDocument();
  });

  it('should render publication form with correctly footer, for edit version', () => {
    renderWithTestProviders(<PublicationForm title={title} type="edit" onSubmit={onSubmit} />);
    expect(screen.getByRole('button', { name: 'Salvar alterações' })).toBeInTheDocument();
  });
});
