import * as Label from '@radix-ui/react-label';
import { XCircle } from 'phosphor-react';
import { FC } from 'react';

interface Props extends React.HTMLProps<HTMLInputElement> {
  variant?: string;
  label?: string;
  errorMessage?: string;
  description?: string;
}

const Input: FC<Props> = ({ variant, label, type, errorMessage, description, disabled, ...rest }: Props) => {
  switch (variant) {
    case 'password':
      return <h1>Input</h1>;

    default:
      return (
        <div className="w-full border-2 border-red-500">
          {label && <Label.Root className="mb-1 text-md font-bold text-primary-dark">{label}</Label.Root>}
          <div>
            <input
              {...rest}
              disabled={disabled}
              type={type}
              className="flex h-[3.375rem] w-full rounded-pill border-2 border-neutral-100 bg-surface-primary px-4 text-primary-dark focus:border-secondary-medium focus:outline-none disabled:cursor-not-allowed"
            />
          </div>
          {errorMessage && !disabled ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <XCircle size={24} color="#e66860" />
                <span className="ml-1 text-sm text-tertiary-medium">{errorMessage}</span>
              </div>
              {description && <span className="text-sm">{description}</span>}
            </div>
          ) : (
            description && <span className="mt-1 flex w-full justify-end text-sm ">{description}</span>
          )}
        </div>
      );
  }
};

export default Input;
