import { TApplicationTraceWeightingListRowItem } from '@repo/schemas';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { cn } from '@/shared/lib';
import { getRowConfig } from '../model/weighting-list-row-config';
import { createFullHdColumn, EmptyDash, FullHdColumnOptions, renderHeader } from '@/shared/ui';

const BatchInfoStack = ({
  item,
  sizeClass,
  maxWidthClass,
}: {
  item: TApplicationTraceWeightingListRowItem;
  sizeClass: string;
  maxWidthClass: string;
}) => {
  const styles = getRowConfig(item);
  const dateObj = item.batchDate ? new Date(item.batchDate) : null;

  return (
    <div className={cn('flex flex-col gap-0.5 py-1 text-left', sizeClass)}>
      <div className={cn('font-mono flex items-center min-h-4', styles.mutedText)}>
        {dateObj ? format(dateObj, 'dd-MM-yyyy') : <EmptyDash />}
      </div>
      <div
        className={cn(
          'font-medium flex items-center min-h-4 min-w-0',
          maxWidthClass,
          styles.mutedText,
        )}
      >
        <span className="leading-none truncate block">{item.plantName}</span>
      </div>
      <div className={cn('font-mono flex items-center min-h-4', styles.text)}>
        {item.batchName || <EmptyDash />}
      </div>
    </div>
  );
};

const ProductInfoStack = ({
  item,
  sizeClass,
  maxWidthClass,
  showPlanFactBadge = false,
}: {
  item: TApplicationTraceWeightingListRowItem;
  sizeClass: string;
  maxWidthClass: string;
  showPlanFactBadge?: boolean;
}) => {
  const styles = getRowConfig(item);

  return (
    <div className={cn('flex flex-col gap-0.5 py-1 text-left', sizeClass)}>
      <div className={cn('font-mono flex items-center min-h-4', styles.mutedText)}>
        {item.productId || <EmptyDash />}
      </div>
      <div
        className={cn('font-medium flex items-center min-h-4 min-w-0', maxWidthClass, styles.text)}
      >
        {item.productName ? (
          <span className="leading-none truncate block">{item.productName}</span>
        ) : (
          <EmptyDash />
        )}
      </div>
      {showPlanFactBadge && (
        <span className={cn('px-1 py-1 rounded w-fit', styles.badge)}>
          План-Факт: {item.planQuantity.toLocaleString('ru-RU')}
          {' / '}
          {item.factQuantity.toLocaleString('ru-RU')}
        </span>
      )}
    </div>
  );
};

type TRow = TApplicationTraceWeightingListRowItem;

const createReportColumn = (options: Omit<FullHdColumnOptions<TRow>, 'getTextClassName'>) =>
  createFullHdColumn<TRow>({
    ...options,
    getTextClassName: (item) => getRowConfig(item).text,
  });

export const baseWeightingListColumns: ColumnDef<TApplicationTraceWeightingListRowItem>[] = [
  /* Мобильные колонки, показываются либо они, либо форма */

  {
    id: 'mobile-batch-info',
    meta: { grow: false, hideOnDesktop: true },
    header: () => <div className="text-left">Варка</div>,
    cell: ({ row }) => (
      <BatchInfoStack item={row.original} sizeClass="text-[11px]" maxWidthClass="max-w-60" />
    ),
  },
  {
    id: 'mobile-product-info',
    meta: { grow: true, hideOnDesktop: true },
    header: () => <div className="text-left">Номенклатура</div>,
    cell: ({ row }) => (
      <ProductInfoStack
        item={row.original}
        sizeClass="text-[11px]"
        maxWidthClass="max-w-40"
        showPlanFactBadge
      />
    ),
  },

  /* 
    Колонки для экранов меньше FullHD.     
     header всегда text-xs text-muted-foreground
     cell text-[11px]
    */

  {
    id: 'md-batch-info',
    meta: { grow: false, hideOnMobile: true, showBelowXL: true },
    header: renderHeader('Варка'),
    cell: ({ row }) => (
      <BatchInfoStack item={row.original} sizeClass="text-xs" maxWidthClass="max-w-25" />
    ),
  },
  {
    id: 'md-product-info',
    meta: { grow: true, hideOnMobile: true, showBelowXL: true },
    header: renderHeader('Номенклатура'),
    cell: ({ row }) => (
      <ProductInfoStack item={row.original} sizeClass="text-xs" maxWidthClass="max-w-40" />
    ),
  },

  {
    id: 'md-plan-fact-info',
    meta: { grow: false, hideOnMobile: true, showBelowXL: true },
    header: renderHeader('План/Факт', 'right'),
    cell: ({ row }) => {
      const styles = getRowConfig(row.original);
      return (
        <div
          className={cn(
            'flex flex-col gap-0.5 py-1 text-right text-xs font-mono',
            styles.mutedText,
          )}
        >
          <div className="flex items-center justify-end min-h-4">
            {row.original.planQuantity.toLocaleString('ru-RU')}
          </div>
          <div className={cn('flex items-center justify-end min-h-4', styles.text)}>
            {row.original.factQuantity.toLocaleString('ru-RU')}
          </div>
        </div>
      );
    },
  },

  /* Колонки для FullHD и больше. Показываются всегда вместе с формой 
  header всегда text-xs text-muted-foreground
  */

  createReportColumn({
    key: 'date',
    title: 'Дата',
    cellClassName: 'tabular-nums font-mono',
    renderValue: (item) => (item.batchDate ? format(new Date(item.batchDate), 'dd-MM-yyyy') : null),
  }),
  createReportColumn({
    key: 'plant',
    title: 'Площадка',
    hideBelowFullHD: false,
    cellClassName: 'font-medium',
    renderValue: (item) => item.plantName,
  }),
  createReportColumn({
    key: 'batch',
    title: 'Партия',
    hideBelowFullHD: false,
    cellClassName: 'tabular-nums font-medium',
    renderValue: (item) => item.batchName,
  }),
  createReportColumn({
    key: 'product-code',
    title: 'Код 1С',
    cellClassName: 'tabular-nums font-medium',
    renderValue: (item) => item.productId,
  }),
  createReportColumn({
    key: 'product-name',
    title: 'Наименование',
    hideBelowFullHD: false,
    grow: true,
    cellClassName: 'font-medium min-w-0 max-w-100',
    renderValue: (item) =>
      item.productName ? (
        <span className="leading-none truncate block">{item.productName}</span>
      ) : null,
  }),

  createReportColumn({
    key: 'planQuantity',
    align: 'right',
    title: 'План',
    cellClassName: 'tabular-nums font-mono',
    renderValue: (item) => item.planQuantity.toLocaleString('ru-RU'),
  }),

  createReportColumn({
    key: 'factQuantity',
    align: 'right',
    title: 'Факт',
    cellClassName: 'tabular-nums font-mono',
    renderValue: (item) => item.factQuantity.toLocaleString('ru-RU'),
  }),
];
