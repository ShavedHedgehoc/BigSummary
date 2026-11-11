import { TApplicationUserItem } from '@repo/schemas';
import { useUpdateUserRoles } from '../api/use-update-user-roles';
import React from 'react';
import { trpc } from '@/shared/api';
import { useForm } from 'react-hook-form';
import { useUserListUiParams } from '@/entities/user/index.client';

export function useUserRoleTab({ row }: { row?: TApplicationUserItem }) {
  const { updateUserRolesAsync, isPending } = useUpdateUserRoles();
  const { setParams: setUiParams } = useUserListUiParams();

  const currentRoleIds = React.useMemo(() => {
    return row?.roles ? row.roles.map((ur) => ur.id) : [];
  }, [row]);

  const form = useForm<{ roles: number[] }>({
    defaultValues: { roles: currentRoleIds },
  });

  const { data: roleData } = trpc.application.main.role.getRoleList.useQuery(undefined, {
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });

  React.useEffect(() => {
    form.reset({ roles: currentRoleIds });
  }, [currentRoleIds, form]);

  const onRolesSubmit = async (data: { roles: number[] }) => {
    if (!row?.id) return;
    try {
      await updateUserRolesAsync({ id: row.id, roles: data.roles });
      form.reset(data);
      setUiParams({ selectedUserId: null });
    } catch (e) {
      console.error('Ошибка сохранения ролей', e);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    form.reset({ roles: currentRoleIds });
  };

  return { form, onRolesSubmit, roleData, handleReset, isPending };
}
