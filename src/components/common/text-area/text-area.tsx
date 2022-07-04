import { Label } from '@radix-ui/react-label';
import { XCircle } from 'phosphor-react';
import { FC } from 'react';

interface Props extends React.HTMLProps<HTMLTextAreaElement> {
  isRequired?: boolean;
  errorMessage?: string;
  description?: string;
}

const TextArea: FC<Props> = ({ label, isRequired, id, errorMessage, description, disabled, ...rest }) => {
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
        disabled={disabled}
        className="h-[7rem] w-full resize-none overflow-y-scroll rounded-pill border-2 border-neutral-100 bg-surface-primary p-4 text-md text-primary-dark scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-transparent scrollbar-thumb-secondary-medium focus:border-secondary-medium focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:h-[9.5rem]"
      />

      {errorMessage && !disabled ? (
        <div className="mt-1 flex items-center justify-between sm:mt-2">
          <div className="flex items-center">
            <XCircle size={24} color="#e66860" />
            <span className="ml-1 text-sm text-tertiary-medium">{errorMessage}</span>
          </div>
          {description && <span className="text-sm text-neutral-800">{description}</span>}
        </div>
      ) : (
        description && (
          <span className="mt-1 flex w-full justify-end text-sm text-neutral-800 sm:mt-2">{description}</span>
        )
      )}
    </div>
  );
};

export default TextArea;
