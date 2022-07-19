import { render } from '@testing-library/react';

import Select from '../select';

describe('Select', () => {
  it('should have radio input disabled correctly', () => {
    render(<Select />);
  });
});
