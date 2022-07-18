import { useRouter } from 'next/router';
import { FC } from 'react';

import Separator from '@/components/common/separator/separator';
import AdottamiLogo from '@/components/icons/adottami-logo';

const FormPageHeader: FC = () => {
  const router = useRouter();

  function handleBackHomePage() {
    router.push('/');
  }

  return (
    <>
      <header className="flex w-full justify-center">
        <div className="flex w-full max-w-6xl items-center px-6 py-8">
          <div>
            <AdottamiLogo className="h-8 w-auto cursor-pointer" onClick={handleBackHomePage} />
          </div>
        </div>
      </header>
      <Separator />
    </>
  );
};

export default FormPageHeader;
