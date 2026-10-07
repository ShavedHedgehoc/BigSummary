'use client';

import { useDeleteDoc } from '../model';
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

interface IDeleteDocDialogProps {
  deleteId: number | null;
  onDelete: () => void;
}

export function DeleteDocDialog({ deleteId, onDelete }: IDeleteDocDialogProps) {
  const { deleteDoc, isPending: deletePending } = useDeleteDoc();

  const handleConfirmDelete = () => {
    if (!deleteId) return;

    deleteDoc(
      { id: deleteId },
      {
        onSettled: () => onDelete(),
      },
    );
  };

  return (
    <AlertDialog
      open={deleteId !== null}
      onOpenChange={(open) => {
        if (!open) onDelete();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены, что хотите удалить документ?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие приведет к безвозвратному удалению документа и всех связанных с ним данных.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deletePending}>Отмена</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleConfirmDelete();
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
