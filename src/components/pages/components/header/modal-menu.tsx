import { AxiosError } from 'axios';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import { CaretRight, Door, Heart, MagnifyingGlass, Shield, SquaresFour, User, X } from 'phosphor-react';
import profile from 'public/images/image-profile-not-found.png';
import { FC } from 'react';
import { toast } from 'react-toastify';

import Separator from '@/components/common/separator/separator';
import useAPI from '@/hooks/api/use-api/use-api';
import useMenu from '@/hooks/menu/use-menu/use-account-menu';
import useSession from '@/hooks/session/use-session/use-session';

import { TOAST_CONFIGS } from './constants';
import MenuCard from './menu-card';

interface Props {
  isAuth: boolean;
  avatarPhoto?: string | StaticImageData;
  username: string | null;
  setCloseModal: () => void;
}

const ModalMenu: FC<Props> = ({ setCloseModal, isAuth, avatarPhoto = profile, username }) => {
  const { logout } = useSession();
  const { setPage } = useMenu();
  const api = useAPI();

  const handleButtonLoginAndSecurity = () => {
    setCloseModal();
    setPage('security-and-login');
  };

  const handleLogout = async () => {
    try {
      await api.adottami.session.logout();

      await logout();
      router.push('/');
    } catch (error) {
      if (!(error instanceof AxiosError)) throw error;
      if (error.response?.status === 400) {
        toast.error('Algo deu errado!', TOAST_CONFIGS);
      }
      if (error.response?.status === 401) {
        toast.error('Sem autorização!', TOAST_CONFIGS);
      }
    }
  };

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
              <Link href="/account/settings" passHref>
                <a
                  onClick={() => {
                    setCloseModal();
                    setPage('my-cadastre');
                  }}
                  onKeyUp={() => {
                    setCloseModal();
                    setPage('my-cadastre');
                  }}
                  role="button"
                  tabIndex={0}
                  className="text-sm text-secondary-medium"
                >
                  Minha conta
                </a>
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
        <MenuCard
          icon={<Shield size={20} weight="thin" />}
          href="/account/settings/"
          text="Login e segurança"
          actionFunction={handleButtonLoginAndSecurity}
        />
        <Separator />
        <MenuCard icon={<Door size={20} weight="thin" />} href="#" text="Sair" actionFunction={handleLogout} />
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
