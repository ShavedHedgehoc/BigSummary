import { Lock, Unlock } from 'lucide-react';
import { TApplicationEmployeeItem } from '@repo/schemas';
import { cn } from '@/shared/lib';

export function EmployeeActivityCell({
  employee,
  showTitle = true,
}: {
  employee: TApplicationEmployeeItem;
  showTitle?: boolean;
}) {
  return (
    <div className={cn(showTitle ? 'text-left' : 'text-center', 'text-xs')}>
      {employee.isCanDelete ? (
        <span className="inline-flex items-center gap-2 text-muted-foreground">
          <Unlock className="h-4 w-4" />
          {showTitle && <span className="leading-none">Неактивен</span>}
        </span>
      ) : (
        <span className="inline-flex items-center gap-2 ">
          <Lock className="h-4 w-4 " />
          {showTitle && <span className="leading-none">Активен</span>}
        </span>
      )}
    </div>
  );
}
