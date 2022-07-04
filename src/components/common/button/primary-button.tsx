import clsx from 'clsx';
import { FC } from 'react';

import { HTMLButtonProps } from '@/types/html';

import { ButtonSizes } from './types';

export interface Props extends HTMLButtonProps {
  size: ButtonSizes;
}

const PrimaryButton: FC<Props> = ({ className, children, size, ...rest }) => (
  <button
    className={clsx(
      className,
      'flex items-center justify-center space-x-3 rounded-pill  bg-secondary-medium font-bold text-white shadow-current hover:opacity-80 focus:border-2 focus:border-secondary-light disabled:cursor-not-allowed disabled:opacity-50',
      size === 'lg' && 'h-16 p-8',
      size === 'md' && 'h-12 p-6',
      size === 'sm' && 'h-10 p-5',
    )}
    {...rest}
  >
    {children}
  </button>
);

export default PrimaryButton;
