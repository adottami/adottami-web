import * as SelectPrimitive from '@radix-ui/react-select';
import { CaretDown, CaretUp, Check, XCircle } from 'phosphor-react';
import React, { FC, useState } from 'react';

interface Props {
  name?: string;
  label?: string;
  isRequired?: boolean;
  options?: string[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  errorMessage?: string;
}

const Select: FC<Props> = ({
  name,
  label,
  isRequired,
  onChange,
  options = [],
  errorMessage,
  defaultValue = 'Selecione',
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  function handleChangeValue(value: string) {
    setSelectedValue(value);
    if (typeof onChange === 'function') {
      onChange(value);
    }
  }

  return (
    <div>
      {label && (
        <label className="mb-2 block text-base font-bold text-primary-dark md:text-md" htmlFor={name}>
          {label}
          {isRequired && <span> *</span>}
        </label>
      )}
      <SelectPrimitive.Root value={selectedValue} onValueChange={handleChangeValue}>
        <SelectPrimitive.SelectTrigger
          className={`flex w-full items-center justify-between gap-2 rounded-lg border-2 border-neutral-100 p-4 text-base ${
            selectedValue !== defaultValue ? 'text-primary-dark' : 'text-neutral-500'
          } outline-none focus:border-secondary-medium`}
          aria-label="Food"
        >
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon className="text-primary-dark">
            <CaretDown size={24} />
          </SelectPrimitive.Icon>
        </SelectPrimitive.SelectTrigger>

        <SelectPrimitive.Content className="overflow-hidden rounded bg-white outline-none drop-shadow-md">
          <SelectPrimitive.ScrollUpButton className="flex h-6 cursor-default items-center justify-center bg-white text-secondary-medium outline-none">
            <CaretUp size={24} />
          </SelectPrimitive.ScrollUpButton>

          <SelectPrimitive.Viewport className="p-2">
            {[defaultValue, ...options].map((option) => (
              <SelectPrimitive.Item
                onClick={() => setSelectedValue(option)}
                className="flex items-center justify-between rounded px-2 text-primary-dark outline-none hover:bg-secondary-medium/[0.15] hover:text-secondary-medium"
                value={option}
                key={option}
              >
                <SelectPrimitive.ItemText>{option}</SelectPrimitive.ItemText>

                <SelectPrimitive.ItemIndicator>
                  <Check />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>

          <SelectPrimitive.ScrollDownButton className="flex h-6 cursor-default items-center justify-center bg-white text-secondary-medium">
            <CaretDown size={24} />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Root>

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

export default Select;
