'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui';
import { useResetUserPassword } from '../model/api/use-reset-user-password';

interface IResetUserPasswordDialogProps {
  resetId: string | null;
  onClose: () => void;
}

export function ResetUserPasswordDialog({ resetId, onClose }: IResetUserPasswordDialogProps) {
  const { resetUserPassword, isPending: resetPasswordPending } = useResetUserPassword();

  const handleConfirmReset = () => {
    if (!resetId) return;

    resetUserPassword(
      { id: Number(resetId) },
      {
        onSettled: () => onClose(),
      },
    );
  };

  return (
    <AlertDialog
      open={resetId !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены, что хотите сбросить пароль?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие приведет к установке пароля пользователя к значению &quot;1&quot;.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={resetPasswordPending}>Отмена</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleConfirmReset();
            }}
            disabled={resetPasswordPending}
          >
            Сбросить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
