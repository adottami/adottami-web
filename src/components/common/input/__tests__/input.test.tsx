import { render, screen, fireEvent } from '@testing-library/react';
import { Eye, EyeSlash, XCircle } from 'phosphor-react';

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
    render(<Input placeholder="Some placeholder" isRequired label="Some Label" description="Some Description" />);
    const star = screen.getByText('*');

    expect(star).toBeInTheDocument();
  });
  // now starts the password variant Input tests
  it('should render correctly password input', () => {
    render(<Input variant="password" />);
    // ...
  });
  it('should start with empty value only with the placeholder in password input', () => {
    render(<Input variant="password" placeholder="Some placeholder" />);

    const inputValue = screen.getByDisplayValue('');
    const placeholder = screen.getByPlaceholderText('Some placeholder');

    expect(inputValue).toBeInTheDocument();
    expect(placeholder).toBeInTheDocument();
  });
  it('should render label correctly in password input', () => {
    render(<Input variant="password" label="Some Label" />);

    const input = screen.getByText('Some Label');

    expect(input).toBeInTheDocument();
  });
  it('should display error message and icon correctly in password input', () => {
    render(<Input variant="password" errorMessage="Some Error Message" placeholder="Some placeholder" />);

    const errorMessage = screen.getByText('Some Error Message');

    expect(errorMessage).toBeInTheDocument();
    expect(render(<XCircle size={24} color="#e66860" />));
  });
  it('should be able to write in password input', () => {
    render(<Input variant="password" placeholder="Some placeholder" />);

    const input = screen.getByPlaceholderText('Some placeholder');

    fireEvent.change(input, {
      target: { value: 'Some text' },
    });

    const inputValue = screen.getByDisplayValue('Some text');

    expect(inputValue).toBeInTheDocument();
  });
  it('should be able to render description in password input', () => {
    render(<Input variant="password" placeholder="Some placeholder" description="Some Description" />);

    const description = screen.getByText('Some Description');

    expect(description).toBeInTheDocument();
  });
  it('should be able to render description and error at the same time in password input', () => {
    render(
      <Input
        variant="password"
        placeholder="Some placeholder"
        errorMessage="Error Message"
        description="Some Description"
      />,
    );

    const description = screen.getByText('Some Description');
    const errorMessage = screen.getByText('Error Message');

    expect(description).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });
  it('should render star when required and label is present in password input', () => {
    render(
      <Input
        variant="password"
        placeholder="Some placeholder"
        isRequired
        label="Some Label"
        description="Some Description"
      />,
    );
    const star = screen.getByText('*');

    expect(star).toBeInTheDocument();
  });
  // now starts especific password input tests
  it('should start with eye slash and password not visible in password input', () => {
    render(<Input variant="password" placeholder="Some placeholder" label="Some Label" />);

    const inputPassword = screen.getByPlaceholderText('Some placeholder');

    expect(inputPassword).toHaveAttribute('type', 'password');
    expect(render(<EyeSlash size={24} />));
  });
  it('should switch to eye without slash and input must be visible when click on toggle visibility button', () => {
    render(<Input variant="password" placeholder="Some placeholder" label="Some Label" />);

    const inputPassword = screen.getByPlaceholderText('Some placeholder');
    expect(inputPassword).toHaveAttribute('type', 'password');

    expect(render(<EyeSlash size={24} />));
    const turnVisibleButton = screen.getByTestId('turn-visible');

    fireEvent.click(turnVisibleButton);
    expect(render(<Eye size={24} />));
    const inputPasswordAfterClick = screen.getByPlaceholderText('Some placeholder');
    expect(inputPasswordAfterClick).toHaveAttribute('type', 'text');
  });
  it('should switch to eyeslash and input must be invisible when click on toggle visibility button', () => {
    render(<Input variant="password" placeholder="Some placeholder" label="Some Label" />);

    const inputPassword = screen.getByPlaceholderText('Some placeholder');
    expect(inputPassword).toHaveAttribute('type', 'password');

    expect(render(<EyeSlash size={24} />));
    const turnVisibleButton = screen.getByTestId('turn-visible');

    fireEvent.click(turnVisibleButton);
    expect(render(<Eye size={24} />));
    const inputPasswordAfterClick = screen.getByPlaceholderText('Some placeholder');
    expect(inputPasswordAfterClick).toHaveAttribute('type', 'text');

    const turnInvisibleButton = screen.getByTestId('turn-invisible');
    fireEvent.click(turnInvisibleButton);

    const inputPasswordSecondChange = screen.getByPlaceholderText('Some placeholder');
    expect(inputPasswordSecondChange).toHaveAttribute('type', 'password');
  });
  it('should have password invisible when disable', () => {
    render(<Input variant="password" disabled placeholder="Some placeholder" label="Some Label" />);

    const inputPassword = screen.getByPlaceholderText('Some placeholder');
    expect(inputPassword).toHaveAttribute('type', 'password');
  });
});
