import MenuContext, { AccountMenuContextValue } from '@/contexts/account-menu-context/account-menu-context';

type AccountMenu = AccountMenuContextValue;

function useAccountMenu(): AccountMenu {
  return MenuContext.useContext();
}

export default useAccountMenu;
