import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RadioGroup from '../radio-group';

describe('Radio Group', () => {
  it('should have radio input disabled correctly', () => {
    render(
      <RadioGroup
        id="sexo"
        label="Sexo"
        options={[
          { id: 'macho', label: 'Macho', isDisabled: true },
          { id: 'femea', label: 'Fêmea' },
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
          { id: 'macho', label: 'Macho' },
          { id: 'femea', label: 'Fêmea' },
        ]}
      />,
    );

    const options = screen.getAllByRole('radio');

    expect(getByText('Macho')).toBeInTheDocument();
    expect(getByText('Fêmea')).toBeInTheDocument();

    expect(options).toHaveLength(2);
  });

  it('handles click correctly', async () => {
    render(
      <RadioGroup
        id="sexo"
        label="Sexo"
        options={[
          { id: 'macho', label: 'Macho' },
          { id: 'femea', label: 'Fêmea' },
        ]}
      />,
    );

    const user = userEvent.setup();
    await user.click(screen.getByText('Macho'));

    expect(screen.getByLabelText('Macho')).toBeChecked();
  });

  it('should be required', async () => {
    render(<RadioGroup id="sexo" label="Sexo" isRequired options={[]} />);

    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
