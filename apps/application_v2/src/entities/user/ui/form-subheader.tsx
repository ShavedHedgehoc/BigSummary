import { cn } from '@/shared/lib';
import { TApplicationUserItem } from '@repo/schemas';

interface IUserFormSubheaderProps {
  row?: TApplicationUserItem;
  className?: string;
}

export function UserFormSubheader({ row, className }: IUserFormSubheaderProps) {
  if (!row) return null;

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 text-xs border rounded-xl p-3 bg-muted/30 shadow-2xs shrink-0',
        className,
      )}
    >
      {/* Левая часть: Основная информация о пользователе */}
      <div className="flex flex-col gap-1 min-w-0">
        <span className="font-semibold text-sm text-foreground truncate select-all">
          {row.name}
        </span>
        <span className="text-xs text-muted-foreground/80 truncate break-all select-all font-mono">
          {row.email}
        </span>
      </div>

      {/* Правая часть: Аккуратный бэйдж статуса доступа */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="text-[10px] uppercase font-medium tracking-wider text-muted-foreground/60 select-none">
          Доступ
        </span>
        <span
          className={cn(
            'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border',
            row.banned
              ? 'bg-destructive/10 text-destructive border-destructive/20'
              : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
          )}
        >
          {row.banned ? 'Запрещен' : 'Разрешен'}
        </span>
      </div>
    </div>
  );
}
