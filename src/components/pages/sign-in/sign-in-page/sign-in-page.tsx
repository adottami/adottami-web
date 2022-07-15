import axios from 'axios';
import { useFormik } from 'formik';
import Image from 'next/image';
import banner from 'public/images/dog-528x579.png';
import { FC, useState } from 'react';

import Button from '@/components/common/button/button';
import InlineLink from '@/components/common/inline-link/inline-link';
import Input from '@/components/common/input/input';
import Separator from '@/components/common/separator/separator';
import AdottamiLogo from '@/components/icons/adottami-logo';
import globalConfig from '@/config/global-config/global-config';
import SessionClient from '@/services/adottami-client/session-client/session-client';

import { AuthenticationSchema } from './schema/authentication-schema';

const SignInPage: FC = () => {
  const baseURL = globalConfig.baseAdottamiURL();

  const api = axios.create({ baseURL });
  const sessionClient = new SessionClient(api);
  const [showErrors, setShowErrors] = useState(false);
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: AuthenticationSchema,
    onSubmit(values): void {
      sessionClient.login(values);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setShowErrors(true);
    handleSubmit(e);
  };

  return (
    <div className="flex min-h-screen w-full overflow-y-auto">
      <div className="mx-[1.5rem] my-[2.5rem] flex h-full w-full flex-col items-start gap-8 md:m-[3.5rem] md:w-1/2 xl:m-[6rem] 2xl:gap-14">
        <AdottamiLogo className="h-6 w-auto md:h-8 2xl:h-10" />

        <div className="w-full md:w-3/4 xl:w-4/6">
          <div className="flex flex-col gap-4 md:gap-6">
            <h3 className="w-full text-xl font-bold text-primary-dark md:text-2xl">Acesse a sua conta</h3>
            <form onSubmit={onSubmit} className="flex flex-col gap-6 md:gap-8">
              <div className="flex flex-col gap-2">
                <Input
                  name="email"
                  type="text"
                  label="E-mail"
                  value={values.email}
                  placeholder="Digite seu e-mail"
                  isRequired
                  errorMessage={showErrors ? errors.email : ''}
                  onChange={handleChange}
                />
                <Input
                  name="password"
                  variant="password"
                  label="Senha"
                  value={values.password}
                  placeholder="Digite sua senha"
                  isRequired
                  errorMessage={showErrors ? errors.password : ''}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit">Entrar</Button>
            </form>
            <div className="flex flex-col gap-4 md:gap-6">
              <p className="text-center text-sm text-neutral-500 md:text-md">
                Ao continuar, você concorda com os <InlineLink href="#">Termos de Uso</InlineLink> e a{' '}
                <InlineLink href="#">Política de Privacidade</InlineLink> da Adottami, e também, em receber comunicações
                via e-mail.
              </p>
              <Separator />
              <p className="text-center text-sm text-neutral-800 md:text-md">
                Não tem uma conta? <InlineLink href="/sign-up">Cadastre-se</InlineLink>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden h-auto w-1/2 items-center justify-center bg-surface-secondary px-[6rem] md:flex">
        <Image
          src={banner}
          loading="lazy"
          alt="Banner com a imagem de um cachorro, coelho, gato e pegadas de patas no fundo "
        />
      </div>
    </div>
  );
};

export default SignInPage;
