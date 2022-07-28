import { FC } from 'react';

import Page from '@/components/common/page/page';
import FormPageHeader from '@/components/pages/components/form-page-header/form-page-header';
import PublicationForm from '@/components/pages/components/publication-form/publication-form';
import Publication from '@/models/publication/publication';
import { EditPublicationData } from '@/services/adottami-client/publication-client/types';

import { PAGE_TITLE } from './constants';

const EditPublicationPage: FC = () => {
  async function handleSubmit(values: EditPublicationData): Promise<Publication> {
    console.log(values);
    return {} as Publication;
  }

  return (
    <Page title={PAGE_TITLE}>
      <FormPageHeader />

      <PublicationForm type="edit" title={PAGE_TITLE} onSubmit={handleSubmit} />
    </Page>
  );
};

export default EditPublicationPage;
