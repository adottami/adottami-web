import * as RadioBox from '@radix-ui/react-radio-group';
import { XCircle } from 'phosphor-react';
import { FC } from 'react';

import RadioInput, { RadioProps } from './radio-input';

interface Props {
  id: string;
  name?: string;
  label: string;
  options: RadioProps[];
  isRequired?: boolean;
  onChange?: (value: string) => void;
  errorMessage?: string;
}

const RadioGroup: FC<Props> = ({ id, name, label, options, isRequired, onChange, errorMessage }) => {
  return (
    <div role="radiogroup">
      <label htmlFor={id} className="mb-1 flex flex-row items-center gap-1 text-md font-bold text-primary-dark">
        {label}
        <span>{isRequired ? '*' : ''}</span>
      </label>

      <RadioBox.Root
        id={id}
        name={name}
        onValueChange={onChange}
        className="flex flex-wrap gap-4"
        required={isRequired}
      >
        {options.map(({ label, value, isDisabled }) => (
          <RadioInput key={label} id={label} label={label} isDisabled={isDisabled} value={value} />
        ))}
      </RadioBox.Root>

      {errorMessage && (
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
