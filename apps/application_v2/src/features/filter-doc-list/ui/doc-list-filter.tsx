'use client';

import { useIsMobile } from '@/shared/lib';
import {
  Button,
  FilterDatePicker,
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
import { TApplicationPlantListResponse } from '@repo/schemas';
import { Calendar, Search, SlidersHorizontal, Trash } from 'lucide-react';
import { useId, useMemo, useState, useSyncExternalStore } from 'react';

// 1. Описываем интерфейс пропсов: компонент принимает чистые стейты и методы снаружи
interface TDocListFilterProps {
  plantData: TApplicationPlantListResponse;
  startDate: Date | undefined;
  endDate: Date | undefined;
  selectedPlants: string[] | undefined;
  isDirty: boolean;
  isNotToday: boolean;
  onDateChange: (type: 'start' | 'end', val: Date | undefined) => void;
  handleSetToday: () => void;
  handleResetAll: () => void;
  onFilterChange: (newFilters: { plants?: string[] | null; states?: string[] | null }) => void;
}

export function DocListFilter({
  plantData = [],
  startDate,
  endDate,
  selectedPlants,
  isDirty,
  isNotToday,
  onDateChange,
  handleSetToday,
  handleResetAll,
  onFilterChange,
}: TDocListFilterProps) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const plantSelectorId = useId();

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
          value: String(plant.id),
          description: plant.value,
        })),
      );
    }

    return baseItems;
  }, [plantData]);

  const filterFields = (
    <>
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
            <SheetDescription className="sr-only">Фильтрация документов</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 px-2 py-4">
            {filterFields}
            <div className="flex flex-col gap-4 mt-4">
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
    <div className="grid grid-cols-[1fr_1fr_1fr_auto_auto] @max-4xl:grid-cols-2 @max-6xl:grid-cols-3 gap-3 w-full items-end max-w-6xl">
      {filterFields}
      <FilterResetButton
        mobile={false}
        className="w-auto! @max-6xl:w-full! px-5 h-8! flex items-center justify-center text-xs transition-all"
        onClick={handleSetToday}
        isDirty={isNotToday}
        icon={<Calendar className="h-4 w-4" />}
        label="Сегодня"
      />
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
