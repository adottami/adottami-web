import { FC, RefObject } from 'react';

import { PublicationFormRef } from '@/components/pages/components/publication-form/publication-form';

interface Props {
  formRef: RefObject<PublicationFormRef>;
}

const FormFooter: FC<Props> = () => null;

export default FormFooter;
