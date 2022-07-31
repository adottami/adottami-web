import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';

import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';
import { TOAST_CONFIGS } from '@/components/pages/sign-in/sign-in-page/constants';
import useAPI from '@/hooks/api/use-api/use-api';
import useSession from '@/hooks/session/use-session/use-session';

import AccountSettingsSection from '../account-settings-section';
import DefaultSection from '../default-section';
import { DATA_TESTID, SECTION_TITLE } from './constants';
import { loginAndSecurityFormSchema } from './schemas/login-and-security-form-schema';
import { ChangePasswordFormData } from './types';

interface Props {}

const LoginAndSecurity: FC<Props> = () => {
  const { user } = useSession();
  const api = useAPI();

  const [step, setStep] = useState<number>(1);
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const { values, errors, handleChange, handleSubmit } = useFormik<ChangePasswordFormData>({
    initialValues: { currentPassword: '', newPassword: '', confirmNewPassword: '' },
    validationSchema: loginAndSecurityFormSchema,
    onSubmit,
  });

  async function onSubmit(formValues: ChangePasswordFormData) {
    if (!user) {
      return;
    }

    try {
      await api.adottami.users.changePassword(user.id(), {
        currentPassword: formValues.currentPassword,
        newPassword: formValues.newPassword,
      });
      toast.success('Senha alterada com sucesso', TOAST_CONFIGS);
    } catch (error) {
      if (!(error instanceof AxiosError)) throw error;
      if (error.response?.status === 400) {
        toast.error('Senha inválida. Por favor, tente novamente.', TOAST_CONFIGS);
        return;
      }

      toast.error('Ocorreu um erro ao alterar sua senha! Tente novamente mais tarde.', TOAST_CONFIGS);
    }
  }

  const onHandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setShowErrors(true);
    handleSubmit(event);
  };

  if (step === 1) {
    return (
      <AccountSettingsSection
        title="Alteração de senha"
        description={[
          <p key="first line">Escolha uma senha forte que você não esteja usando em nenhum outro lugar.</p>,
          <p key="second line">Troque sua senha a cada 6 meses para aumentar a segurança da sua conta.</p>,
        ]}
      >
        <div>
          <Button onClick={() => setStep(2)}>Alterar senha</Button>
        </div>
      </AccountSettingsSection>
    );
  }

  return (
    <DefaultSection
      data-testid={DATA_TESTID}
      title={SECTION_TITLE}
      description="Aumente a segurança e tenha o controle da sua conta"
    >
      <AccountSettingsSection
        title="Alteração de senha"
        description={[
          <p key="first line">Escolha uma senha forte que você não esteja usando em nenhum outro lugar.</p>,
          <p key="second line">Troque sua senha a cada 6 meses para aumentar a segurança da sua conta.</p>,
        ]}
      >
        <form className="flex flex-col gap-4" onSubmit={onHandleSubmit} noValidate>
          <Input
            label="Senha atual"
            placeholder="Digite sua senha atual"
            variant="password"
            isRequired
            name="currentPassword"
            id="currentPassword"
            value={values.currentPassword}
            errorMessage={showErrors ? errors.currentPassword : ''}
            onChange={handleChange}
          />
          <Input
            label="Nova senha"
            placeholder="Digite sua nova senha"
            variant="password"
            description="6 ou mais caracteres"
            isRequired
            name="newPassword"
            id="newPassword"
            value={values.newPassword}
            errorMessage={showErrors ? errors.newPassword : ''}
            onChange={handleChange}
          />
          <Input
            label="Confirmar nova senha"
            placeholder="Digite sua nova senha novamente"
            variant="password"
            description="6 ou mais caracteres"
            isRequired
            name="confirmNewPassword"
            id="confirmNewPassword"
            value={values.confirmNewPassword}
            errorMessage={showErrors ? errors.confirmNewPassword : ''}
            onChange={handleChange}
          />

          <div className="mt-4">
            <Button type="submit">Enviar</Button>
          </div>
        </form>
      </AccountSettingsSection>
    </DefaultSection>
  );
};

export default LoginAndSecurity;
