import clsx from 'clsx';
import { FC } from 'react';

import LoadingIcon from '@/components/icons/loading-icon';
import { HTMLButtonProps } from '@/types/html';

import { buttonTestIds } from './constants';

type ButtonSize = 'lg' | 'md' | 'sm';

type ButtonVariant = 'primary' | 'secondary';

export interface Props extends HTMLButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  loading?: boolean;
  RightIcon?: () => JSX.Element;
  LeftIcon?: () => JSX.Element;
}

const Button: FC<Props> = ({
  size = 'lg',
  children,
  className,
  variant = 'primary',
  loading: isLoading,
  LeftIcon,
  RightIcon,
  ...rest
}) => (
  <button
    className={clsx(
      className,
      'relative flex items-center justify-center gap-3 rounded-pill font-bold text-white shadow-current hover:opacity-80 focus:border-2  disabled:cursor-not-allowed disabled:opacity-50',
      variant === 'primary' && 'bg-secondary-medium focus:border-secondary-light',
      variant === 'secondary' && 'bg-tertiary-medium focus:border-tertiary-light',
      size === 'lg' && 'h-16 p-8',
      size === 'md' && 'h-12 p-6',
      size === 'sm' && 'h-10 p-5',
      !children && 'px-2',
    )}
    data-testid={variant === 'primary' ? buttonTestIds.primary() : buttonTestIds.secondary()}
    {...rest}
  >
    {LeftIcon && <LeftIcon />}
    {!isLoading && children}
    {RightIcon && <RightIcon />}

    <LoadingIcon
      aria-hidden={!isLoading}
      className={clsx(
        'absolute h-6 w-6 animate-spin text-white transition-opacity',
        isLoading ? 'opacity-1' : 'opacity-0',
      )}
      data-testid={buttonTestIds.loadingIcon()}
    />
  </button>
);

export default Button;
