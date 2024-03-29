import { Label } from '@radix-ui/react-label';
import { Eye, EyeSlash, MapPinLine, XCircle } from 'phosphor-react';
import { FC, useEffect, useState } from 'react';

interface Props extends React.HTMLProps<HTMLInputElement> {
  variant?: string;
  errorMessage?: string;
  description?: string;
  isRequired?: boolean;
}

const Input: FC<Props> = ({
  variant,
  label,
  type,
  errorMessage,
  description,
  disabled,
  isRequired,
  id,
  ...rest
}: Props) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  useEffect(() => {
    if (disabled) {
      setPasswordIsVisible(false);
    }
  }, [disabled]);

  switch (variant) {
    case 'searchLocation':
      return (
        <div className="relative w-full">
          <MapPinLine size={24} className="absolute top-1/2 left-4 -translate-y-2/4" />
          <input
            id={id}
            disabled={disabled}
            type={type}
            required={isRequired}
            className="flex h-[46px] w-full rounded-pill border-2 border-neutral-100 bg-surface-primary pl-12 pr-4 text-sm text-primary-dark placeholder:text-neutral-500 focus:border-2 focus:border-secondary-dark focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:h-[54px] md:text-md 2xl:text-md"
            {...rest}
          />
        </div>
      );
    case 'password':
      return (
        <div className="w-full">
          {label && (
            <div>
              <Label htmlFor={id} className="text-sm font-bold text-primary-dark md:text-md">
                {label}
                {isRequired && <span> *</span>}
              </Label>
              <div className="h-1" />
            </div>
          )}
          <div className="relative">
            <input
              id={id}
              disabled={disabled}
              type={passwordIsVisible ? 'text' : 'password'}
              required={isRequired}
              className="flex h-[46px] w-full rounded-pill border-2 border-neutral-100 bg-surface-primary px-4 text-sm text-primary-dark placeholder:text-neutral-500 focus:border-secondary-medium focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:h-[54px] md:text-md 2xl:h-[64px] 2xl:text-md"
              {...rest}
            />
            {passwordIsVisible ? (
              <button
                onClick={() => setPasswordIsVisible(false)}
                type="button"
                disabled={disabled}
                className="absolute top-1/2 right-4 -translate-y-1/2 focus:rounded-base disabled:cursor-not-allowed disabled:opacity-50"
                data-testid="turn-invisible"
              >
                <Eye size={24} />
              </button>
            ) : (
              <button
                onClick={() => setPasswordIsVisible(true)}
                disabled={disabled}
                type="button"
                className="absolute top-1/2 right-4 -translate-y-1/2 focus:rounded-base disabled:opacity-50"
                data-testid="turn-visible"
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
            <div>
              <Label htmlFor={id} className="text-sm font-bold text-primary-dark md:text-md">
                {label}
                {isRequired && <span> *</span>}
              </Label>
              <div className="h-1" />
            </div>
          )}
          <div>
            <input
              id={id}
              disabled={disabled}
              type={type}
              required={isRequired}
              className="flex h-[46px] w-full rounded-pill border-2 border-neutral-100 bg-surface-primary px-4 text-sm text-primary-dark placeholder:text-neutral-500 focus:border-secondary-medium focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:h-[54px] md:text-md 2xl:h-[64px] 2xl:text-md"
              {...rest}
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
