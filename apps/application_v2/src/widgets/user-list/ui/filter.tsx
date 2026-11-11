import { throttle } from 'nuqs';
import { ComponentProps } from 'react';
import { useUserList } from '../model/use-user-list';
import { useUserListSearchParams } from '@/entities/user/lib';
import { UserListFilter } from '@/features/filter-users';

export default function AdminUserListFilter() {
  const { setUiParams } = useUserList();
  const { params, setParams, roleData } = useUserListSearchParams();

  type TFilterProps = ComponentProps<typeof UserListFilter>;
  type TThrottleArgs = Parameters<TFilterProps['onFilterChangeThrottle']>[0];
  type TChangeArgs = Parameters<TFilterProps['onFilterChange']>[0];

  const onFilterChangeThrottle = (newFilters: TThrottleArgs) => {
    setParams(
      { ...newFilters, page: 1 },
      { shallow: false, throttleMs: 500, limitUrlUpdates: throttle(500) },
    );
    setUiParams({ selectedUserId: null }, { shallow: true });
  };

  const onFilterChange = (newFilters: TChangeArgs) => {
    setParams({ ...newFilters, page: 1 }, { shallow: false });
    setUiParams({ selectedUserId: null }, { shallow: true });
  };

  const resetParams = () => {
    setParams(
      {
        name: null,
        email: null,
        roles: null,
        banned: null,
        page: 1,
      },
      {
        shallow: true,
      },
    );
  };

  const handleReset = () => resetParams();
  const handleResetAll = () => {
    resetParams();
    setUiParams({ selectedUserId: null }, { shallow: true });
  };

  return (
    <UserListFilter
      roleData={roleData ?? []}
      name={params.name}
      email={params.email}
      selectedRoles={params.roles ?? []}
      selectedBannedOptions={params.banned ?? []}
      onFilterChangeThrottle={onFilterChangeThrottle}
      onFilterChange={onFilterChange}
      handleReset={handleReset}
      handleResetAll={handleResetAll}
    />
  );
}
