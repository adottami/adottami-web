import Image from 'next/image';
import banner from 'public/images/dog-528x579.png';
import { FC } from 'react';

import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';
import AdottamiLogo from '@/components/icons/adottami-logo';

const SignInPage: FC = () => {
  return (
    <div className="flex min-h-screen w-full overflow-y-auto">
      <div className="mx-[1.5rem] my-[1rem] flex h-full w-full flex-col items-start gap-8 md:m-[3.5rem] md:w-1/2 xl:m-[6rem]">
        <AdottamiLogo className="h-6 w-auto md:h-8" />

        <div className="w-full md:w-3/4">
          <div className="flex flex-col gap-4 md:gap-6">
            <h3 className="w-full text-xl font-bold text-primary-dark md:text-2xl">Acesse a sua conta</h3>
            <div className="flex flex-col gap-4 md:gap-8">
              <div className="flex flex-col gap-2">
                <Input type="text" label="E-mail" placeholder="Digite seu e-mail" isRequired />
                <Input variant="password" label="Senha" placeholder="Digite sua senha" isRequired />
              </div>
              <Button size="md">Entrar</Button>
            </div>
            <p className="text-center text-sm text-neutral-500">
              Ao continuar, você concorda com os <a>Termos de Uso</a> e a <a>Política de Privacidade</a> da Adottami, e
              também, em receber comunicações via e-mail.
            </p>
            <hr className="w-full border-neutral-100" />
            <p className="w-full text-center text-sm text-neutral-800 md:text-md">
              Não tem uma conta ?{' '}
              <a href="" className="text-sm text-secondary-medium md:text-md">
                Cadastre-se
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden h-auto w-1/2 items-center justify-center bg-surface-secondary px-[6rem] md:flex">
        <Image
          src={banner}
          className="h-full object-cover"
          alt="Banner com a imagem de um cachorro, coelho, gato e pegadas de patas no fundo "
        />
      </div>
    </div>
  );
};

export default SignInPage;
