import { render, screen, fireEvent } from '@testing-library/react';

import TextArea from '../text-area';

describe('Text area', () => {
  it('should render label correctly', () => {
    render(<TextArea label="Descrição" />);

    const textArea = screen.getByText('Descrição');
    expect(textArea).toBeInTheDocument();
  });
  it('should display error message and icon correctly', () => {
    render(<TextArea errorMessage="Some Error Message" placeholder="Some placeholder" />);

    const errorMessage = screen.getByText('Some Error Message');

    expect(errorMessage).toBeInTheDocument();
  });
  it('should be able to write on input', () => {
    render(<TextArea placeholder="Some placeholder" />);

    const input = screen.getByPlaceholderText('Some placeholder');

    fireEvent.change(input, {
      target: { value: 'Some text' },
    });

    const inputValue = screen.getByDisplayValue('Some text');

    expect(inputValue).toBeInTheDocument();
  });
  it('should be able to render description', () => {
    render(<TextArea placeholder="Some placeholder" description="Some Description" />);

    const description = screen.getByText('Some Description');

    expect(description).toBeInTheDocument();
  });
  it('should be able to render description and error at the same time', () => {
    render(<TextArea placeholder="Some placeholder" errorMessage="Error Message" description="Some Description" />);

    const description = screen.getByText('Some Description');
    const errorMessage = screen.getByText('Error Message');

    expect(description).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });
  it('should render star when required and label is present', () => {
    render(<TextArea label="Descrição" isRequired />);

    const start = screen.getByText('*');
    expect(start).toBeInTheDocument();
  });
});
