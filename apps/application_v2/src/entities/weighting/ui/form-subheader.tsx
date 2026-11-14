import { cn } from '@/shared/lib';
import { TApplicationTraceWeightingListPaginatedRowItem } from '@repo/schemas';
import { format } from 'date-fns';

interface IFormSubheaderProps {
  row?: TApplicationTraceWeightingListPaginatedRowItem;
  className?: string;
}

export function WeightingFormSubheader({ row, className }: IFormSubheaderProps) {
  if (!row) return null;

  return (
    <div
      className={cn(
        'flex flex-col gap-2 text-xs border-b pb-3 bg-muted/10 p-2.5 rounded-lg border border-dashed shrink-0',
        className,
      )}
    >
      <div className="flex flex-col justify-between gap-0.5">
        <div className="flex justify-start gap-2">
          <span className="text-muted-foreground">Варка:</span>
          <span className="font-medium text-foreground text-left break-all">{row.batchName}</span>
        </div>
        <div className="flex justify-left gap-1">
          <span className="font-mono text-muted-foreground">
            {row.batchDate ? format(new Date(row.batchDate), 'dd-MM-yyyy') : null}
          </span>
          <span className="font-medium text-muted-foreground">{row.plantName}</span>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-1">
        <div className="flex justify-start gap-2">
          <span className="text-muted-foreground">Номенклатура:</span>
          <span className="font-medium text-foreground">{row.productId}</span>
        </div>
        <span className="font-medium text-foreground text-left break-all">{row.productName}</span>
      </div>
    </div>
  );
}
