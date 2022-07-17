import { FC } from 'react';

import Button from '@/components/common/button/button';
import InlineLink from '@/components/common/inline-link/inline-link';

interface Props {
  formRef: React.RefObject<HTMLFormElement>;
}

const FormFooter: FC<Props> = (props) => {
  const { formRef } = props;

  return (
    <div className="mb-20 mt-8 flex flex-col gap-4 md:flex-row md:gap-8">
      <div className="flex-1 text-sm lg:text-base">
        <p>
          A Adottami não compartilha seus dados com empresas. O uso de seus dados pode ser consultado em nossos{' '}
          <InlineLink href="/publications/create">Termos de uso</InlineLink> e{' '}
          <InlineLink href="/publications/create">Política de privacidade</InlineLink>
        </p>

        <p>Ao enviar seu anúncio, você estará concordando com ambos</p>
      </div>

      <div className="w-44">
        <Button onClick={formRef.current?.submit}>Publicar anúncio</Button>
      </div>
    </div>
  );
};

export default FormFooter;
