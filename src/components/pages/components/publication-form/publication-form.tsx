import { FC } from 'react';

import { PublicationFields } from '@/models/publication/types';

export interface OnFieldChangeProps {
  field: keyof PublicationFields;
  value: PublicationFields[keyof PublicationFields];
}

interface Props {
  header: string;
  formData: PublicationFields;
  onFieldChange(props: OnFieldChangeProps): void;
}

const PublicationForm: FC<Props> = () => {
  return null;
};

export default PublicationForm;
