import { Button } from '@/shared/ui';
import { EyeOff } from 'lucide-react';

export function HideCell({
  productId,
  productName,
  disabled,
  onHide,
}: {
  productId: string | number;
  productName?: string | null;
  disabled?: boolean;
  //   onHide?: (id: string) => void;
  onHide?: (id: string, name?: string | null) => void;
}) {
  return (
    <Button
      className="text-muted-foreground"
      type="button"
      variant="ghost"
      size="icon"
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        const cleanId = String(productId).trim();
        if (cleanId) onHide?.(cleanId, productName);
      }}
    >
      <EyeOff className="h-4 w-4" />
    </Button>
  );
}
