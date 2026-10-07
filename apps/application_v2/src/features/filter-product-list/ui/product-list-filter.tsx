'use client';

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

interface TProductListFilterProps {
  plantData: TApplicationPlantListResponse;
  stateData: TApplicationHistoryTypeListResponse;
  productCode: string | null;
  boil: string | null;
  marking: string | null;
  conveyor: string | null;
  selectedPlants?: string[] | undefined;
  selectedStates: string[] | undefined;
  showPlants?: boolean;
  onFilterChangeThrottle: (newFilters: {
    productCode?: string | null;
    boil?: string | null;
    marking?: string | null;
    conveyor?: string | null;
  }) => void;
  onFilterChange: (newFilters: { plants?: string[] | null; states?: string[] | null }) => void;
  handleReset: () => void;
  handleResetAll: () => void;
}

export function ProductListFilter({
  plantData = [],
  stateData = [],
  productCode,
  boil,
  marking,
  conveyor,
  selectedPlants,
  showPlants = true,
  selectedStates,
  onFilterChange,
  onFilterChangeThrottle,
  handleReset,
  handleResetAll,
}: TProductListFilterProps) {
  const isMobile = useIsMobile();

  const [open, setOpen] = useState(false);

  const codeId = useId();
  const markingId = useId();
  const boilId = useId();
  const conveyorId = useId();
  const stateSelectorId = useId();
  const plantSelectorId = useId();

  const isMounted = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  const plantListItems = useMemo<IListItem[]>(() => {
    if (!showPlants) return [];
    const baseItems: IListItem[] = [];
    if (Array.isArray(plantData)) {
      baseItems.push(
        ...plantData.map((plant) => ({
          value: String(plant.id),
          description: plant.value,
        })),
      );
    }
    return baseItems;
  }, [plantData, showPlants]);

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

  const activeFieldsCount = useMemo(() => {
    let count = 5;
    if (showPlants) count += 1;
    return count;
  }, [showPlants]);

  const isDirty = Boolean(
    productCode !== '' ||
    marking !== '' ||
    boil !== '' ||
    conveyor !== '' ||
    (selectedStates && selectedStates.length > 0),
  );

  const filterFields = (
    <>
      <FilterInput
        id={codeId}
        className="w-full"
        placeholder="Поиск по коду 1С"
        value={productCode ?? ''}
        onChange={(value) => onFilterChangeThrottle({ productCode: value })}
      />

      <FilterInput
        id={markingId}
        className="w-full"
        placeholder="Поиск по артикулу"
        value={marking ?? ''}
        onChange={(value) => onFilterChangeThrottle({ marking: value })}
      />

      <FilterInput
        id={boilId}
        className="w-full"
        placeholder="Поиск по партии"
        value={boil ?? ''}
        onChange={(value) => onFilterChangeThrottle({ boil: value })}
      />

      <FilterInput
        id={conveyorId}
        className="w-full"
        placeholder="Поиск по конвейеру"
        value={conveyor ?? ''}
        onChange={(value) => onFilterChangeThrottle({ conveyor: value })}
      />

      <FilterMultiSelector
        id={stateSelectorId}
        className="w-full"
        placeholder="Статус"
        items={stateListItems}
        value={selectedStates ?? []}
        onChange={(value) => onFilterChange({ states: value })}
      />
      {showPlants && (
        <FilterSelector
          id={plantSelectorId}
          className="w-full"
          items={plantListItems}
          value={selectedPlants ?? []}
          onChange={(value) => onFilterChange({ plants: value })}
        />
      )}
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
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
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
    <div
      style={{ '--fields-count': activeFieldsCount } as React.CSSProperties}
      className="grid grid-cols-[repeat(var(--fields-count),1fr)_auto] @max-4xl:grid-cols-2 @max-6xl:grid-cols-3 gap-3 w-full items-end max-w-6xl"
    >
      {filterFields}

      <FilterResetButton
        mobile={false}
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
