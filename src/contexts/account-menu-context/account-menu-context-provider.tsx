import { useState, useMemo } from 'react';

import { FCC } from '@/types/react';

import AccountMenuContext from './account-menu-context';
import { Page } from './types';

const AccountMenuContextProvider: FCC = ({ children }) => {
  const [page, setPage] = useState<Page>('my-cadastre');
  const menu = useMemo(() => ({ page, setPage }), [page, setPage]);
  return <AccountMenuContext.Provider value={menu}>{children}</AccountMenuContext.Provider>;
};

export default AccountMenuContextProvider;
