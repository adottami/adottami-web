import { createContext } from '@/utils/contexts';

import { Page } from './types';

export interface AccountMenuContextValue {
  page: Page;
  setPage(page: Page): void;
}

const AccountMenuContext = createContext<AccountMenuContextValue>('AccountMenuContext');

export default AccountMenuContext;
