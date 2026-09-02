import { X } from 'lucide-react';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/lib';

export function FormCloseButton({ handleClose }: { handleClose: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        'h-8 w-8 rounded-full',
        'hover:bg-muted transition-colors',
        'focus-visible:ring-0 focus-visible:ring-offset-0',
        'focus:outline-none focus-visible:outline-none',
        'focus:border-transparent focus-visible:border-transparent',
      )}
      onClick={handleClose}
    >
      <X className="h-4 w-4 text-muted-foreground" />
      <span className="sr-only">Закрыть</span>
    </Button>
  );
}
