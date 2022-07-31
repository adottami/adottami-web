import { useRouter } from 'next/router';
import { FC } from 'react';
import { toast } from 'react-toastify';

import Page from '@/components/common/page/page';
import FormPageHeader from '@/components/pages/components/form-page-header/form-page-header';
import PublicationForm from '@/components/pages/components/publication-form/publication-form';
import { TOAST_CONFIGS } from '@/components/pages/sign-up/sign-up-page/constants';
import useAPI from '@/hooks/api/use-api/use-api';
import Publication from '@/models/publication/publication';
import { EditPublicationData } from '@/services/adottami-client/publication-client/types';

import { PAGE_TITLE } from './constants';

const EditPublicationPage: FC = () => {
  const api = useAPI();
  const router = useRouter();
  const publicationId = router.query['publication-id'] as string | undefined;

  async function handleSubmit(values: EditPublicationData): Promise<Publication | undefined> {
    if (!publicationId) {
      return;
    }

    try {
      const editedPublication = await api.adottami.publications.edit(publicationId, values);
      toast.success('Publicação atualizada com sucesso!', TOAST_CONFIGS);
      router.push('/publications/dashboard');
      return editedPublication;
    } catch {
      toast.error('Erro na edição da publicação', TOAST_CONFIGS);
    }
  }

  return (
    <Page title={PAGE_TITLE}>
      <FormPageHeader />

      <PublicationForm type="edit" title={PAGE_TITLE} onSubmit={handleSubmit} publicationId={publicationId} />
    </Page>
  );
};

export default EditPublicationPage;
