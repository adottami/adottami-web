import { within } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Checkbox from '../checkbox';

const categories = [
  'Brincalhão',
  'Dócil',
  'Calmo',
  'Sociável',
  'Sociável com crianças',
  'Castrado',
  'Vacinado',
  'Vermifugado',
  'Vive bem em apartamento',
  'Vive bem em casa com quintal',
];

describe('Checkbox', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Checkbox title="Características" options={categories} />);
    expect(getByText('Brincalhão')).toBeInTheDocument();
    expect(getByText('Dócil')).toBeInTheDocument();
    expect(getByText('Calmo')).toBeInTheDocument();
    expect(getByText('Sociável')).toBeInTheDocument();
    expect(getByText('Sociável com crianças')).toBeInTheDocument();
    expect(getByText('Castrado')).toBeInTheDocument();
    expect(getByText('Vacinado')).toBeInTheDocument();
    expect(getByText('Vermifugado')).toBeInTheDocument();
    expect(getByText('Vive bem em apartamento')).toBeInTheDocument();
    expect(getByText('Vive bem em casa com quintal')).toBeInTheDocument();
  });

  it('handles click correctly', async () => {
    const { getByText } = render(<Checkbox title="Características" options={categories} />);
    const user = userEvent.setup();
    const funny = getByText('Brincalhão');
    const sweet = getByText('Dócil');
    const calm = getByText('Calmo');
    const sociable = getByText('Sociável');
    const sociableWithhKids = getByText('Sociável com crianças');
    const castrated = getByText('Castrado');
    const vaccinated = getByText('Vacinado');
    const livesWellInApartment = getByText('Vive bem em apartamento');
    const livesWellInHouseWithBackyard = getByText('Vive bem em casa com quintal');

    await user.click(sociable);
    await user.click(funny);
    await user.click(livesWellInHouseWithBackyard);
    expect(within(sociable).getByRole('checkbox')).toBeChecked();
    expect(within(funny).getByRole('checkbox')).toBeChecked();
    expect(within(livesWellInHouseWithBackyard).getByRole('checkbox')).toBeChecked();
    expect(within(sweet).getByRole('checkbox')).not.toBeChecked();
    expect(within(calm).getByRole('checkbox')).not.toBeChecked();
    expect(within(sociableWithhKids).getByRole('checkbox')).not.toBeChecked();
    expect(within(castrated).getByRole('checkbox')).not.toBeChecked();
    expect(within(vaccinated).getByRole('checkbox')).not.toBeChecked();
    expect(within(livesWellInApartment).getByRole('checkbox')).not.toBeChecked();
  });
});
