import { Label } from '@radix-ui/react-label';
import { FC } from 'react';

interface Props extends React.HTMLProps<HTMLTextAreaElement> {
  isRequired?: boolean;
}

const TextArea: FC<Props> = ({ label, isRequired, id, ...rest }) => {
  return (
    <div>
      {label && (
        <div>
          <Label htmlFor={id} className="text-md font-bold text-primary-dark">
            {label}
            {isRequired && <span> *</span>}
          </Label>
          <div className="h-1" />
        </div>
      )}

      <textarea
        {...rest}
        id={id}
        required={isRequired}
        className="h-[7rem] w-full resize-none overflow-y-scroll rounded-pill border-2 border-neutral-100 bg-surface-primary p-4 text-md text-primary-dark scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-transparent scrollbar-thumb-secondary-medium focus:border-secondary-medium focus:outline-none sm:h-[9.5rem]"
      />
    </div>
  );
};

export default TextArea;
