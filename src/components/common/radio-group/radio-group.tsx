import * as RadioBox from '@radix-ui/react-radio-group';
import { FC } from 'react';

import RadioInput, { RadioProps } from './radio-input';

interface Props {
  id: string;
  label: string;
  options: RadioProps[];
  isRequired?: boolean;
}

const RadioGroup: FC<Props> = ({ id, label, options, isRequired }) => {
  return (
    <div role="radiogroup">
      <label htmlFor={id} className="mb-1 flex flex-row items-center gap-1 text-md font-bold text-primary-dark">
        {label}
        <span>{isRequired ? '*' : ''}</span>
      </label>

      <RadioBox.Root id={id} name={label} className="flex flex-wrap gap-4" required={isRequired}>
        {options.map(({ id, label, isDisabled }) => (
          <RadioInput key={id} id={id} label={label} isDisabled={isDisabled} />
        ))}
      </RadioBox.Root>
    </div>
  );
};

export default RadioGroup;
