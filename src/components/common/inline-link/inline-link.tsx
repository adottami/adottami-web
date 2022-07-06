import Link from 'next/link';
import { CaretRight } from 'phosphor-react';
import React from 'react';

import { FunctionComponentWithChildren } from '@/types/react';

interface Props {
  href: string;
  rightIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const InlineLink: FunctionComponentWithChildren<Props> = (props) => {
  const { href, children, rightIcon, size } = props;

  return (
    <div
      className={`flex w-fit items-center border-b border-transparent
        text-${size || 'md'} leading-4 text-secondary-medium duration-200
        hover:cursor-pointer hover:border-secondary-medium hover:brightness-75`}
    >
      <Link href={href}>{children}</Link>
      {rightIcon && <CaretRight />}
    </div>
  );
};

export default InlineLink;
