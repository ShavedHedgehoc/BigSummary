import { Button } from '@/shared/ui';
import { FileX } from 'lucide-react';
import { TCancelHistoryButtonUiProps } from '../model/types';
import { useUndoButton } from '../model/use-undo-button';

export function CancelHistoryButton(props: TCancelHistoryButtonUiProps) {
  const { handleClick, isButtonDisabled, isVisible } = useUndoButton(props);
  if (!isVisible) return null;
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      disabled={isButtonDisabled}
      className="w-full h-8 text-xs font-medium gap-1.5 hover:text-destructive hover:bg-destructive/5 transition-colors"
    >
      <FileX className="h-3.5 w-3.5" />
      Отменить последнюю запись
    </Button>
  );
}
