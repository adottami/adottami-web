import { FunctionComponentWithChildren } from '@/types/react';

interface Props {}

const Separator: FunctionComponentWithChildren<Props> = ({ children }) => {
  const gap = children ? 'gap-x-4' : '';

  return (
    <div
      className={`my-4 flex items-center font-medium text-neutral-500 ${gap} before:h-px before:w-full before:bg-neutral-100 after:h-px after:w-full after:bg-neutral-100`}
    >
      {children}
    </div>
  );
};

export default Separator;
