import { FC } from 'react';

import Page from '@/components/common/page/page';
import FormPageHeader from '@/components/pages/components/form-page-header/form-pageheader';
import PublicationForm from '@/components/pages/components/publication-form/publication-form';

import { PAGE_TITLE } from './constants';

const CreatePublicationPage: FC = () => {
  return (
    <Page title={PAGE_TITLE}>
      <FormPageHeader />

      <div className="mx-auto w-full max-w-5xl px-6">
        <PublicationForm type="create" header="Qual pet você está anunciando?" onSubmit={() => console.log('oi')} />
      </div>
    </Page>
  );
};

export default CreatePublicationPage;
