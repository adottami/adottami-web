import { FC } from 'react';

import Button from '@/components/common/button/button';

interface Props {
  formRef: React.RefObject<HTMLFormElement>;
}

const EditPublicationFormFooter: FC<Props> = (props) => {
  const { formRef } = props;

  return (
    <footer className="mb-20 mt-8">
      <Button onClick={formRef.current?.submit}>Salvar alterações</Button>
    </footer>
  );
};

export default EditPublicationFormFooter;
