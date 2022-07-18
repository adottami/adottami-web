import { CaretDown, XCircle } from 'phosphor-react';
import React, { FC, SelectHTMLAttributes } from 'react';

interface Props {
  name?: string;
  label?: string;
  isRequired?: boolean;
  options?: string[];
  errorMessage?: string;
}

const Select: FC<Props & SelectHTMLAttributes<HTMLSelectElement>> = (props) => {
  const { id, name, label, isRequired, value, defaultValue = 'Selecione', options = [], errorMessage, ...rest } = props;

  const values = [defaultValue as string, ...options];

  return (
    <div>
      {label && (
        <label className="mb-2 block text-base font-bold text-primary-dark md:text-md" htmlFor={name}>
          {label} {isRequired && ' *'}
        </label>
      )}

      <div className="flex items-center">
        <select
          name={name}
          id={id}
          className={`flex w-full items-center justify-between gap-2 rounded-lg border-2 border-neutral-100 p-4 text-base ${
            value !== defaultValue || !value ? 'text-primary-dark' : 'text-neutral-500'
          } bg-white outline-none focus:border-secondary-medium`}
          style={{ WebkitAppearance: 'none' }}
          defaultValue="Selecione"
          {...rest}
        >
          {values.map((option) => (
            <option
              key={option}
              value={option}
              className="flex items-center justify-between rounded px-2 text-primary-dark outline-none hover:bg-secondary-medium/[0.15] hover:text-secondary-medium"
            >
              {option}
            </option>
          ))}
        </select>

        <div className="text-primary-dark" style={{ marginLeft: '-36px' }}>
          <CaretDown size={20} />
        </div>
      </div>

      {errorMessage && (
        <div className="mt-1 flex items-center justify-between sm:mt-2">
          <div className="flex items-center text-tertiary-medium">
            <XCircle size={24} />
            <span className="ml-1 text-sm">{errorMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
