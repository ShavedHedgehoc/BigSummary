'use client';

import { Button } from '@/shared/ui';
import { TApplicationUserItem } from '@repo/schemas';
import { useUserActionTab } from '../model/hooks/use-user-actions-tab';

interface IUserActionsTabProps {
  row?: TApplicationUserItem;
}

export function UserActionsTab({ row }: IUserActionsTabProps) {
  const { handleChangeUserAccessClick, handleResetUserPasswordClick, isActionDisabled } =
    useUserActionTab({ row });

  if (!row) return null;

  return (
    <div className="flex flex-col gap-6 p-0">
      <div className="flex flex-col gap-2 rounded-lg border p-4 bg-card">
        <h4 className="text-sm font-medium leading-none">Изменить доступ пользователя</h4>
        <p className="text-xs text-muted-foreground">
          {row?.banned
            ? 'Пользователь потеряет статус заблокированного и сможет войти в систему.'
            : 'Пользователь лишится доступа к приложению и сессиям.'}
        </p>
        <Button
          className="mt-2 w-fit"
          variant={row?.banned ? 'default' : 'destructive'}
          disabled={isActionDisabled}
          onClick={handleChangeUserAccessClick}
        >
          {row?.banned ? 'Разбанить' : 'Забанить'}
        </Button>
      </div>
      <div className="flex flex-col gap-2 rounded-lg border p-4 bg-card">
        <h4 className="text-sm font-medium leading-none">Безопасность аккаунта</h4>
        <p className="text-xs text-muted-foreground">
          Это действие приведет к установке пароля пользователя к значению &quot;1&quot;.
        </p>
        <Button
          className="mt-2 w-fit"
          variant="outline"
          disabled={isActionDisabled}
          onClick={handleResetUserPasswordClick}
        >
          Сбросить пароль
        </Button>
      </div>
    </div>
  );
}
