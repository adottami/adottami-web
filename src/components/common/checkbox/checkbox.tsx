/* eslint-disable jsx-a11y/label-has-associated-control */
import { XCircle } from 'phosphor-react';
import { ChangeEvent, FC, useEffect, useState } from 'react';

interface Props {
  title?: string;
  options: string[];
  value?: string[];
  name?: string;
  id?: string;
  onChange?: (value: string[]) => void;
  errorMessage?: string;
}

const Checkbox: FC<Props> = ({ title, options, value, name, id, onChange, errorMessage }) => {
  const [optionsChecked, setOptionsChecked] = useState<string[]>([]);

  useEffect(() => {
    if (value) {
      setOptionsChecked(value);
    }
  }, [value]);

  function handleOptions(event: ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    const newOption = target.value;
    if (target.checked) {
      setOptionsChecked((optionsChecked) => [...optionsChecked, newOption]);
    } else {
      setOptionsChecked((optionsChecked) => optionsChecked.filter((option) => option !== target.value));
    }

    onChange?.(optionsChecked);
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
        {errorMessage && (
          <div className="mt-1 flex items-center justify-between text-tertiary-medium sm:mt-2">
            <div className="flex items-center">
              <XCircle size={24} />
              <span className="ml-1 text-sm ">{errorMessage}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
