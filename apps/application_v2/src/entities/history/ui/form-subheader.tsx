import { cn } from '@/shared/lib';
import { TApplicationBoilItem, TApplicationDocDetailRowItem } from '@repo/schemas';
import { getStatusConfig } from '../model';

interface IFormSubheaderProps {
  row?: TApplicationDocDetailRowItem | TApplicationBoilItem;
  className?: string;
}

export function FormSubheader({ row, className }: IFormSubheaderProps) {
  if (!row) return null;
  const config = getStatusConfig(row.stateValue);

  const isProductRow = 'productCode' in row;

  const productCode = isProductRow
    ? row.productCode
    : ((row as TApplicationBoilItem).baseCode ?? '-');
  const marking = isProductRow ? row.marking : ((row as TApplicationBoilItem).baseMarking ?? '-');
  const boil = isProductRow ? row.boil : ((row as TApplicationBoilItem).boilValue ?? '-');
  return (
    <div
      className={cn(
        'flex flex-col gap-2 text-xs border-b pb-3 bg-muted/10 p-2.5 rounded-lg border border-dashed shrink-0',
        className,
      )}
    >
      <div className="flex justify-between gap-4">
        <div className="flex justify-between w-1/2 border-r pr-2">
          <span className="text-muted-foreground">Код 1С:</span>
          <span className="font-medium text-foreground">{productCode}</span>
        </div>
        <div className="flex justify-between w-1/2 pl-2">
          <span className="text-muted-foreground">Артикул:</span>
          <span className="font-medium text-foreground text-right break-all">{marking}</span>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex justify-between w-1/2 border-r pr-2">
          <span className="text-muted-foreground">Партия:</span>
          <span className="font-medium text-foreground">{boil}</span>
        </div>
        <div className="flex justify-between w-1/2 pl-2 items-center">
          <span
            className={cn(
              config.color,
              'font-semibold  text-[10px] text-right uppercase tracking-wider',
            )}
          >
            {row.state || '-'}
          </span>
        </div>
      </div>
    </div>
  );
}
