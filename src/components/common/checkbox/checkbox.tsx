/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, FC, useState } from 'react';

interface Props {
  title?: string;
  options: string[];
  name?: string;
  id?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: FC<Props> = ({ title, options, name, id, handleChange }) => {
  const [optionsChecked, setOptionsChecked] = useState<string[]>([]);

  function handleOptions(event: ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    const newOption = target.value;
    if (target.checked) {
      setOptionsChecked((optionsChecked) => [...optionsChecked, newOption]);
    } else {
      setOptionsChecked((optionsChecked) => optionsChecked.filter((option) => option !== target.value));
    }

    if (typeof handleChange === 'function') {
      handleChange(event);
    }
  }

  return (
    <div className="row col-5">
      <div className="flex flex-col gap-y-4">
        {title && <p className="text-md font-bold">{title}</p>}

        {options.map((option) => {
          return (
            <div key={option} className="flex gap-y-4">
              <label className="flex text-md">
                <input
                  name={name}
                  id={id}
                  className="mr-2 h-6 w-6 text-md accent-secondary-medium"
                  type="checkbox"
                  value={option}
                  checked={optionsChecked.includes(option)}
                  onChange={handleOptions}
                />
                {option}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Checkbox;
