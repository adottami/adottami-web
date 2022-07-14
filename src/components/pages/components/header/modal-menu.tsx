import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { CaretRight, Door, Heart, MagnifyingGlass, Shield, SquaresFour, User, X } from 'phosphor-react';
import profile from 'public/images/image-profile-not-found.png';
import { FC } from 'react';

import Separator from '@/components/common/separator/separator';

import MenuCard from './menu-card';

interface Props {
  isAuth: boolean;
  avatarPhoto?: string | StaticImageData;
  username: string | null;
  setCloseModal: () => void;
}

const ModalMenu: FC<Props> = ({ setCloseModal, isAuth, avatarPhoto = profile, username }) => {
  return isAuth ? (
    <nav className="fixed left-0 top-0 z-1 h-full w-full bg-surface-primary pt-6 pl-7 shadow-sm">
      <ul className="flex flex-col gap-6">
        <li className="self-end pr-2">
          <X size={24} weight="bold" onClick={setCloseModal} className="hover:text-secondary-medium" />
        </li>
        <li className="flex items-center justify-between">
          <div className="flex items-center">
            <Image src={avatarPhoto} alt="Foto de perfil" width={42} height={42} className="rounded-full" />
            <div className="pl-4">
              <p>{username}</p>
              <Link href="#">
                <a className="text-sm text-secondary-medium">Minha conta</a>
              </Link>
            </div>
          </div>
          <CaretRight size={24} weight="thin" className="hover:text-secondary-medium" />
        </li>
        <Separator />
        <MenuCard icon={<MagnifyingGlass size={20} weight="thin" />} href="/publications/search" text="Buscar pet" />
        <Separator />
        <MenuCard icon={<SquaresFour size={20} weight="thin" />} href="/publications/dashboard" text="Meus Anúncios" />
        <MenuCard icon={<Heart size={20} weight="thin" />} href="#" text="Favoritos" />
        <Separator />
        <MenuCard icon={<Shield size={20} weight="thin" />} href="#" text="Login e segurança" />
        <Separator />
        <MenuCard icon={<Door size={20} weight="thin" />} href="#" text="Sair" />
      </ul>
    </nav>
  ) : (
    <nav className="fixed left-0 top-0 z-1 h-full w-full bg-surface-primary pt-6 pl-7 shadow-sm">
      <ul className="flex flex-col gap-6">
        <li className="self-end pr-2">
          <X size={32} weight="bold" onClick={setCloseModal} className="hover:text-secondary-medium" />
        </li>
        <MenuCard icon={<User size={20} weight="thin" />} href="/sign-in" text="Entrar" />
        <MenuCard icon={<MagnifyingGlass size={20} weight="thin" />} href="/publications/search" text="Buscar pet" />
        <Separator />
        <MenuCard icon={<SquaresFour size={20} weight="thin" />} href="/publications/dashboard" text="Meus Anúncios" />
        <MenuCard icon={<Heart size={20} weight="thin" />} href="#" text="Favoritos" />
      </ul>
    </nav>
  );
};

export default ModalMenu;
