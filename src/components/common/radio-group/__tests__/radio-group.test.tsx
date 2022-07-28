import { fireEvent, render, screen } from '@testing-library/react';

import RadioGroup from '../radio-group';

describe('Radio Group', () => {
  it('should have radio input disabled correctly', () => {
    render(
      <RadioGroup
        id="sexo"
        label="Sexo"
        options={[
          { value: 'Macho', label: 'Macho', isDisabled: true },
          { value: 'Fêmea', label: 'Fêmea' },
        ]}
      />,
    );
    const radio = screen.getByLabelText('Macho');
    expect(radio).toBeDisabled();
  });

  it('should render list options correctly', async () => {
    const { getByText } = render(
      <RadioGroup
        id="sexo"
        label="Sexo"
        options={[
          { value: 'Macho', label: 'Macho' },
          { value: 'Fêmea', label: 'Fêmea' },
        ]}
      />,
    );

    const options = screen.getAllByRole('radio');

    expect(getByText('Macho')).toBeInTheDocument();
    expect(getByText('Fêmea')).toBeInTheDocument();

    expect(options).toHaveLength(2);
  });

  it('should be checked when handle click', async () => {
    render(
      <RadioGroup
        id="sexo"
        label="Sexo"
        options={[
          { value: 'Macho', label: 'Macho' },
          { value: 'Fêmea', label: 'Fêmea' },
        ]}
      />,
    );

    await fireEvent.click(screen.getByText('Macho'));

    expect(screen.getByLabelText('Macho')).toBeChecked();
  });

  it('should be required', async () => {
    render(<RadioGroup id="sexo" label="Sexo" isRequired options={[]} />);

    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
