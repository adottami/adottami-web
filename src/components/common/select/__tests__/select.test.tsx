import { render } from '@testing-library/react';

import Select from '../select';

describe('Radio Group', () => {
  it('should have radio input disabled correctly', () => {
    render(<Select />);
  });
});
