import { FC, useRef } from 'react';

import Page from '@/components/common/page/page';
import FormPageHeader from '@/components/pages/components/form-page-header/form-pageheader';
import PublicationForm, { PublicationFormRef } from '@/components/pages/components/publication-form/publication-form';

import FormFooter from './components/form-footer';
import { PAGE_TITLE } from './constants';

const CreatePublicationPage: FC = () => {
  const formRef = useRef<PublicationFormRef>(null);

  return (
    <Page title={PAGE_TITLE}>
      <FormPageHeader />

      <PublicationForm header="Qual pet você está anunciando?" ref={formRef} onSubmit={console.log} />

      <FormFooter formRef={formRef} />
    </Page>
  );
};

export default CreatePublicationPage;
