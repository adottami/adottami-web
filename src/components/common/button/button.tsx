import { FC } from 'react';

// eslint-disable-next-line import/no-cycle
import PrimaryButton, { Props as PrimaryButtonProps } from './primary-button';
import SecondaryButton, { Props as SecondaryButtonProps } from './secondary-button';

type Props = ({ variant: 'primary' } & PrimaryButtonProps) | ({ variant: 'secondary' } & SecondaryButtonProps);

const Button: FC<Props> = ({ size, variant, ...props }) => {
  if (variant === 'primary') return <PrimaryButton size={size} {...props} />;
  if (variant === 'secondary') return <SecondaryButton size={size} {...props} />;

  throw new Error(`Unknown button variant: ${variant}`);
};

export default Button;
