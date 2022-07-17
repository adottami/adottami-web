/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, FC, useState } from 'react';

interface Props {
  title?: string;
  options: string[];
}

const Checkbox: FC<Props> = ({ title, options }) => {
  const [optionsChecked, setOptionsChecked] = useState<string[]>([]);

  function handleOptions({ target }: ChangeEvent<HTMLInputElement>) {
    const newOption = target.value;
    if (target.checked) {
      setOptionsChecked((optionsChecked) => [...optionsChecked, newOption]);
    } else {
      setOptionsChecked((optionsChecked) => optionsChecked.filter((option) => option !== target.value));
    }
  }

  return (
    <div className="row col-5">
      <form className="flex flex-col gap-y-4" action="">
        {title && <p className="text-md font-bold">{title}</p>}

        {options.map((option) => {
          return (
            <div key={option} className="flex gap-y-4">
              <label className="flex text-md">
                <input
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
      </form>
    </div>
  );
};

export default Checkbox;
