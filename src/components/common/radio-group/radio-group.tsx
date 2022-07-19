import * as RadioBox from '@radix-ui/react-radio-group';
import { XCircle } from 'phosphor-react';
import { FC } from 'react';

import RadioInput, { RadioProps } from './radio-input';

interface Props {
  id: string;
  label: string;
  options: RadioProps[];
  isRequired?: boolean;
  onChange?: (value: string) => void;
  errorMessage?: string;
  hasError?: boolean;
}

const RadioGroup: FC<Props> = ({ id, label, options, isRequired, onChange, errorMessage, hasError }) => {
  return (
    <div role="radiogroup">
      <label htmlFor={id} className="mb-1 flex flex-row items-center gap-1 text-md font-bold text-primary-dark">
        {label}
        <span>{isRequired ? '*' : ''}</span>
      </label>

      <RadioBox.Root
        id={id}
        name={label}
        onValueChange={onChange}
        className="flex flex-wrap gap-4"
        required={isRequired}
      >
        {options.map(({ id, label, isDisabled }) => (
          <RadioInput key={id} id={id} label={label} isDisabled={isDisabled} />
        ))}
      </RadioBox.Root>

      {hasError && errorMessage && (
        <div className="mt-1 flex items-center justify-between text-tertiary-medium sm:mt-2">
          <div className="flex items-center">
            <XCircle size={24} />
            <span className="ml-1 text-sm ">{errorMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RadioGroup;
