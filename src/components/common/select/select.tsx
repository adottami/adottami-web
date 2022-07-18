import * as SelectPrimitive from '@radix-ui/react-select';
import { CaretDown, CaretUp, Check } from 'phosphor-react';
import React, { FC } from 'react';

const Select: FC = () => {
  return (
    <SelectPrimitive.Root defaultValue="selecione">
      <SelectPrimitive.SelectTrigger
        className="flex w-full items-center justify-between gap-2 rounded-lg border-2 border-neutral-100 p-4 text-base text-neutral-500"
        aria-label="Food"
      >
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon className="text-primary-dark">
          <CaretDown size={24} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.SelectTrigger>

      <SelectPrimitive.Content className="overflow-hidden rounded bg-white drop-shadow-md">
        <SelectPrimitive.ScrollUpButton className="flex h-6 cursor-default items-center justify-center bg-white text-secondary-medium">
          <CaretUp size={24} />
        </SelectPrimitive.ScrollUpButton>

        <SelectPrimitive.Viewport className="p-2">
          <SelectPrimitive.Item
            className="flex items-center justify-between rounded p-2 text-primary-dark hover:bg-secondary-medium/[0.15] hover:text-secondary-medium"
            value="selecione"
          >
            <SelectPrimitive.ItemText>Selecione</SelectPrimitive.ItemText>

            <SelectPrimitive.ItemIndicator>
              <Check />
            </SelectPrimitive.ItemIndicator>
          </SelectPrimitive.Item>
        </SelectPrimitive.Viewport>

        <SelectPrimitive.ScrollDownButton className="flex h-6 cursor-default items-center justify-center bg-white text-secondary-medium">
          <CaretDown size={24} />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  );
};

export default Select;
