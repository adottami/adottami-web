import { Shield, User } from 'phosphor-react';
import { FC, useState } from 'react';

import Page from '@/components/common/page/page';
import Footer from '@/components/pages/components/footer/footer';
import Header from '@/components/pages/components/header/header';

import LoginAndSecurity from './components/login-and-security/login-and-security';
import MyCadastre from './components/my-cadastre/my-cadastre';
import { PAGE_TITLE } from './constants';

type PageType = 'my-cadastre' | 'security-and-login';

const AccountSettingsPage: FC = () => {
  const [selectedPage, setSelectedPage] = useState<PageType>('my-cadastre');

  const navBarOptions = [
    {
      icon: <User size={24} />,
      label: 'Meu cadastro',
      isSelected: selectedPage === 'my-cadastre',
      onClick: () => setSelectedPage('my-cadastre'),
    },
    {
      icon: <Shield size={24} />,
      label: 'Login e segurança',
      isSelected: selectedPage === 'security-and-login',
      onClick: () => setSelectedPage('security-and-login'),
    },
  ];

  const optionColors = (isSelected: boolean) => {
    return isSelected ? 'bg-secondary-medium/[0.15] text-secondary-medium' : 'text-neutral-500';
  };

  return (
    <Page title={PAGE_TITLE}>
      <div className="h-screen">
        <Header isAuth username="Matheus" />

        <div className="mx-auto mt-14 mb-24 flex w-full max-w-4xl justify-between gap-8 px-8">
          <div className="mt-4 hidden lg:flex">
            <nav>
              <ul className="flex flex-col gap-4">
                {navBarOptions.map((option) => (
                  <li>
                    <button
                      type="button"
                      onClick={option.onClick}
                      className={`flex w-full gap-4 rounded-full ${optionColors(
                        option.isSelected,
                      )} cursor-pointer py-2 px-4`}
                    >
                      {option.icon}
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {selectedPage === 'my-cadastre' ? <MyCadastre /> : <LoginAndSecurity />}
        </div>

        <Footer />
      </div>
    </Page>
  );
};

export default AccountSettingsPage;
