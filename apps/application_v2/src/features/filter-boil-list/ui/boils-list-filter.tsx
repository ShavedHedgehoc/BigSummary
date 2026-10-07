import { useIsMobile } from '@/shared/lib';
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
import { FilterMultiSelector } from '@/shared/ui/filter-multi-selector';
import { TApplicationHistoryTypeListResponse, TApplicationPlantListResponse } from '@repo/schemas';
import { Search, SlidersHorizontal, Trash } from 'lucide-react';

import { useId, useMemo, useState, useSyncExternalStore } from 'react';

interface TBoilListFilterProps {
  plantData: TApplicationPlantListResponse;
  stateData: TApplicationHistoryTypeListResponse;
  baseCode: string | null;
  boil: string | null;
  marking: string | null;
  selectedPlants: string[] | undefined;
  selectedStates: string[] | undefined;
  onFilterChangeThrottle: (newFilters: {
    baseCode?: string | null;
    boil?: string | null;
    marking?: string | null;
    code?: string | null;
  }) => void;
  onFilterChange: (newFilters: { plants?: string[] | null; states?: string[] | null }) => void;
  handleReset: () => void;
  handleResetAll: () => void;
}

export function BoilListFilter({
  plantData = [],
  stateData = [],
  baseCode,
  boil,
  marking,
  selectedPlants,
  selectedStates,
  onFilterChange,
  onFilterChangeThrottle,
  handleReset,
  handleResetAll,
}: TBoilListFilterProps) {
  const isMobile = useIsMobile();

  const [open, setOpen] = useState(false);
  const selectorId = useId();

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

  const stateListItems = useMemo<IListItem[]>(() => {
    const baseItems: IListItem[] = [];

    if (Array.isArray(stateData)) {
      baseItems.push(
        ...stateData.map((state) => ({
          value: String(state.id),
          description: state.description,
        })),
      );
    }

    return baseItems;
  }, [stateData]);

  const isDirty = Boolean(
    baseCode !== '' ||
    marking !== '' ||
    boil !== '' ||
    (selectedPlants && selectedPlants.length > 0) ||
    (selectedStates && selectedStates.length > 0),
  );

  const filterFields = (
    <>
      <FilterInput
        id={'boil'}
        className="w-full"
        placeholder="Поиск по партии"
        value={boil ?? ''}
        onChange={(value) => onFilterChangeThrottle({ boil: value })}
      />

      <FilterInput
        id={'marking'}
        className="w-full"
        placeholder="Поиск по артикулу"
        value={marking ?? ''}
        onChange={(value) => onFilterChangeThrottle({ marking: value })}
      />
      <FilterInput
        id={'code'}
        className="w-full"
        placeholder="Поиск по коду 1С"
        value={baseCode ?? ''}
        onChange={(value) => onFilterChangeThrottle({ baseCode: value })}
      />

      <FilterMultiSelector
        id={selectorId}
        className="w-full"
        placeholder="Статус"
        items={stateListItems}
        value={selectedStates ?? []}
        onChange={(value) => onFilterChange({ states: value })}
      />
      <FilterSelector
        id={selectorId}
        className="w-full"
        items={plantListItems}
        value={selectedPlants ?? []}
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
    <div className="grid grid-cols-[repeat(5,1fr)_auto] @max-4xl:grid-cols-2 @max-6xl:grid-cols-3 gap-3 w-full items-end max-w-6xl ">
      {filterFields}

      <FilterResetButton
        mobile={isMobile}
        className="w-auto! @max-6xl:w-full!  px-5 h-8! flex items-center justify-center text-xs transition-all"
        onClick={handleReset}
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
