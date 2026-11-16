import { Button } from '@/shared/ui';
import { RotateCcw } from 'lucide-react';

import { useClearExcludedProducts } from '../model/use-clear-excluded-products';

export function ClearExcludedProductsButton() {
  const { clearExcludedProductsAndParams, isDisabled } = useClearExcludedProducts();
  return (
    <Button
      type="button"
      size="sm"
      variant="ghost"
      disabled={isDisabled}
      className="w-full h-8 text-xs font-medium gap-1.5"
      onClick={clearExcludedProductsAndParams}
    >
      <RotateCcw className="h-3.5 w-3.5" />
      <span>Сбросить исключения</span>
    </Button>
  );
}
