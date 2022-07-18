import { FC } from 'react';

import Page from '@/components/common/page/page';
import FormPageHeader from '@/components/pages/components/form-page-header/form-pageheader';
import PublicationForm from '@/components/pages/components/publication-form/publication-form';
import { CreatePublicationData } from '@/services/adottami-client/publication-client/types';

import { PAGE_TITLE } from './constants';

const CreatePublicationPage: FC = () => {
  async function handleSubmit(values: CreatePublicationData) {
    console.log('oiiiiii');
    console.log(values);
  }

  return (
    <Page title={PAGE_TITLE}>
      <FormPageHeader />

      <div className="mx-auto w-full max-w-5xl px-6">
        <PublicationForm type="create" header="Qual pet você está anunciando?" onSubmit={handleSubmit} />
      </div>
    </Page>
  );
};

export default CreatePublicationPage;
