import clsx from 'clsx';
import { FC } from 'react';

import LoadingIcon from '@/components/icons/loading-icon';
import { HTMLButtonProps } from '@/types/html';

import { buttonTestIds } from './constants';

type ButtonVariant = 'primary' | 'secondary' | 'positive';

export interface Props extends HTMLButtonProps {
  variant?: ButtonVariant;
  loading?: boolean;
  RightIcon?: () => JSX.Element;
  LeftIcon?: () => JSX.Element;
}

const Button: FC<Props> = ({
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
      ' relative flex h-[46px] items-center justify-center gap-3 rounded-pill border-2 border-transparent p-5 text-sm font-bold text-white shadow-current hover:opacity-80  disabled:cursor-not-allowed disabled:opacity-50',
      variant === 'primary' && 'bg-secondary-medium focus:border-secondary-light',
      variant === 'secondary' && 'bg-tertiary-medium focus:border-tertiary-light',
      variant === 'positive' &&
        'w-full items-center justify-center gap-3 rounded-pill bg-positive-medium !p-0 text-surface-primary focus:border-2 focus:border-positive-dark focus:outline-none md:w-32 2xl:!h-[56px] ',
      '2xl:h-[64px] 2xl:p-8 2xl:text-md',
      'md:h-[54px] md:p-6 md:text-md',
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
