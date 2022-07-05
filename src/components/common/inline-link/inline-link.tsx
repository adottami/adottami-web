import Link from 'next/link';
import React from 'react';

import { FunctionComponentWithChildren } from '@/types/react';

interface Props {
  href: string;
}

const InlineLink: FunctionComponentWithChildren<Props> = (props) => {
  const { href, children } = props;

  return (
    <div className="flex text-md text-secondary-medium">
      <Link href={href}>{children}</Link>
    </div>
  );
};

export default InlineLink;
