import { TApplicationUserItem } from '@repo/schemas';
import { useChangeUserAccess } from '../api/use-change-user-access';
import { useResetUserPassword } from '../api/use-reset-user-password';
import { useUserListUiParams } from '@/entities/user/index.client';

interface IUseUserActionTabProps {
  row?: TApplicationUserItem;
}

export const useUserActionTab = ({ row }: IUseUserActionTabProps) => {
  const { changeUserAccessAsync, isPending: changeAccessPending } = useChangeUserAccess();
  const { isPending: resetPasswordPending } = useResetUserPassword();
  const { setParams: setUiParams } = useUserListUiParams();

  const handleChangeUserAccessClick = async () => {
    if (!row?.id) return;
    try {
      await changeUserAccessAsync({ id: row.id });

      setUiParams({ selectedUserId: null });
    } catch (e) {
      console.error('Ошибка смены доступа', e);
    }
  };

  const handleResetUserPasswordClick = () => {
    if (row?.id) {
      setUiParams({ resetPasswordUserId: String(row.id) }, { shallow: true });
    }
  };
  const isActionDisabled = !row || changeAccessPending || resetPasswordPending;
  return {
    handleChangeUserAccessClick,
    handleResetUserPasswordClick,
    isActionDisabled,
  };
};
