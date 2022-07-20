import { render, screen } from '@testing-library/react';

import { FORM_LABELS } from '../contants';
import PublicationForm from '../publication-form';

describe('Publication form tests', () => {
  const title = 'test-publication-form-title';
  const onSubmit = jest.fn();

  function renderPublicationForm() {
    render(<PublicationForm title={title} type="create" onSubmit={onSubmit} />);
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
    render(<PublicationForm title={title} type="create" onSubmit={onSubmit} />);
    expect(screen.getByRole('button', { name: 'Publicar anúncio' })).toBeInTheDocument();
  });

  it('should render publication form with correctly footer, for edit version', () => {
    render(<PublicationForm title={title} type="edit" onSubmit={onSubmit} />);
    expect(screen.getByRole('button', { name: 'Salvar alterações' })).toBeInTheDocument();
  });
});
