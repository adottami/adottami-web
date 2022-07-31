import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import { CaretDown, List, SquaresFour, User } from 'phosphor-react';
import profile from 'public/images/image-profile-not-found.png';
import { FC, useState } from 'react';

import Button from '@/components/common/button/button';
import Separator from '@/components/common/separator/separator';
import AdottamiLogo from '@/components/icons/adottami-logo';
import useSession from '@/hooks/session/use-session/use-session';

import CardMenuDesktop from './card-menu-desktop';
import MenuCard from './menu-card';
import ModalMenu from './modal-menu';

export interface Props {
  avatarPhoto?: string | StaticImageData;
}

const Header: FC<Props> = ({ avatarPhoto = profile }) => {
  const { user } = useSession();

  const singleName = () => {
    return user?.name().split(' ')[0];
  };

  const [menuHamburguerOpen, setMenuHamburguerOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const closeModal = () => {
    setMenuHamburguerOpen(() => false);
  };

  const openModal = () => {
    setMenuHamburguerOpen(() => true);
  };

  const handleMouseOver = () => {
    setIsHovering(() => true);
  };

  const handleMouseOut = () => {
    setIsHovering(() => false);
  };

  return (
    <header className="w-full">
      <div className="flex items-center justify-between p-6 md:px-24">
        <div className="flex items-center">
          <span className="lg:hidden">
            <List
              data-testid="hamburguer-menu"
              size={32}
              weight="regular"
              onClick={openModal}
              className="hover:text-secondary-medium"
            />
          </span>
          <Link href="/">
            <div>
              <AdottamiLogo className="hidden w-auto cursor-pointer lg:block lg:h-8 2xl:h-10" />
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-16">
          {menuHamburguerOpen === true && <ModalMenu setCloseModal={closeModal} />}
          <nav className="hidden lg:block">
            <ul className="flex gap-6 ">
              <MenuCard
                icon={<SquaresFour size={24} weight="regular" />}
                href={user ? '/publications/dashboard' : '/sign-in'}
                text="Meus Anúncios"
              />
              <div>
                {user ? (
                  <li>
                    <div className="flex items-center">
                      <Image src={avatarPhoto} alt="Foto de perfil" className="rounded-full" />
                      <Link href="#" className="text-lg font-medium">
                        <a className="ml-2.5 text-lg font-medium text-neutral-800">{singleName()}</a>
                      </Link>
                      <CaretDown size={20} className="hover:text-secondary-medium" onMouseOver={handleMouseOver} />
                    </div>
                    {isHovering && <CardMenuDesktop mouseOut={handleMouseOut} />}
                  </li>
                ) : (
                  <MenuCard icon={<User size={24} weight="regular" />} href="/sign-in" text="Entrar" />
                )}
              </div>
            </ul>
          </nav>
          <div>
            <Button
              variant="secondary"
              className="md:hidden"
              onClick={() => router.push(user ? '/publications/create' : '/sign-in')}
            >
              Anunciar
            </Button>
            <Button
              variant="secondary"
              className="hidden md:flex"
              onClick={() => router.push(user ? '/publications/create' : '/sign-in')}
            >
              Anunciar um pet
            </Button>
          </div>
        </div>
      </div>
      <Separator />
    </header>
  );
};

export default Header;
