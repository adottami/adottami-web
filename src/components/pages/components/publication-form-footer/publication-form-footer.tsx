import { FC } from 'react';

import FormFooter from '../../publications/create/create-publication-page/components/form-footer';

interface Props {
  type: 'create' | 'edit';
  formRef: React.RefObject<HTMLFormElement>;
}

const PublicationFormFooter: FC<Props> = (props) => {
  const { type, formRef } = props;

  if (type === 'create') return <FormFooter formRef={formRef} />;

  return null;
};
export default PublicationFormFooter;
