'use client';

import { useIsMobile } from '@/shared/lib';
import {
  Button,
  FilterInput,
  FilterMultiSelector,
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
import {
  TApplicationTraceCanVolumeListResponse,
  TTraceCanStateListResponse,
  TTracePlantListResponse,
} from '@repo/schemas';
import { Search, SlidersHorizontal, Trash } from 'lucide-react';
import { useId, useMemo, useState, useSyncExternalStore } from 'react';

interface TCanDashFilterProps {
  plantData: TTracePlantListResponse;
  stateData: TTraceCanStateListResponse;
  volumeData: TApplicationTraceCanVolumeListResponse;
  can: string | null;
  selectedPlants: string[] | undefined;
  selectedStates: string[] | undefined;
  selectedVolumes: string[] | undefined;
  isTransit: boolean;
  handleResetAll: () => void;
  onFilterChangeThrottle: (newFilters: { can?: string | null }) => void;
  onFilterChange: (newFilters: {
    plants?: string[] | null;
    states?: string[] | null;
    volumes?: string[] | null;
    transit?: boolean;
  }) => void;
}

export function CanDashFilter({
  plantData = [],
  stateData = [],
  volumeData = [],
  can,
  selectedPlants,
  selectedStates,
  selectedVolumes,
  isTransit = false,
  handleResetAll,
  onFilterChange,
  onFilterChangeThrottle,
}: TCanDashFilterProps) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const plantSelectorId = useId();
  const stateSelectorId = useId();
  const volumeSelectorId = useId();
  const transitSelectorId = useId();

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

  const stateListItems = useMemo<IListItem[]>(() => {
    const baseItems: IListItem[] = [];
    if (Array.isArray(stateData)) {
      baseItems.push(
        ...stateData.map((state) => ({
          value: String(state.CanStatePK),
          description: state.CanStateDescription,
        })),
      );
    }
    return baseItems;
  }, [stateData]);

  const volumeListItems = useMemo<IListItem[]>(() => {
    const baseItems: IListItem[] = [];
    if (Array.isArray(volumeData)) {
      baseItems.push(
        ...volumeData.map((volume) => ({
          value: String(volume.volume),
          description: String(volume.volume) + ' куб.м',
        })),
      );
    }
    return baseItems;
  }, [volumeData]);

  const transitListItems = useMemo<IListItem[]>(
    () => [
      { value: 'true', description: 'Транзит' },
      { value: 'false', description: 'На площадке' },
    ],
    [],
  );

  const transitValue = isTransit ? ['true'] : ['false'];

  const isDirty = Boolean(
    can !== '' ||
    isTransit ||
    (selectedPlants && selectedPlants.length > 0) ||
    (selectedVolumes && selectedVolumes.length > 0) ||
    (selectedStates && selectedStates.length > 0),
  );

  const filterFields = (
    <>
      <FilterInput
        id={'can'}
        className="w-full"
        placeholder="Поиск по емкости"
        value={can ?? ''}
        onChange={(value) => onFilterChangeThrottle({ can: value })}
      />
      <FilterMultiSelector
        id={volumeSelectorId}
        className="w-full"
        placeholder="Объем"
        items={volumeListItems}
        value={selectedVolumes ?? []}
        onChange={(value) => onFilterChange({ volumes: value })}
      />
      <FilterSelector
        id={plantSelectorId}
        className="w-full"
        placeholder="Площадка"
        items={plantListItems}
        value={selectedPlants}
        onChange={(value) => onFilterChange({ plants: value })}
      />
      <FilterMultiSelector
        id={stateSelectorId}
        className="w-full"
        placeholder="Статус"
        items={stateListItems}
        value={selectedStates ?? []}
        onChange={(value) => onFilterChange({ states: value })}
      />
      <FilterSelector
        id={transitSelectorId}
        className="w-full"
        placeholder="Локация"
        items={transitListItems}
        value={transitValue}
        onChange={(value) => {
          const selectedString = Array.isArray(value) ? value[0] : value;
          onFilterChange({ transit: selectedString === 'true' });
        }}
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
            <SheetDescription className="sr-only">Фильтрация емкостей</SheetDescription>
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
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] @max-4xl:grid-cols-2 @max-6xl:grid-cols-3 gap-3 w-full items-end max-w-6xl">
      {filterFields}

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
