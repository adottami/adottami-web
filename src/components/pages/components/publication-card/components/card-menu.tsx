import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { styled, keyframes } from '@stitches/react';
import { ArchiveBox, DotsThree, PencilSimpleLine, Trash } from 'phosphor-react';
import React, { FC } from 'react';

import UnarchiveBox from '@/components/icons/unarchive-box';

const [slideUpAndFade, slideRightAndFade, slideDownAndFade, slideLeftAndFade] = [
  keyframes({
    '0%': { opacity: 0, transform: 'translateY(2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  }),
  keyframes({
    '0%': { opacity: 0, transform: 'translateX(-2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
  }),
  keyframes({
    '0%': { opacity: 0, transform: 'translateY(-2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  }),
  keyframes({
    '0%': { opacity: 0, transform: 'translateX(2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
  }),
];

const DropdownMenuContent = styled(DropdownMenu.Content, {
  backgroundColor: 'white',
  borderRadius: 8,
  padding: '8px 0',
  boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    animationFillMode: 'forwards',
    willChange: 'transform, opacity',
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
});

interface Props {
  isVisible?: boolean;
  isArchived?: boolean;
}

interface Item {
  label: string;
  icon: JSX.Element;
  onClick?: () => void;
}

const CardMenu: FC<Props> = (props) => {
  const { isVisible, isArchived } = props;

  const items = [
    {
      label: 'Editar',
      icon: <PencilSimpleLine size={24} />,
    },
    {
      label: isArchived ? 'Desarquivar' : 'Arquivar',
      icon: isArchived ? <UnarchiveBox /> : <ArchiveBox size={24} />,
    },
    {
      label: 'Remover',
      icon: <Trash size={24} />,
    },
  ] as Item[];

  if (!isVisible) return null;

  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="rounded-xl border-2 border-neutral-100 bg-surface-secondary p-2 text-neutral-800 outline-none duration-200 hover:brightness-90"
            aria-label="Opções"
          >
            <DotsThree size={24} />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenuContent sideOffset={5}>
          {items.map((item) => (
            <DropdownMenu.Item
              key={item.label}
              className="flex cursor-pointer items-center gap-x-3 py-2 px-4 text-neutral-500 outline-none duration-200 hover:bg-neutral-100 hover:text-secondary-medium"
            >
              {item.icon}
              <span className="text-base">{item.label}</span>
            </DropdownMenu.Item>
          ))}
        </DropdownMenuContent>
      </DropdownMenu.Root>
    </div>
  );
};

export default CardMenu;
