import { FC } from 'react';

import CreatePublicationFormFooter from '@/components/pages/publications/create/create-publication-page/components/form-footer';
import EditPublicationFormFooter from '@/components/pages/publications/edit/edit-publication-page/components/form-footer';

interface Props {
  type: 'create' | 'edit';
}

const PublicationFormFooter: FC<Props> = (props) => {
  const { type } = props;

  if (type === 'create') return <CreatePublicationFormFooter />;

  if (type === 'edit') return <EditPublicationFormFooter />;

  return null;
};
export default PublicationFormFooter;
