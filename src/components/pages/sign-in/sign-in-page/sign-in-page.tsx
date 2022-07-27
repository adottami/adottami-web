import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import Image from 'next/image';
import router from 'next/router';
import banner from 'public/images/dog-528x579.png';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';

import Button from '@/components/common/button/button';
import InlineLink from '@/components/common/inline-link/inline-link';
import Input from '@/components/common/input/input';
import Page from '@/components/common/page/page';
import Separator from '@/components/common/separator/separator';
import AdottamiLogo from '@/components/icons/adottami-logo';
import useSession from '@/hooks/session/use-session/use-session';

import { PAGE_TITLE, singInPageTestIds, TOAST_CONFIGS } from './constants';
import { authenticationSchema } from './schema/authentication-schema';

const SignInPage: FC = () => {
  const session = useSession();
  const [showErrors, setShowErrors] = useState(false);
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: authenticationSchema,
    onSubmit: async (values) => {
      const userData = {
        email: values.email,
        password: values.password,
      };
      try {
        await session.login(userData);
        toast.success('Login realizado com sucesso!', TOAST_CONFIGS);
        router.push('/');
      } catch (error) {
        if (!(error instanceof AxiosError)) throw error;
        if (error.response?.status === 400) {
          toast.error('E-mail ou senha incorreta', TOAST_CONFIGS);
        }
      }
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setShowErrors(true);
    handleSubmit(e);
  };

  return (
    <Page title={PAGE_TITLE}>
      <div className="flex min-h-screen w-full overflow-y-auto">
        <div className="mx-[1.5rem] my-[2.5rem] flex h-full w-full flex-col items-start gap-8 md:m-[3.5rem] md:w-1/2 xl:m-[6rem] 2xl:gap-14">
          <AdottamiLogo className="h-6 w-auto md:h-8 2xl:h-10" />
          <div className="w-full md:w-3/4 xl:w-4/6">
            <div className="flex flex-col gap-4 md:gap-6">
              <h3
                data-testid={singInPageTestIds.title()}
                className="w-full text-xl font-bold text-primary-dark md:text-2xl"
              >
                Acesse a sua conta
              </h3>
              <form onSubmit={onSubmit} className="flex flex-col gap-6 md:gap-8">
                <div className="flex flex-col gap-2">
                  <Input
                    data-testid={singInPageTestIds.emailInput()}
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
                    data-testid={singInPageTestIds.passwordInput()}
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
                <Button type="submit" data-testid={singInPageTestIds.button()}>
                  Entrar
                </Button>
              </form>
              <div className="flex flex-col gap-4 md:gap-6">
                <p className="text-center text-sm text-neutral-500 md:text-md">
                  Ao continuar, você concorda com os <InlineLink>Termos de Uso</InlineLink> e a{' '}
                  <InlineLink>Política de Privacidade</InlineLink> da Adottami, e também, em receber comunicações via
                  e-mail.
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
            data-testid={singInPageTestIds.decorativeImage()}
            src={banner}
            width={528}
            className="h-full object-cover"
            alt="Banner com a imagem de um cachorro, coelho, gato e pegadas de patas no fundo "
          />
        </div>
      </div>
    </Page>
  );
};

export default SignInPage;
