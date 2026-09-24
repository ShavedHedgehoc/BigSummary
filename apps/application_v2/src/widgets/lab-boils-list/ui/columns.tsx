import { baseBoilListColumns } from '@/entities/boil';
import { TApplicationBoilItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';

export const labBoilListColumns: ColumnDef<TApplicationBoilItem>[] = [...baseBoilListColumns];
