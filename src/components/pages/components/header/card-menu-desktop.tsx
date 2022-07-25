import { AxiosError } from 'axios';
import router from 'next/router';
import { Door, Shield, User } from 'phosphor-react';
import { FC } from 'react';
import { toast } from 'react-toastify';

import Separator from '@/components/common/separator/separator';
import useAccountMenu from '@/hooks/menu/use-menu/use-account-menu';
import useSession from '@/hooks/session/use-session/use-session';

import { TOAST_CONFIGS } from './constants';
import MenuCard from './menu-card';

interface CardMenuDesktopProps {
  mouseOut: () => void;
}

const CardMenuDesktop: FC<CardMenuDesktopProps> = ({ mouseOut }) => {
  const { logout } = useSession();
  const { setPage } = useAccountMenu();
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
  return (
    <nav className="fixed bg-surface-primary p-4 shadow-lg">
      <ul onMouseLeave={mouseOut} className="flex flex-col gap-3">
        <MenuCard
          icon={<User size={24} weight="regular" />}
          href="/account/settings"
          text="Meu cadastro"
          actionFunction={() => setPage('my-cadastre')}
        />
        <Separator />
        <MenuCard
          icon={<Shield size={24} weight="regular" />}
          href="/account/settings/"
          text="Login e segurança"
          actionFunction={() => setPage('security-and-login')}
        />
        <Separator />
        <MenuCard icon={<Door size={24} weight="regular" />} href="#" text="Sair" actionFunction={handleLogout} />
      </ul>
    </nav>
  );
};

export default CardMenuDesktop;
