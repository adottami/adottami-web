import Link from 'next/link';
import { CaretRight } from 'phosphor-react';
import React from 'react';

import { FunctionComponentWithChildren } from '@/types/react';

interface Props {
  href?: string;
  onClick?: () => void;
  rightIcon?: boolean;
}

const InlineLink: FunctionComponentWithChildren<Props> = (props) => {
  const { href, onClick, children, rightIcon } = props;

  if (href) {
    return (
      <Link href={href} passHref>
        <a className="inline-flex w-fit cursor-pointer items-center gap-1 text-sm leading-4 text-secondary-medium no-underline decoration-secondary-medium transition duration-300 ease-out hover:text-secondary-dark hover:underline md:text-md">
          {children}
          <span className="ml-1">{rightIcon && <CaretRight />}</span>
        </a>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-fit cursor-pointer items-center gap-1 text-sm leading-4 text-secondary-medium no-underline decoration-secondary-medium transition duration-300 ease-out hover:text-secondary-dark hover:underline md:text-md"
    >
      {children}
      <span className="ml-1">{rightIcon && <CaretRight />}</span>
    </button>
  );
};

export default InlineLink;
