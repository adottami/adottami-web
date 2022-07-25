import { AxiosError } from 'axios';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CaretRight, Door, Heart, MagnifyingGlass, Shield, SquaresFour, User, X } from 'phosphor-react';
import profile from 'public/images/image-profile-not-found.png';
import { FC } from 'react';
import { toast } from 'react-toastify';

import Separator from '@/components/common/separator/separator';
import useMenu from '@/hooks/menu/use-menu/use-account-menu';
import useSession from '@/hooks/session/use-session/use-session';

import { TOAST_CONFIGS } from './constants';
import MenuCard from './menu-card';

interface Props {
  avatarPhoto?: string | StaticImageData;
  setCloseModal: () => void;
}

const ModalMenu: FC<Props> = ({ setCloseModal, avatarPhoto = profile }) => {
  const { logout, user } = useSession();
  const { setPage } = useMenu();
  const router = useRouter();
  const handleButtonLoginAndSecurity = () => {
    setCloseModal();
    setPage('security-and-login');
  };

  const handleLogout = async () => {
    try {
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

  return user ? (
    <nav className="fixed left-0 top-0 z-1 h-full w-full bg-surface-primary pt-6 pl-7 shadow-sm">
      <ul className="flex flex-col gap-6">
        <li className="self-end pr-2">
          <X size={24} weight="bold" onClick={setCloseModal} className="hover:text-secondary-medium" />
        </li>
        <li className="flex items-center justify-between">
          <div className="flex items-center">
            <Image src={avatarPhoto} alt="Foto de perfil" width={42} height={42} className="rounded-full" />
            <div className="pl-4">
              <p>{user.name()}</p>
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
        <Separator />
        <MenuCard
          icon={<Shield size={20} weight="thin" />}
          href="/account/settings"
          text="Login e segurança"
          onClick={handleButtonLoginAndSecurity}
        />
        <Separator />
        <MenuCard icon={<Door size={20} weight="thin" />} href="#" text="Sair" onClick={handleLogout} />
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
      </ul>
    </nav>
  );
};

export default ModalMenu;
