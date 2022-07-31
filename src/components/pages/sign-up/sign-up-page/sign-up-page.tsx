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
import useAPI from '@/hooks/api/use-api/use-api';
import useSession from '@/hooks/session/use-session/use-session';
import { applyPhoneMask, undoPhoneMask } from '@/utils/mask';

import { PAGE_TITLE, signUpPageTestIds, TOAST_CONFIGS } from './constants';
import { registerSchema } from './schemas/register-schema';

const SignUpPage: FC = () => {
  const api = useAPI();
  const session = useSession();

  const [showErrors, setShowErrors] = useState(false);
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      email: '',
      telephone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
        phoneNumber: undoPhoneMask(values.telephone),
      };
      try {
        await api.adottami.users.create(userData);
        toast.success('Cadastro realizado com sucesso!', TOAST_CONFIGS);
        await session.login(userData);
        router.push('/');
      } catch (error) {
        if (!(error instanceof AxiosError)) throw error;
        if (error.response?.status === 400) {
          toast.error('Usuário já existente. Por favor, tente novamente.', TOAST_CONFIGS);
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
          <AdottamiLogo className="h-6 w-auto cursor-pointer md:h-8 2xl:h-10" onClick={() => router.push('/')} />
          <div className="w-full md:w-3/4 xl:w-4/6">
            <h3
              data-testid={signUpPageTestIds.title()}
              className="w-full text-xl font-bold text-primary-dark md:text-2xl"
            >
              Crie a sua conta
            </h3>
            <div className="flex flex-col gap-4 md:gap-6">
              <form className="flex flex-col gap-6 md:gap-8" onSubmit={onSubmit}>
                <div className="flex flex-col gap-2">
                  <Input
                    data-testid={signUpPageTestIds.nameInput()}
                    name="name"
                    type="text"
                    label="Nome completo"
                    placeholder="Ex: Matheus Silveira Barros"
                    value={values.name}
                    onChange={handleChange}
                    errorMessage={showErrors ? errors.name : ''}
                    isRequired
                  />
                  <Input
                    data-testid={signUpPageTestIds.emailInput()}
                    name="email"
                    type="text"
                    label="E-mail"
                    placeholder="Ex: mathues.silveira@gmail.com"
                    value={values.email}
                    onChange={handleChange}
                    errorMessage={showErrors ? errors.email : ''}
                    isRequired
                  />

                  <Input
                    data-testid={signUpPageTestIds.telephoneInput()}
                    type="text"
                    name="telephone"
                    label="Telefone"
                    placeholder="(XX) XXXXXXXXX"
                    value={applyPhoneMask(values.telephone)}
                    onChange={handleChange}
                    errorMessage={showErrors ? errors.telephone : ''}
                    isRequired
                  />
                  <Input
                    data-testid={signUpPageTestIds.passwordInput()}
                    name="password"
                    variant="password"
                    label="Senha"
                    placeholder="Digite sua senha"
                    description="6 ou mais caracteres"
                    value={values.password}
                    onChange={handleChange}
                    errorMessage={showErrors ? errors.password : ''}
                    isRequired
                  />
                  <Input
                    data-testid={signUpPageTestIds.confirmPasswordInput()}
                    name="confirmPassword"
                    variant="password"
                    label="Confirmar senha"
                    placeholder="Digite sua senha novamente"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    errorMessage={showErrors ? errors.confirmPassword : ''}
                    isRequired
                  />
                </div>
                <Button data-testid={signUpPageTestIds.button()} type="submit">
                  Criar conta
                </Button>
              </form>
              <div className="flex flex-col gap-4 md:gap-6">
                <p className="text-center text-sm text-neutral-500 md:text-md">
                  Ao continuar, você concorda com os <InlineLink href="#">Termos de Uso</InlineLink> e a{' '}
                  <InlineLink href="#">Política de Privacidade</InlineLink> da Adottami, e também, em receber
                  comunicações via e-mail.
                </p>
                <Separator />
                <p className="text-center text-sm text-neutral-800 md:text-md">
                  Já tem uma conta? <InlineLink href="/sign-in">Login</InlineLink>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden h-auto w-1/2 items-center justify-center bg-surface-secondary px-[6rem] md:flex">
          <Image
            data-testid={signUpPageTestIds.decorativeImage()}
            src={banner}
            height={528}
            className="h-full object-cover"
            alt="Banner com a imagem de um cachorro, coelho, gato e pegadas de patas no fundo "
          />
        </div>
      </div>
    </Page>
  );
};

export default SignUpPage;
