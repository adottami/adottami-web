import { Door, Shield, User } from 'phosphor-react';
import { FC } from 'react';

import Separator from '@/components/common/separator/separator';

import MenuCard from './menu-card';

interface CardMenuDesktopProps {
  mouseOut: () => void;
}

const CardMenuDesktop: FC<CardMenuDesktopProps> = ({ mouseOut }) => {
  return (
    <nav className="fixed p-4 shadow-lg">
      <ul onMouseLeave={mouseOut} className="flex flex-col gap-3">
        <MenuCard icon={<User size={24} weight="regular" />} href="#" text="Meu cadastro" />
        <Separator />
        <MenuCard icon={<Shield size={24} weight="regular" />} href="#" text="Login e segurança" />
        <Separator />
        <MenuCard icon={<Door size={24} weight="regular" />} href="#" text="Sair" />
      </ul>
    </nav>
  );
};

export default CardMenuDesktop;
