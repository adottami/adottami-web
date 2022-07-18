import { FC } from 'react';

import Box from '../box';
import DefaultSection from '../default-section';

interface Props {}

const MyCadastre: FC<Props> = () => {
  return (
    <DefaultSection title="Meu cadastro" description="Configure o seu cadastro.">
      <Box>teste</Box>
      <Box>teste</Box>
    </DefaultSection>
  );
};

export default MyCadastre;
