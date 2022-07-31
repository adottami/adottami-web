import { FC } from 'react';

import InlineLink from '@/components/common/inline-link/inline-link';
import AdottamiLogo from '@/components/icons/adottami-logo';
import useSession from '@/hooks/session/use-session/use-session';

import { footerTestIds } from './constants';

interface Props {}

const Footer: FC<Props> = () => {
  const { user } = useSession();

  return (
    <div className="w-full border-t-2 border-t-neutral-100 bg-surface-secondary">
      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:justify-between sm:px-24 sm:py-12">
        <div>
          <AdottamiLogo width="200" height="40" className="mb-4" data-testid={footerTestIds.logo()} />
          <p className="text-primary-dark" data-testid={footerTestIds.description()}>
            Oferecemos uma plataforma de adoção e simples, prática e agradável para facilitar a adoção e anuncio de
            animais vivendo em situações precarias.
          </p>
        </div>
        <div
          className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6"
          data-testid={footerTestIds.inlineLinks()}
        >
          <InlineLink href={user !== null ? '/publications/dashboard' : '/sign-in'}>Meus anúncios</InlineLink>
          <InlineLink href="/publications/search">Adotar pet</InlineLink>
          <InlineLink href={user !== null ? '/publications/create' : '/sign-in'}>Anunciar pet</InlineLink>
        </div>
      </div>
      <div className="border-t-2 border-t-neutral-100">
        <div className="flex flex-col gap-2 p-6 sm:flex-row sm:justify-between sm:px-24 sm:py-12">
          <span className="text-sm text-neutral-500" data-testid={footerTestIds.copyright()}>
            Adottami | Copyright © 2022 - Todo os Direitos Reservados
          </span>
          <div className="flex items-center gap-3 text-neutral-200" data-testid={footerTestIds.policyAndTerms()}>
            <InlineLink href="#">Política de privacidade</InlineLink> • <InlineLink href="#">Termos de uso</InlineLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
