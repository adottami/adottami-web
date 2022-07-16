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
import { ApplyPhoneMask, UndoPhoneMask } from '@/utils/mask';

import { PAGE_TITLE } from './constants';
import { RegisterSchema } from './schemas/register-schema';

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
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
        phoneNumber: UndoPhoneMask(values.telephone),
      };
      try {
        await api.adottami.users.create(userData);
        toast.success('Cadastro realizado com sucesso!', {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        await session.login(userData);
        router.push('/');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.response?.status === 400) {
          toast.error('Usuário já existente. Por favor, tente novamente.', {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
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
              <form className="flex flex-col gap-6 md:gap-8" onSubmit={onSubmit}>
                <div className="flex flex-col gap-2">
                  <Input
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
                    type="text"
                    name="telephone"
                    label="Telefone"
                    placeholder="(XX) XXXXXXXXX"
                    value={ApplyPhoneMask(values.telephone)}
                    onChange={handleChange}
                    errorMessage={showErrors ? errors.telephone : ''}
                    isRequired
                  />
                  <Input
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
                <Button type="submit">Criar conta</Button>
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
