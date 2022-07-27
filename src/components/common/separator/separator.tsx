import clsx from 'clsx';

import { HTMLDivProps } from '@/types/html';
import { FunctionComponentWithChildren } from '@/types/react';

interface Props extends HTMLDivProps {
  testId?: string;
}

const Separator: FunctionComponentWithChildren<Props> = ({ testId, children, className }) => {
  const gap = children ? 'gap-x-4' : '';

  return (
    <div
      data-testid={testId}
      className={clsx(
        `flex items-center font-medium text-neutral-500 ${gap} before:h-px before:w-full before:bg-neutral-100 after:h-px after:w-full after:bg-neutral-100`,
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Separator;
