import { Check, X } from 'lucide-react';
import { Button, Checkbox } from '@/shared/ui';

type RowId = string | number;

interface UniversalSelectHeaderProps {
  selectedId: RowId | null | undefined;
  onClear: () => void;
  clearTitle?: string;
}

export function GenericSelectHeader({
  selectedId,
  onClear,
  clearTitle = 'Сбросить выбор строки',
}: UniversalSelectHeaderProps) {
  const hasSelectedRow = selectedId !== '' && selectedId !== null && selectedId !== undefined;
  return (
    <div className="flex items-center justify-center h-full w-10 pr-4 shrink-0!">
      <div className="flex justify-center items-center mx-auto">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors"
          disabled={!hasSelectedRow}
          onClick={onClear}
          title={clearTitle}
        >
          {hasSelectedRow ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}

interface UniversalSelectCellProps {
  recordId: RowId;
  selectedId: RowId | null | undefined;
  onSelect: (id: RowId) => void;
  ariaLabel?: string;
}

export function GenericSelectCell({
  recordId,
  selectedId,
  onSelect,
  ariaLabel = 'Выбрать строку',
}: UniversalSelectCellProps) {
  const isSelected = String(selectedId) === String(recordId);
  return (
    <div className="flex items-center justify-center h-full w-10 pr-4 shrink-0!">
      <div className="flex justify-center items-center mx-auto">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => {
            onSelect(checked ? recordId : '');
          }}
          aria-label={ariaLabel}
        />
      </div>
    </div>
  );
}
