import { render } from '@testing-library/react';

import { publicationMock } from '../mock';
import PublicationCard from '../publication-card';

describe('Publication card', () => {
  it('should render correctly', () => {
    render(<PublicationCard publication={publicationMock} />);
  });
});
