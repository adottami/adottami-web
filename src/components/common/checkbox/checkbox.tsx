/* eslint-disable jsx-a11y/label-has-associated-control */
import { XCircle } from 'phosphor-react';
import { ChangeEvent, FC } from 'react';

interface Props {
  id?: string;
  name?: string;
  title?: string;
  options: string[];
  selectedOptions?: string[];
  errorMessage?: string;
  onChange?: (selectedOptions: string[]) => void;
}

const Checkbox: FC<Props> = ({ title, options, selectedOptions = [], name, id, onChange, errorMessage }) => {
  function handleOptions(event: ChangeEvent<HTMLInputElement>) {
    const isChecked = event.target.checked;

    if (isChecked) {
      const optionToCheck = event.target.value;
      const newSelectedOptions = [...selectedOptions, optionToCheck];
      onChange?.(newSelectedOptions);
    } else {
      const optionToUncheck = event.target.value;
      const newSelectedOptions = selectedOptions.filter((option) => option !== optionToUncheck);
      onChange?.(newSelectedOptions);
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
                  checked={selectedOptions.includes(option)}
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
