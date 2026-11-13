import { DB_ROLES } from '@/shared/constants';
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/shared/ui';
import { ClipboardList, MoreHorizontal } from 'lucide-react';
import { useAuth } from '@/entities/user/index.client';
import { useDeleteWeighting } from '../model';

interface IRowDropdownProps {
  id: number;
  hasLoads: boolean;
  onSuccess?: () => void;
}

export function RowDropdown({ id, hasLoads, onSuccess }: IRowDropdownProps) {
  const { user } = useAuth();
  const allowedRole = DB_ROLES.WGHT_GODMODE;
  const allowDelete = user?.roles.includes(allowedRole) ?? false;

  const { deleteWeighting, isPending: deletePending } = useDeleteWeighting();
  const handleDeleteClick = () => {
    if (hasLoads) return;
    deleteWeighting(
      { id },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      },
    );
  };
  if (!allowedRole) return null;
  return (
    <div className="flex items-center justify-center h-full w-10 pr-4 shrink-0!">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Действия</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant={'destructive'}
            onClick={handleDeleteClick}
            disabled={!allowDelete || deletePending || hasLoads}
          >
            <ClipboardList />
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
