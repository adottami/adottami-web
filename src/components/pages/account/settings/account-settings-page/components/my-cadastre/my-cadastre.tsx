import { useFormik } from 'formik';
import Image from 'next/image';
import profile from 'public/images/image-profile-not-found.png';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';
import { TOAST_CONFIGS } from '@/components/pages/sign-in/sign-in-page/constants';
import useAPI from '@/hooks/api/use-api/use-api';
import useSession from '@/hooks/session/use-session/use-session';
import { applyPhoneMask, undoPhoneMask } from '@/utils/mask';

import AccountSettingsSection from '../account-settings-section';
import DefaultSection from '../default-section';
import { DATA_TESTID, SECTION_TITLE } from './constants';
import { myCadastreFormSchema } from './schemas/my-cadastre-form-schema';
import { MyCadastreFormData } from './types';

interface Props {}

const MyCadastre: FC<Props> = () => {
  const { user } = useSession();
  const api = useAPI();

  const [showErrors, setShowErrors] = useState<boolean>(false);

  const { values, errors, setFieldValue, handleChange, handleSubmit } = useFormik<MyCadastreFormData>({
    initialValues: { name: user?.name(), phone: user?.phoneNumber() },
    validationSchema: myCadastreFormSchema,
    onSubmit,
  });

  useEffect(() => {
    if (user) {
      setFieldValue('name', user.name());
      setFieldValue('phone', user.phoneNumber());
    }
  }, [user, setFieldValue]);

  async function onSubmit(values: MyCadastreFormData) {
    if (!user) {
      return;
    }

    try {
      await api.adottami.users.edit(user.id(), {
        name: values.name || user.name(),
        phoneNumber: undoPhoneMask(values.phone || ''),
        email: user.email(),
      });

      toast.success('Dados de cadastro alterados com sucesso!', TOAST_CONFIGS);
    } catch {
      toast.error('Erro ao alterar dados de cadastro!', TOAST_CONFIGS);
    }
  }

  const onHandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setShowErrors(true);
    handleSubmit(event);
  };

  return (
    <DefaultSection data-testid={DATA_TESTID} title={SECTION_TITLE} description="Configure o seu cadastro.">
      <AccountSettingsSection title="Dados da conta">
        <form className="flex flex-col gap-4" onSubmit={onHandleSubmit}>
          <div className="flex w-16 flex-col items-center gap-4">
            <Image src={profile} alt="Foto de perfil" width={64} height={64} className="rounded-full" />
          </div>

          <Input
            label="Nome completo"
            value={values.name || ''}
            name="name"
            id="name"
            errorMessage={showErrors ? errors.name : ''}
            isRequired
            onChange={handleChange}
          />
          <Input
            label="Telefone"
            value={applyPhoneMask(values.phone || '')}
            name="phone"
            id="phone"
            onChange={handleChange}
            isRequired
          />

          <div className="mt-4">
            <Button type="submit">Salvar alterações</Button>
          </div>
        </form>
      </AccountSettingsSection>
    </DefaultSection>
  );
};

export default MyCadastre;
