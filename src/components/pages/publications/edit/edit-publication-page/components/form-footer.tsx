import { FC } from 'react';

import Button from '@/components/common/button/button';

interface Props {}

const EditPublicationFormFooter: FC<Props> = () => {
  return (
    <footer className="mb-20 mt-8">
      <Button type="submit">Salvar alterações</Button>
    </footer>
  );
};

export default EditPublicationFormFooter;
