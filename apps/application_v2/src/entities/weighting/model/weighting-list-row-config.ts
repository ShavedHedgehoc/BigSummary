import { TApplicationTraceWeightingListRowItem } from '@repo/schemas';

type TRow = TApplicationTraceWeightingListRowItem;
type TRowVariant = 'error' | 'warning' | 'default';

interface IWeightingListRowConfig {
  row: string;
  text: string;
  mutedText: string;
  badge: string;
}

const WEIGHTING_LIST_ROW_CONFIG: Record<TRowVariant, IWeightingListRowConfig> = {
  error: {
    row: 'bg-status-fail',
    text: 'text-status-fail/80',
    mutedText: 'text-status-fail/60',
    badge: 'text-destructive bg-destructive/20',
  },
  warning: {
    row: 'bg-status-wait',
    text: 'text-status-wait/80',
    mutedText: 'text-status-wait/60',
    badge: 'text-status-wait bg-status-wait/20',
  },
  default: {
    row: 'bg-status-success',
    text: 'text-status-success/80',
    mutedText: 'text-status-success/60',
    badge: 'text-muted-foreground bg-muted/20',
  },
};

const getWeightingListRowVariant = (row: TRow): TRowVariant => {
  if (row.factQuantity === 0) return 'error';
  if (row.planQuantity !== row.factQuantity) return 'warning';
  return 'default';
};

export function getRowConfig(row: TRow): IWeightingListRowConfig {
  const variant = getWeightingListRowVariant(row);
  return WEIGHTING_LIST_ROW_CONFIG[variant];
}
