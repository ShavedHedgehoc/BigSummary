'use client';

import { useIsMobile } from '@/shared/lib';
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
import { TTracePlantListResponse } from '@repo/schemas';
import { Calendar, Search, SlidersHorizontal, Trash } from 'lucide-react';
import { useId, useMemo, useState, useSyncExternalStore } from 'react';

interface TWeightingListFilterProps {
  productId: string;
  batchName: string;
  plantData: TTracePlantListResponse;
  startDate: Date | undefined;
  endDate: Date | undefined;
  selectedPlants: string[] | undefined;
  compare: boolean;
  sortByBatch: boolean;
  isNotToday: boolean;
  isNotTomorrow: boolean;
  isDirty: boolean;
  actionButton?: React.ReactNode;
  onDateChange: (type: 'start' | 'end', val: Date | undefined) => void;
  handleSetToday: () => void;
  handleSetTomorrow: () => void;
  handleResetAll: () => void;
  onFilterChange: (newFilters: {
    plants?: string[] | null;
    compare?: boolean;
    sortByBatch?: boolean;
  }) => void;
  onFilterChangeThrottle: (newFilters: {
    productId?: string | null;
    batchName?: string | null;
  }) => void;
}

export function WeightingListFilter({
  productId,
  batchName,
  plantData = [],
  startDate,
  endDate,
  selectedPlants,
  compare,
  sortByBatch,
  isNotToday,
  isNotTomorrow,
  isDirty,
  actionButton,
  onDateChange,
  handleSetToday,
  handleSetTomorrow,
  handleResetAll,
  onFilterChange,
  onFilterChangeThrottle,
}: TWeightingListFilterProps) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const startDateId = useId();
  const endDateId = useId();
  const productCodeId = useId();
  const batchNameId = useId();
  const plantSelectorId = useId();
  const compareSelectorId = useId();
  const sortSelectorId = useId();

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
          value: String(plant.PlantAlias),
          description: plant.PlantName,
        })),
      );
    }

    return baseItems;
  }, [plantData]);

  const compareListItems = useMemo<IListItem[]>(
    () => [
      { value: 'true', description: 'Только несовпадения' },
      { value: 'false', description: 'Все записи' },
    ],
    [],
  );

  const compareValue = compare ? ['true'] : ['false'];

  const sortListItems = useMemo<IListItem[]>(
    () => [
      { value: 'true', description: 'По партии' },
      { value: 'false', description: 'По продукту' },
    ],
    [],
  );

  const sortValue = sortByBatch ? ['true'] : ['false'];

  const renderFilterFields = () => (
    <>
      <FilterDatePicker
        id={startDateId}
        className="w-full"
        value={startDate}
        onChange={(val) => onDateChange('start', val)}
      />
      <FilterDatePicker
        id={endDateId}
        className="w-full"
        value={endDate}
        onChange={(val) => onDateChange('end', val)}
      />
      <FilterSelector
        id={plantSelectorId}
        className="w-full"
        placeholder="Площадка"
        items={plantListItems}
        value={selectedPlants}
        onChange={(value) => onFilterChange({ plants: value })}
      />
      <FilterInput
        id={batchNameId}
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
      <FilterSelector
        id={compareSelectorId}
        className="w-full"
        placeholder="Совпадения"
        items={compareListItems}
        value={compareValue}
        onChange={(value) => {
          const selectedString = Array.isArray(value) ? value[0] : value;
          onFilterChange({ compare: selectedString === 'true' });
        }}
      />
      <FilterSelector
        id={sortSelectorId}
        className="w-full"
        placeholder="Сортировка"
        items={sortListItems}
        value={sortValue}
        onChange={(value) => {
          const selectedString = Array.isArray(value) ? value[0] : value;
          onFilterChange({ sortByBatch: selectedString === 'true' });
        }}
      />
      {/* {actionButton} */}
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
            <SheetDescription className="sr-only">Фильтрация взвешиваний</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 px-2 py-4">
            {renderFilterFields()}
            <div className="flex flex-col gap-4 mt-4">
              {actionButton}
              <FilterResetButton
                mobile
                onClick={handleSetToday}
                isDirty={isNotToday}
                icon={<Calendar className="h-4 w-4" />}
                label="Сегодня"
                className="h-9 w-full"
              />
              <FilterResetButton
                mobile
                onClick={handleSetTomorrow}
                isDirty={isNotTomorrow}
                icon={<Calendar className="h-4 w-4" />}
                label="Завтра"
                className="h-9 w-full"
              />
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
    <div className="flex flex-col gap-3 w-full max-w-none ">
      <div className="grid grid-cols-5 gap-2  @max-4xl:grid-cols-2 @max-6xl:grid-cols-3 gap-3 w-full items-end max-w-6xl">
        {renderFilterFields()}
      </div>
      <div className="flex items-center gap-2 w-full">
        {actionButton}
        <FilterResetButton
          mobile={false}
          className="h-8 px-4 text-xs flex items-center justify-center border rounded-md whitespace-nowrap transition-all"
          onClick={handleSetToday}
          isDirty={isNotToday}
          icon={<Calendar className="h-3.5 w-3.5 mr-1.5 shrink-0" />}
          label="Сегодня"
        />
        <FilterResetButton
          mobile={false}
          className="h-8 px-4 text-xs flex items-center justify-center border rounded-md whitespace-nowrap transition-all"
          onClick={handleSetTomorrow}
          isDirty={isNotTomorrow}
          icon={<Calendar className="h-3.5 w-3.5 mr-1.5 shrink-0" />}
          label="Завтра"
        />
        <FilterResetButton
          mobile={false}
          className="h-8 px-4 text-xs flex items-center justify-center border rounded-md whitespace-nowrap transition-all"
          onClick={handleResetAll}
          isDirty={isDirty}
          icon={<Trash className="h-3.5 w-3.5 mr-1.5 shrink-0" />}
          label="Сброс"
        />
      </div>
    </div>
  );
}

function subscribeToNothing() {
  return () => {};
}
