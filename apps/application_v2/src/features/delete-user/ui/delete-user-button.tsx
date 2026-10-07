import { useAuth, useRoles } from '@/entities/user/index.client';
import { DB_ROLES } from '@/shared/constants';
import { Button } from '@/shared/ui';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui';
import { Trash2 } from 'lucide-react';

import { TApplicationUserItem } from '@repo/schemas';
import { useState } from 'react';
import { useDeleteUser } from '../model/use-delete-user';

interface IDeleteDocRowButtonProps {
  row?: TApplicationUserItem;
  onSuccess?: () => void;
}

export function DeleteUserButton({ row, onSuccess }: IDeleteDocRowButtonProps) {
  const { hasRole } = useRoles();
  const { user } = useAuth();
  const { deleteUser, isPending: deletePending } = useDeleteUser();
  const [isOpen, setIsOpen] = useState(false);

  if (!row) return null;

  const allowDelete = hasRole(DB_ROLES.ADMIN);
  const isCanDelete = allowDelete && row.id !== user?.id;

  const handleDeleteClick = () => {
    deleteUser(
      { id: row.id },
      {
        onSuccess: () => {
          setIsOpen(false);
          onSuccess?.();
        },
        onError: () => setIsOpen(false),
      },
    );
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          disabled={!isCanDelete || deletePending}
          className="w-full h-8 text-xs font-medium gap-1.5 text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Удалить пользователя</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены, что хотите удалить пользователя?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие необратимо. Пользователь будет навсегда удален из базы данных.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deletePending}>Отмена</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDeleteClick();
            }}
            disabled={deletePending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deletePending ? 'Удаление...' : 'Удалить'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
