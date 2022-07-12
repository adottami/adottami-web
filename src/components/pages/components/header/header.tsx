import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { CaretRight, Door, Heart, List, MagnifyingGlass, Shield, SquaresFour, User, X } from 'phosphor-react';
import profile from 'public/images/image-profile-not-found.png';
import { FC, useState, cloneElement } from 'react';

import Button from '@/components/common/button/button';
import Separator from '@/components/common/separator/separator';
import AdottamiLogo from '@/components/icons/adottami-logo';

interface Props {
  isAuth: boolean;
  avatarPhoto?: string | StaticImageData;
  username?: string;
}

interface ModalMenu extends Props {
  setCloseModal: () => void;
  router: NextRouter;
}

interface CardProps {
  icon: JSX.Element;
  href: string;
  text: string;
  router: NextRouter;
}

const MenuCard: FC<CardProps> = ({ router, icon, href, text }) => {
  return (
    <li className="flex items-center">
      {cloneElement(icon, {
        color: `${router.pathname === href ? '#6E3ED8' : '#4A4A4A'}`,
      })}
      <Link href={href} passHref>
        <a
          className={`ml-2.5 text-lg font-medium ${
            router.pathname === href ? 'text-secondary-medium' : 'text-neutral-800'
          } `}
        >
          {text}
        </a>
      </Link>
    </li>
  );
};

const ModalMenu: FC<ModalMenu> = ({ setCloseModal, isAuth, avatarPhoto = profile, username, router }) => {
  return isAuth ? (
    <nav className="fixed left-0 top-0 z-1 h-full w-full bg-surface-primary pt-6 pl-7 shadow-sm">
      <ul className="flex flex-col gap-6">
        <li className="self-end pr-2">
          <X size={24} weight="bold" onClick={setCloseModal} />
        </li>
        <li className="flex items-center">
          <Image src={avatarPhoto} alt="Foto de perfil" width={42} height={42} className="rounded-full" />
          <div className="pl-4">
            <p>{username}</p>
            <Link href="#">
              <a className="text-sm text-secondary-medium">Minha conta</a>
            </Link>
          </div>
          <CaretRight size={24} weight="thin" style={{ flexGrow: 1 }} />
        </li>
        <Separator />
        <MenuCard
          router={router}
          icon={<MagnifyingGlass size={20} weight="thin" />}
          href="/publications/search"
          text="Buscar pet"
        />
        <Separator />
        <MenuCard
          router={router}
          icon={<SquaresFour size={20} weight="thin" />}
          href="/publications/dashboard"
          text="Meus Anúncios"
        />
        <MenuCard router={router} icon={<Heart size={20} weight="thin" />} href="#" text="Favoritos" />
        <Separator />
        <MenuCard router={router} icon={<Shield size={20} weight="thin" />} href="#" text="Login e segurança" />
        <Separator />
        <MenuCard router={router} icon={<Door size={20} weight="thin" />} href="#" text="Sair" />
      </ul>
    </nav>
  ) : (
    <nav className="fixed left-0 top-0 z-1 h-full w-full bg-surface-primary pt-6 pl-7 shadow-sm">
      <ul className="flex flex-col gap-6">
        <li className="self-end pr-2">
          <X size={32} weight="bold" onClick={setCloseModal} />
        </li>
        <MenuCard router={router} icon={<User size={20} weight="thin" />} href="/sign-in" text="Entrar" />
        <MenuCard
          router={router}
          icon={<MagnifyingGlass size={20} weight="thin" />}
          href="/publications/search"
          text="Buscar pet"
        />
        <Separator />
        <MenuCard
          router={router}
          icon={<SquaresFour size={20} weight="thin" />}
          href="/publications/dashboard"
          text="Meus Anúncios"
        />
        <MenuCard router={router} icon={<Heart size={20} weight="thin" />} href="#" text="Favoritos" />
      </ul>
    </nav>
  );
};

const Header: FC<Props> = ({ isAuth, avatarPhoto = profile, username }) => {
  const [menuHamburguerOpen, setMenuHamburguerOpen] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    setMenuHamburguerOpen(false);
  };

  const openModal = () => {
    setMenuHamburguerOpen(true);
  };
  return (
    <header>
      <Separator />
      <div className="flex items-center justify-around p-6">
        <div className="flex items-center">
          <span className="lg:hidden">
            <List data-testid="hamburguer-menu" size={32} weight="regular" onClick={openModal} />
          </span>
          <Link href="/">
            <div>
              <AdottamiLogo className="h-6 w-auto cursor-pointer lg:h-8 2xl:h-10" />
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-16">
          {menuHamburguerOpen === true && (
            <ModalMenu router={router} isAuth={isAuth} setCloseModal={closeModal} username={username} />
          )}
          <nav className="hidden lg:block">
            <ul className="flex gap-6 ">
              <MenuCard
                router={router}
                icon={<SquaresFour size={24} weight="regular" />}
                href="/publications/dashboard"
                text="Meus Anúncios"
              />
              <MenuCard router={router} icon={<Heart size={24} weight="regular" />} href="/#" text="Favoritos" />
              <li className="flex items-center">
                {isAuth ? (
                  <>
                    <Image src={avatarPhoto} alt="Foto de perfil" className="rounded-full" />
                    <Link href="#" className="text-lg font-medium">
                      <a className="ml-2.5 text-lg font-medium text-neutral-800">{username}</a>
                    </Link>
                  </>
                ) : (
                  <>
                    <User size={24} weight="regular" />
                    <Link href="/sign-in" className="text-lg font-medium">
                      <a className="ml-2.5 text-lg font-medium text-neutral-800">Entrar</a>
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </nav>
          <div>
            <Button variant="secondary" className="md:hidden">
              Anunciar
            </Button>
            <Button variant="secondary" className="hidden md:flex">
              Anunciar um pet
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
