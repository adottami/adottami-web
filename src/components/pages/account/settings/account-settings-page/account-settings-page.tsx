import { FC } from 'react';

import Page from '@/components/common/page/page';
import Footer from '@/components/pages/components/footer/footer';
import Header from '@/components/pages/components/header/header';
import useMenu from '@/hooks/menu/use-menu/use-account-menu';

import LoginAndSecurity from './components/login-and-security/login-and-security';
import MyCadastre from './components/my-cadastre/my-cadastre';
import NavBar from './components/navbar';
import { PAGE_TITLE } from './constants';

const AccountSettingsPage: FC = () => {
  const { page, setPage } = useMenu();
  return (
    <Page title={PAGE_TITLE}>
      <div className="h-screen">
        <Header isAuth username="Matheus" />

        <div className="mx-auto mt-14 mb-24 flex w-full max-w-4xl justify-between gap-8 px-8">
          <NavBar selectedPage={page} setSelectedPage={setPage} />

          {page === 'my-cadastre' ? <MyCadastre /> : <LoginAndSecurity />}
        </div>

        <Footer />
      </div>
    </Page>
  );
};

export default AccountSettingsPage;
