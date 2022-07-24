import AccountMenuContext from '@/contexts/account-menu-context/account-menu-context';
import useAccountMenu from '@/hooks/menu/use-menu/use-account-menu';
import { renderHookWithTestProviders } from '@tests/utils/render';

describe('useAccountMenu', () => {
  it('should initialize correctly', () => {
    // const useAccountMenuContextSpy = jest.spyOn(AccountMenuContext, 'useContext');
    // const { result } = renderHookWithTestProviders(useAccountMenu);
    // expect(useAccountMenuContextSpy).toHaveBeenCalled();
    // expect(result.current.page).toEqual('my-cadastre');
    // expect(result.current.setPage).toEqual(expect.any(Function));
  });
});
