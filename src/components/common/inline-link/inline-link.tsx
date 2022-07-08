import Link from 'next/link';
import { CaretRight } from 'phosphor-react';
import React from 'react';

import { FunctionComponentWithChildren } from '@/types/react';

interface Props {
  href: string;
  rightIcon?: boolean;
}

const InlineLink: FunctionComponentWithChildren<Props> = (props) => {
  const { href, children, rightIcon } = props;

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {rightIcon ? (
        <div className="flex w-fit cursor-pointer items-center gap-1 text-sm leading-4 text-secondary-medium no-underline decoration-secondary-medium transition duration-300 ease-out hover:text-secondary-dark hover:underline md:text-md">
          <Link href={href}>{children}</Link>
          {rightIcon && <CaretRight />}
        </div>
      ) : (
        <Link href={href} passHref>
          <a className="cursor-pointer text-sm leading-4 text-secondary-medium no-underline decoration-secondary-medium transition duration-300 ease-out hover:text-secondary-dark hover:underline md:text-md">
            {children}
          </a>
        </Link>
      )}
    </>
  );
};

export default InlineLink;
