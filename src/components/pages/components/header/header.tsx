import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { CaretDown, Heart, List, SquaresFour, User } from 'phosphor-react';
import profile from 'public/images/image-profile-not-found.png';
import { FC, useEffect, useState } from 'react';

import Button from '@/components/common/button/button';
import Separator from '@/components/common/separator/separator';
import AdottamiLogo from '@/components/icons/adottami-logo';
import useSession from '@/hooks/session/use-session/use-session';

import CardMenuDesktop from './card-menu-desktop';
import MenuCard from './menu-card';
import ModalMenu from './modal-menu';

export interface Props {
  isAuth?: boolean;
  avatarPhoto?: string | StaticImageData;
  username?: string | null;
}

const Header: FC<Props> = ({ avatarPhoto = profile }) => {
  const [name, setName] = useState('');
  const { user } = useSession();
  useEffect(() => {
    if (user) {
      setName(() => user.name());
    }
  }, [name, user]);

  const singleName = () => {
    return name.split(' ')[0];
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
      <div className="flex items-center justify-around p-6">
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
          {menuHamburguerOpen === true && (
            <ModalMenu isAuth={!!user?.name} setCloseModal={closeModal} username={name} />
          )}
          <nav className="hidden lg:block">
            <ul className="flex gap-6 ">
              <MenuCard
                icon={<SquaresFour size={24} weight="regular" />}
                href="/publications/dashboard"
                text="Meus Anúncios"
              />
              <MenuCard icon={<Heart size={24} weight="regular" />} href="#" text="Favoritos" />
              <div>
                {user?.name ? (
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
            <Button variant="secondary" className="md:hidden">
              Anunciar
            </Button>
            <Button variant="secondary" className="hidden md:flex">
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
