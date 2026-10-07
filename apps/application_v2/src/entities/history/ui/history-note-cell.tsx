import { useIsMobile } from '@/shared/lib';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui';
import { HelpCircle, Minus } from 'lucide-react';

export function HistoryNoteCell({ note }: { note: string | null }) {
  const isMobile = useIsMobile();
  if (!note) {
    return (
      <div className="flex justify-start text-muted-foreground/50">
        <Minus className="h-4 w-4" />
      </div>
    );
  }

  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground transition-colors cursor-help  rounded-md hover:bg-muted"
            aria-label="Показать примечание"
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-60 text-xs p-3">
          <p>{note}</p>
        </PopoverContent>
      </Popover>
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
