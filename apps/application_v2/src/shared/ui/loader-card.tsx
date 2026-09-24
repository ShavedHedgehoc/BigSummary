import { Loader2 } from 'lucide-react';
import { Card } from '@/shared/ui';
import { cn } from '@/shared//lib';

export function LoaderCard() {
  return (
    <Card
      className={cn(
        'w-full h-full border-0 shadow-none relative',
        'flex flex-col items-center justify-center  gap-2',
        'text-sm text-muted-foreground ',
      )}
    >
      <Loader2 className="h-6 w-6 animate-spin" />
      <p>Загрузка данных...</p>
    </Card>
  );
}
