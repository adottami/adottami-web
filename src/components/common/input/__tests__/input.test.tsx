import { render, screen, fireEvent } from '@testing-library/react';
import { XCircle } from 'phosphor-react';

import Input from '../input';

describe('Input', () => {
  // now starts the default Input tests
  it('should render correctly', () => {
    render(<Input />);
    // ...
  });
  it('should start with empty value only with the placeholder in input', () => {
    render(<Input placeholder="Some placeholder" />);

    const inputValue = screen.getByDisplayValue('');
    const placeholder = screen.getByPlaceholderText('Some placeholder');

    expect(inputValue).toBeInTheDocument();
    expect(placeholder).toBeInTheDocument();
  });
  it('should render label correctly', () => {
    render(<Input label="Some Label" />);

    const input = screen.getByText('Some Label');

    expect(input).toBeInTheDocument();
  });
  it('should display error message and icon correctly', () => {
    render(<Input errorMessage="Some Error Message" placeholder="Some placeholder" />);

    const errorMessage = screen.getByText('Some Error Message');

    expect(errorMessage).toBeInTheDocument();
    expect(render(<XCircle size={24} color="#e66860" />));
  });
  it('should be able to write on input', () => {
    render(<Input placeholder="Some placeholder" />);

    const input = screen.getByPlaceholderText('Some placeholder');

    fireEvent.change(input, {
      target: { value: 'Some text' },
    });

    const inputValue = screen.getByDisplayValue('Some text');

    expect(inputValue).toBeInTheDocument();
  });
  it('should be able to render description', () => {
    render(<Input placeholder="Some placeholder" description="Some Description" />);

    const description = screen.getByText('Some Description');

    expect(description).toBeInTheDocument();
  });
  it('should be able to render description and error at the same time', () => {
    render(<Input placeholder="Some placeholder" errorMessage="Error Message" description="Some Description" />);

    const description = screen.getByText('Some Description');
    const errorMessage = screen.getByText('Error Message');

    expect(description).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });
  it('should render star when required and label is present', () => {
    const { debug } = render(
      <Input placeholder="Some placeholder" isRequired label="Some Label" description="Some Description" />,
    );
    debug();
    const star = screen.getByText('*');

    expect(star).toBeInTheDocument();
  });
  // now starts the password variant Input tests
});
