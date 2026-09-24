import { useRoles } from '@/entities/user';
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
import { useDeleteDocRow } from '../model';
import { TApplicationDocDetailRowItem } from '@repo/schemas';
import { useState } from 'react';

interface IDeleteDocRowButtonProps {
  row?: TApplicationDocDetailRowItem;
}

export function DeleteDocRowButton({ row }: IDeleteDocRowButtonProps) {
  const { hasRole } = useRoles();
  const { deleteDocRow, isPending: deletePending } = useDeleteDocRow();
  const [isOpen, setIsOpen] = useState(false);

  if (!row) return null;

  const allowDelete = hasRole(DB_ROLES.PLANNER);
  const isCanDelete = allowDelete && row.isCanDeleted;

  const handleDeleteClick = () => {
    deleteDocRow({ id: row.id });
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
          <span>Удалить строку</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены, что хотите удалить строку?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие необратимо. Строка будет навсегда удалена из базы данных.
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
