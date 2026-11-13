import { cn } from '@/shared/lib';
import { TApplicationTraceWeightingListPaginatedRowItem } from '@repo/schemas';
import { format } from 'date-fns';

interface IFormSubheaderProps {
  row?: TApplicationTraceWeightingListPaginatedRowItem;
  className?: string;
}

export function WeightingFormSubheader({ row, className }: IFormSubheaderProps) {
  if (!row) return null;

  //   const isProductRow = 'productCode' in row;

  //   const productCode = isProductRow
  //     ? row.productCode
  //     : ((row as TApplicationBoilItem).baseCode ?? '-');
  //   const marking = isProductRow ? row.marking : ((row as TApplicationBoilItem).baseMarking ?? '-');
  //   const boil = isProductRow ? row.boil : ((row as TApplicationBoilItem).boilValue ?? '-');

  return (
    <div
      className={cn(
        'flex flex-col gap-2 text-xs border-b pb-3 bg-muted/10 p-2.5 rounded-lg border border-dashed shrink-0',
        className,
      )}
    >
      <div className="flex flex-col justify-between gap-0.5">
        <span className="text-muted-foreground">Варка:</span>
        <div className="flex justify-left gap-1">
          <span className="font-mono text-muted-foreground">
            {row.batchDate ? format(new Date(row.batchDate), 'dd-MM-yyyy') : null}
          </span>
          <span className="font-medium text-muted-foreground">{row.plantName}</span>
        </div>
        <span className="font-medium text-foreground text-left break-all">{row.batchName}</span>
      </div>
      <div className="flex flex-col justify-between gap-1">
        <span className="text-muted-foreground">Номенклатура:</span>
        <div className="flex justify-left items-start gap-2">
          <span className="font-medium text-foreground">{row.productId}</span>
          <span className="font-medium text-foreground text-left break-all">{row.productName}</span>
        </div>
      </div>

      {/* <div className="flex justify-between gap-4">
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
      </div> */}
    </div>
  );
}
