import { useRouter } from 'next/router';
import { FC } from 'react';
import { toast } from 'react-toastify';

import Page from '@/components/common/page/page';
import FormPageHeader from '@/components/pages/components/form-page-header/form-page-header';
import PublicationForm from '@/components/pages/components/publication-form/publication-form';
import { TOAST_CONFIGS } from '@/components/pages/sign-in/sign-in-page/constants';
import useAPI from '@/hooks/api/use-api/use-api';
import Publication from '@/models/publication/publication';
import { CreatePublicationData } from '@/services/adottami-client/publication-client/types';

import { FORM_TITLE, PAGE_TITLE } from './constants';

const CreatePublicationPage: FC = () => {
  const api = useAPI();
  const router = useRouter();

  async function handleSubmit(values: CreatePublicationData): Promise<Publication | undefined> {
    try {
      const createdPublication = await api.adottami.publications.create(values);
      toast.success('Publicação criada com sucesso!', TOAST_CONFIGS);
      router.push('/publications/dashboard');
      return createdPublication;
    } catch {
      toast.error('Erro na criação da publicação', TOAST_CONFIGS);
    }
  }

  return (
    <Page title={PAGE_TITLE}>
      <FormPageHeader />

      <PublicationForm type="create" title={FORM_TITLE} onSubmit={handleSubmit} />
    </Page>
  );
};

export default CreatePublicationPage;
