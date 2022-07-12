import { render } from '@testing-library/react';

import PublicationCard from '../publication-card';
import { publicationMock } from './mock/publication-mock';

describe('Publication card', () => {
  it('should render correctly', () => {
    render(<PublicationCard publication={publicationMock} />);
  });
});
