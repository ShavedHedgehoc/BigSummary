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
import { useDocListUiParams } from '@/entities/doc';

export function DeleteDocDialog() {
  const { params, setParams } = useDocListUiParams();
  const { deleteDoc, isPending: deletePending } = useDeleteDoc();

  const handleConfirmDelete = () => {
    if (!params.deleteId) return;

    deleteDoc(
      { id: params.deleteId },
      {
        onSettled: () => setParams({ deleteId: null }),
      },
    );
  };

  return (
    <AlertDialog
      open={params.deleteId !== null}
      onOpenChange={(open) => {
        if (!open) setParams({ deleteId: null });
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
