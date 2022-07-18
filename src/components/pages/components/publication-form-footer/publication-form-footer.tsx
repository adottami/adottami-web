import { FC } from 'react';

import CreatePublicationFormFooter from '../../publications/create/create-publication-page/components/form-footer';
import EditPublicationFormFooter from '../../publications/edit/edit-publication-page/components/form-footer';

interface Props {
  type: 'create' | 'edit';
  formRef: React.RefObject<HTMLFormElement>;
}

const PublicationFormFooter: FC<Props> = (props) => {
  const { type, formRef } = props;

  if (type === 'create') return <CreatePublicationFormFooter formRef={formRef} />;

  if (type === 'edit') return <EditPublicationFormFooter formRef={formRef} />;

  return null;
};
export default PublicationFormFooter;
