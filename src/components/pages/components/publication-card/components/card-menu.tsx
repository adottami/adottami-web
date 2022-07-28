import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { styled, keyframes } from '@stitches/react';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { DotsThree, PencilSimpleLine, Trash } from 'phosphor-react';
import React, { FC } from 'react';
import { toast } from 'react-toastify';

import useAPI from '@/hooks/api/use-api/use-api';

import { TOAST_CONFIGS } from '../constants';

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
  publicationId: string;
  isVisible?: boolean;
}

interface Item {
  path: string;
  label: string;
  icon: JSX.Element;
  onClick?: () => void;
}

const CardMenu: FC<Props> = (props) => {
  const { isVisible, publicationId } = props;
  const api = useAPI();

  const handleRemovePublication = async (event: MouseEvent) => {
    event.preventDefault();
    try {
      await api.adottami.publications.remove(publicationId);
      toast.success('Publicação removida com sucesso !', TOAST_CONFIGS);
    } catch (error) {
      if (!(error instanceof AxiosError)) throw error;
      if (error.response?.status === 400) {
        toast.error('Ops ! Ocorreu um erro', TOAST_CONFIGS);
      }
    }
  };

  const items = [
    {
      path: `/publications/edit/${publicationId}`,
      label: 'Editar',
      icon: <PencilSimpleLine size={24} />,
    },
    {
      path: '#',
      label: 'Remover',
      icon: <Trash size={24} />,
      onClick: handleRemovePublication,
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
              onClick={item.onClick}
            >
              {item.icon}
              <Link href={item.path} passHref>
                <a className="text-base">{item.label}</a>
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenuContent>
      </DropdownMenu.Root>
    </div>
  );
};

export default CardMenu;
