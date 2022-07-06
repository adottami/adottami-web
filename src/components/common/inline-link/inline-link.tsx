import Link from 'next/link';
import React from 'react';

import { FunctionComponentWithChildren } from '@/types/react';

interface Props {
  href: string;
}

const InlineLink: FunctionComponentWithChildren<Props> = (props) => {
  const { href, children } = props;

  return (
    <div className="after:hover: flex w-fit border-b border-transparent text-md leading-4 text-secondary-medium duration-200 hover:border-secondary-medium hover:brightness-75">
      <Link href={href}>{children}</Link>
    </div>
  );
};

export default InlineLink;
