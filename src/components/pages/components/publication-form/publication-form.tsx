import { FC, RefObject } from 'react';

import { PublicationFields } from '@/models/publication/types';

interface Props {
  header: string;
  onSubmit(values: PublicationFields): void;
  ref: RefObject<HTMLFormElement> | null;
}

const PublicationForm: FC<Props> = (props) => {
  const { ref } = props;

  return <form ref={ref} />;
};

export default PublicationForm;
