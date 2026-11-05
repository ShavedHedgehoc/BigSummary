'use client';

import { DAYS_TO_EXPIRE_OPTIONS } from '@/entities/inventory';
import { cn, useIsMobile } from '@/shared/lib';
import {
  Button,
  FilterInput,
  FilterResetButton,
  FilterSelector,
  IListItem,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui';
import { Calendar, Search, SlidersHorizontal, Trash } from 'lucide-react';
import { useId, useMemo, useState, useSyncExternalStore } from 'react';

interface TInventoryDetailFilterProps {
  productCode: string;
  selectedDaysToExp: string[] | undefined;
  isApplyFilter: boolean;
  actionButton?: React.ReactNode;
  handleResetAll: () => void;
  onFilterChangeThrottle: (newFilters: { productCode?: string | null }) => void;
  onFilterChange: (newFilters: {
    applyFilter?: boolean;
    dayToExpireRest?: string[] | null;
  }) => void;
}

export function InventoryDetailFilter({
  productCode,
  selectedDaysToExp,
  isApplyFilter = false,
  actionButton,
  handleResetAll,
  onFilterChange,
  onFilterChangeThrottle,
}: TInventoryDetailFilterProps) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const productCodeId = useId();
  const daysRestSelectorId = useId();
  const daysToExpSelectorId = useId();

  const isMounted = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  const applyFilterListItems = useMemo<IListItem[]>(
    () => [
      { value: 'true', description: 'Фильтровать' },
      { value: 'false', description: 'Не фильтровать' },
    ],
    [],
  );

  const expFilterListItems = useMemo<IListItem[]>(
    () =>
      DAYS_TO_EXPIRE_OPTIONS.map((opt) => ({
        value: opt.toString(),
        description: `${opt} дней`,
      })),
    [],
  );

  const applyFilterValue = isApplyFilter ? ['true'] : ['false'];

  const isDirty = Boolean(
    productCode !== '' ||
    isApplyFilter ||
    (selectedDaysToExp && selectedDaysToExp[0] !== DAYS_TO_EXPIRE_OPTIONS[0]),
  );

  const renderFilterFields = () => (
    <>
      <FilterInput
        id={productCodeId}
        className="w-full"
        placeholder="Поиск по коду 1С"
        value={productCode ?? ''}
        onChange={(value) => onFilterChangeThrottle({ productCode: value })}
      />
      <FilterSelector
        id={daysRestSelectorId}
        className="w-full"
        items={expFilterListItems}
        value={selectedDaysToExp ?? []}
        onChange={(value) => onFilterChange({ dayToExpireRest: value })}
      />
      <FilterSelector
        id={daysToExpSelectorId}
        className="w-full"
        placeholder="Фильтр"
        items={applyFilterListItems}
        value={applyFilterValue}
        onChange={(value) => {
          const selectedString = Array.isArray(value) ? value[0] : value;
          onFilterChange({ applyFilter: selectedString === 'true' });
        }}
      />
      {actionButton}
    </>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Фильтры {isDirty && <span className="ml-2 h-2 w-2 rounded-full bg-primary" />}
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="h-[90vh] overflow-y-auto"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <SheetHeader>
            <SheetTitle>Фильтры</SheetTitle>
            <SheetDescription className="sr-only">Фильтрация переучетов</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 px-2 py-4">
            {renderFilterFields()}
            <div className="flex flex-col gap-4 mt-4">
              <FilterResetButton
                mobile
                isDirty={isDirty}
                onClick={handleResetAll}
                icon={<Trash className="h-4 w-4" />}
                label="Сброс"
                className="h-9 w-full"
              />
              <Button className="h-9 w-full text-xs" onClick={() => setOpen(false)}>
                <Search className="h-4 w-4 mr-2" /> Показать
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  if (!isMounted) return <div className="h-10" />;

  return (
    <div
      className={cn(
        'grid',
        actionButton
          ? 'grid-cols-[1fr_1fr_1fr_1fr_auto_auto]'
          : 'grid-cols-[1fr_1fr_1fr_auto_auto]',
        '@max-4xl:grid-cols-2 @max-6xl:grid-cols-3 gap-3 w-full items-end max-w-6xl',
      )}
    >
      {renderFilterFields()}

      <FilterResetButton
        mobile={false}
        className="w-auto! @max-6xl:w-full! px-5 h-8! flex items-center justify-center text-xs transition-all"
        onClick={handleResetAll}
        isDirty={isDirty}
        icon={<Trash className="h-4 w-4" />}
        label="Сброс"
      />
    </div>
  );
}

function subscribeToNothing() {
  return () => {};
}
