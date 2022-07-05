import { FunctionComponentWithChildren } from '@/types/react';

interface Props {
  testId?: string;
}

const Separator: FunctionComponentWithChildren<Props> = ({ testId, children }) => {
  const gap = children ? 'gap-x-4' : '';

  return (
    <div
      data-testid={testId}
      className={`my-4 flex items-center font-medium text-neutral-500 ${gap} before:h-px before:w-full before:bg-neutral-100 after:h-px after:w-full after:bg-neutral-100`}
    >
      {children}
    </div>
  );
};

export default Separator;
