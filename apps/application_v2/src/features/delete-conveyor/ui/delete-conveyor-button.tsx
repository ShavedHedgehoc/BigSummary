import { useRoles } from '@/entities/user/index.client';
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

import { TApplicationConveyorItem } from '@repo/schemas';
import { useState } from 'react';
import { useDeleteConveyor } from '../model/use-delete-conveyor';

interface IDeleteConveyorButtonProps {
  row?: TApplicationConveyorItem;
  onSuccess?: () => void;
}

export function DeleteConveyorButton({ row, onSuccess }: IDeleteConveyorButtonProps) {
  const { hasRole } = useRoles();
  const { deleteConveyorAsync, isPending: deletePending } = useDeleteConveyor();
  const [isOpen, setIsOpen] = useState(false);

  if (!row) return null;

  const allowDelete = hasRole(DB_ROLES.PLANNER);
  const isCanDelete = allowDelete && row.haveRecord === false;

  const handleDeleteClick = () => {
    setIsOpen(false);
    deleteConveyorAsync(
      { id: row.id },
      {
        onSettled: () => {
          onSuccess?.();
        },
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
          <span>Удалить конвейер</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены, что хотите удалить конвейер?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие необратимо. Конвейер будет навсегда удален из базы данных.
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
