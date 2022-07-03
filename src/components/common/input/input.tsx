import { Label } from '@radix-ui/react-label';
import { Eye, EyeSlash, XCircle } from 'phosphor-react';
import { FC, useEffect, useState } from 'react';

interface Props extends React.HTMLProps<HTMLInputElement> {
  variant?: string;
  label?: string;
  errorMessage?: string;
  description?: string;
}

const Input: FC<Props> = ({ variant, label, type, errorMessage, description, disabled, ...rest }: Props) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  useEffect(() => {
    if (disabled) {
      setPasswordIsVisible(false);
    }
  }, [disabled]);

  switch (variant) {
    case 'password':
      return (
        <div className="w-full">
          {label && (
            <Label className="text-md font-bold text-primary-dark">
              {label}
              <div className="h-1" />
            </Label>
          )}
          <div className="relative">
            <input
              {...rest}
              disabled={disabled}
              type={passwordIsVisible ? 'text' : 'password'}
              className="flex h-[3.375rem] w-full rounded-pill border-2 border-neutral-100 bg-surface-primary px-4 text-primary-dark placeholder:text-neutral-500 focus:border-secondary-medium focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
            {passwordIsVisible ? (
              <button
                onClick={() => setPasswordIsVisible(false)}
                disabled={disabled}
                className="absolute top-1/2 right-4 -translate-y-1/2 focus:rounded-base disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Eye size={24} />
              </button>
            ) : (
              <button
                onClick={() => setPasswordIsVisible(true)}
                disabled={disabled}
                className="absolute top-1/2 right-4 -translate-y-1/2 focus:rounded-base disabled:opacity-50"
              >
                <EyeSlash size={24} />
              </button>
            )}
          </div>
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

    default:
      return (
        <div className="w-full">
          {label && (
            <Label className="text-md font-bold text-primary-dark">
              {label}
              <div className="h-1" />
            </Label>
          )}
          <div>
            <input
              {...rest}
              disabled={disabled}
              type={type}
              className="flex h-[3.375rem] w-full rounded-pill border-2 border-neutral-100 bg-surface-primary px-4 text-primary-dark placeholder:text-neutral-500 focus:border-secondary-medium focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
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
  }
};

export default Input;
