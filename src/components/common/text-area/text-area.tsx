import { FC } from 'react';

interface Props extends React.HTMLProps<HTMLTextAreaElement> {}

const TextArea: FC<Props> = ({ ...rest }) => {
  return (
    <textarea
      {...rest}
      className="h-[7rem] w-full resize-none overflow-y-scroll rounded-pill border-2 border-neutral-100 bg-surface-primary p-4 text-md scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-transparent scrollbar-thumb-secondary-medium focus:border-secondary-medium focus:outline-none focus:outline-none sm:h-[9.5rem]"
    />
  );
};

export default TextArea;
