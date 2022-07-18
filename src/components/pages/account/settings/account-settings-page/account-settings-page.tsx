import { Shield, User } from 'phosphor-react';
import { FC, useState } from 'react';

import Page from '@/components/common/page/page';
import Footer from '@/components/pages/components/footer/footer';
import Header from '@/components/pages/components/header/header';

import { PAGE_TITLE } from './constants';

type PageType = 'my-cadastre' | 'security-and-login';

const AccountSettingsPage: FC = () => {
  const [selectedPage] = useState<PageType>('my-cadastre');

  const navBarOptions = [
    {
      icon: <User size={24} />,
      label: 'Meu cadastro',
      isSelected: selectedPage === 'my-cadastre',
    },
    {
      icon: <Shield size={24} />,
      label: 'Login e segurança',
      isSelected: selectedPage === 'security-and-login',
    },
  ];

  const optionColors = (isSelected: boolean) => {
    return isSelected ? 'bg-secondary-medium/[0.15] text-secondary-medium' : 'text-neutral-500';
  };

  return (
    <Page title={PAGE_TITLE}>
      <Header isAuth username="Matheus" />
      <div className="mx-auto mb-auto mt-14 flex w-full max-w-2xl">
        <nav>
          <ul className="flex flex-col gap-4">
            {navBarOptions.map((option) => (
              <li className={`flex gap-4 rounded-full ${optionColors(option.isSelected)} cursor-pointer py-2 px-4`}>
                {option.icon}
                {option.label}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <Footer />
    </Page>
  );
};

export default AccountSettingsPage;
