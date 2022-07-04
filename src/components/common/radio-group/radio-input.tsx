import * as RadioBox from '@radix-ui/react-radio-group';
import { FC } from 'react';

export interface RadioProps extends RadioBox.RadioGroupProps {
  id: string;
  label: string;
  isDisabled?: boolean;
}

const RadioInput: FC<RadioProps> = ({ id, label, isDisabled }) => {
  return (
    <div className="flex items-center">
      <RadioBox.Item
        value={label}
        id={id}
        disabled={isDisabled}
        className="c h-6 w-6 rounded-full border-medium border-neutral-100 outline-2 duration-300 ease-out checked:border-secondary-medium hover:border-neutral-200 focus:border-secondary-medium focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-neutral-100"
      >
        <RadioBox.Indicator className="after:content-[' '] relative flex h-auto w-auto items-center justify-center transition duration-300 ease-out after:block after:h-3 after:w-3 after:rounded-full after:bg-secondary-medium " />
      </RadioBox.Item>
      <label
        htmlFor={id}
        className="cursor-pointer pl-2 text-md leading-short text-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
