import { CircleCheck, Ghost } from 'lucide-react';
import { TApplicationConveyorItem } from '@repo/schemas';

export function ConveyorRecordCell({
  conveyor,
  showTitle = true,
}: {
  conveyor: TApplicationConveyorItem;
  showTitle?: boolean;
}) {
  return (
    <div className="text-center text-xs">
      {conveyor.haveRecord ? (
        <span className="inline-flex items-center gap-2 ">
          <CircleCheck className="h-4 w-4" />
          {showTitle && <span className="leading-none">С записями</span>}
        </span>
      ) : (
        <span className="inline-flex items-center gap-2 ">
          <Ghost className="h-4 w-4 text-destructive" />
          {showTitle && <span className="leading-none">Без записей</span>}
        </span>
      )}
    </div>
  );
}
