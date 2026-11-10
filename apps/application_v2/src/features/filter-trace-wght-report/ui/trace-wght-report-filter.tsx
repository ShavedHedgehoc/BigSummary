'use client';

import { DAYS_TO_EXPIRE_OPTIONS } from '@/entities/inventory';
import { cn, useIsMobile } from '@/shared/lib';
import {
  Button,
  FilterDatePicker,
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
import { TApplicationPlantListResponse, TTracePlantListResponse } from '@repo/schemas';
import { Search, SlidersHorizontal, Trash } from 'lucide-react';
import { useId, useMemo, useState, useSyncExternalStore } from 'react';

interface TTraceWghtReportFilterProps {
  productId: string;
  batchName: string;
  plantData: TTracePlantListResponse;
  startDate: Date | undefined;
  endDate: Date | undefined;
  selectedPlants: string[] | undefined;
  //   isNotToday: boolean;
  actionButton?: React.ReactNode;
  onDateChange: (type: 'start' | 'end', val: Date | undefined) => void;
  //   handleSetToday: () => void;
  handleResetAll: () => void;
  onFilterChange: (newFilters: { plants?: string[] | null }) => void;
  onFilterChangeThrottle: (newFilters: {
    productId?: string | null;
    batchName?: string | null;
  }) => void;
}

export function TraceWghtReportFilter({
  productId,
  batchName,
  plantData = [],
  startDate,
  endDate,
  selectedPlants,
  //   isNotToday,
  actionButton,

  onDateChange,
  //   handleSetToday,
  handleResetAll,
  onFilterChange,
  onFilterChangeThrottle,
}: TTraceWghtReportFilterProps) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const plantSelectorId = useId();

  const productCodeId = useId();
  //   const daysRestSelectorId = useId();
  //   const daysToExpSelectorId = useId();

  const isMounted = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  const plantListItems = useMemo<IListItem[]>(() => {
    const baseItems: IListItem[] = [{ value: 'All', description: 'Все площадки' }];

    if (Array.isArray(plantData)) {
      baseItems.push(
        ...plantData.map((plant) => ({
          value: String(plant.PlantPK),
          description: plant.PlantName,
        })),
      );
    }

    return baseItems;
  }, [plantData]);

  const isDirty = Boolean(
    productId !== '' || batchName !== '',
    // isApplyFilter ||
    // (selectedDaysToExp && selectedDaysToExp[0] !== DAYS_TO_EXPIRE_OPTIONS[0]),
  );

  const renderFilterFields = () => (
    <>
      {/* <FilterInput
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
      /> */}
      <FilterDatePicker
        className="w-full"
        value={startDate}
        onChange={(val) => onDateChange('start', val)}
      />
      <FilterDatePicker
        className="w-full"
        value={endDate}
        onChange={(val) => onDateChange('end', val)}
      />
      <FilterSelector
        id={plantSelectorId}
        className="w-full"
        items={plantListItems}
        value={selectedPlants}
        onChange={(value) => onFilterChange({ plants: value })}
      />
      <FilterInput
        id={batchName}
        className="w-full"
        placeholder="Поиск по партии"
        value={batchName ?? ''}
        onChange={(value) => onFilterChangeThrottle({ batchName: value })}
      />
      <FilterInput
        id={productCodeId}
        className="w-full"
        placeholder="Поиск по коду 1С"
        value={productId ?? ''}
        onChange={(value) => onFilterChangeThrottle({ productId: value })}
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
