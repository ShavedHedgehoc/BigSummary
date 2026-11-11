import { baseInventoryDetailColumns } from '@/entities/inventory';
import { TApplicationTraceInventoryDetailRowItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';

export const inventoryDetailProductListColumns: ColumnDef<TApplicationTraceInventoryDetailRowItem>[] =
  [...baseInventoryDetailColumns];
