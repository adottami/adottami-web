import { render } from '@testing-library/react';

import LoginAndSecurity from '../login-and-security';

describe('Account settings page', () => {
  it('should render correctly', () => {
    render(<LoginAndSecurity />);
  });
});
