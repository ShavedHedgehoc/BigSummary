import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui';
import { HelpCircle, Minus } from 'lucide-react';

export function RecordNoteCell({ note }: { note: string | null }) {
  if (!note) {
    return (
      <div className="flex justify-start text-muted-foreground/50">
        <Minus className="h-4 w-4" />
      </div>
    );
  }
  return (
    <div className="flex justify-start ">
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground transition-colors cursor-help rounded-md hover:bg-muted"
              aria-label="Показать примечание"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" align="start" className="max-w-xs wrap-break-words">
            <p className="text-xs">{note}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
