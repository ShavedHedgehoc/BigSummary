import { DB_ROLES, ROUTE_PATH } from '@/shared/constants';
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
import { useAuth } from '@/entities/user';
import { useRouter } from 'next/navigation';
import { useDocListUiParams } from '@/entities/doc';

export function RowDropdown({ id, isCantDelete }: { id: number; isCantDelete: boolean }) {
  const router = useRouter();
  const { user } = useAuth();
  const { setParams } = useDocListUiParams();
  const allowedRole = DB_ROLES.PLANNER;
  const allowDelete = user?.roles.includes(allowedRole) ?? false;

  const handleDetailClick = () => {
    router.push(`${ROUTE_PATH.PLANNER_SUMMARIES}/${id}`);
  };

  const handleDeleteClick = () => {
    setParams({ deleteId: id });
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Действия</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDetailClick}>
            <ClipboardList />
            Подробно
          </DropdownMenuItem>
          <DropdownMenuItem
            variant={'destructive'}
            onClick={handleDeleteClick}
            disabled={!allowDelete || isCantDelete}
          >
            <ClipboardList />
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
