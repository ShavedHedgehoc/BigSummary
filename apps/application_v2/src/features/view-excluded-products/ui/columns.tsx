'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { RotateCcw } from 'lucide-react';
import { Button, EmptyDash } from '@/shared/ui';
import { type ExcludedProductItem } from '../model/use-excluded-products-store';
import { cn } from '@/shared/lib';

export const getExcludedProductsColumns = (
  onRestore: (productId: string) => void,
): ColumnDef<ExcludedProductItem>[] => [
  {
    accessorKey: 'productId',

    header: () => (
      <div className="text-left font-semibold text-xs text-muted-foreground">Код 1С</div>
    ),
    size: 120,
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.productId}</span>,
  },
  {
    accessorKey: 'productName',
    header: () => (
      <div className="text-left font-semibold text-xs text-muted-foreground">Наименование</div>
    ),
    meta: { grow: true },
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div
          className={cn(
            'text-xs font-mono tabular-nums flex items-center min-h-4 min-w-0 max-w-40',
          )}
        >
          {item.productName ? (
            <span className="leading-none truncate block">{item.productName}</span>
          ) : (
            <EmptyDash />
          )}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => null,
    size: 64,
    cell: ({ row }) => (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onRestore(row.original.productId)}
        title="Вернуть сырьё в отчёт"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
    ),
  },
];
