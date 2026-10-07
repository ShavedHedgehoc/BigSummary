'use client';

import { useRecordListSearchParams } from '@/entities/record';
import { useDashUiParams } from '../model/use-dash-ui-params';
import {
  Button,
  FilterSelector,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui';
import { useMemo, useState, useSyncExternalStore } from 'react';
import { IListItem } from '@/shared/ui';
import { cn, useIsMobile } from '@/shared/lib';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function DashFilter() {
  const isMobile = useIsMobile();

  const [open, setOpen] = useState(false);
  const {
    // params: uiParams,
    setParams: setUiParams,
  } = useDashUiParams();
  const { plantData, params, setParams } = useRecordListSearchParams('dash');
  const plantListItems = useMemo<IListItem[]>(() => {
    if (!Array.isArray(plantData)) return [];
    return plantData.map((plant) => ({
      value: String(plant.id),
      description: plant.value,
    }));
  }, [plantData]);

  const isMounted = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
  const handlePlantChange = (value: string[] | null | undefined) => {
    setParams({ plants: value }, { shallow: false });
    setUiParams({ selectedRecordId: null }, { shallow: true });
  };

  //   const hasSelectedRow = uiParams.selectedRecordId !== '';

  const filterFields = (
    <FilterSelector
      id="dash-plant-selector"
      className="w-full "
      placeholder="Выберите площадку"
      items={plantListItems}
      value={params.plants ?? []}
      onChange={handlePlantChange}
    />
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Фильтры
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Фильтры</SheetTitle>
            <SheetDescription className="sr-only">Фильтрация документов</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 px-2 py-4">
            {filterFields}

            <Button className="h-9 w-full text-xs" onClick={() => setOpen(false)}>
              <Search className="h-4 w-4 mr-2" /> Показать
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  if (!isMounted) return <div className="h-10 " />;

  return (
    <div
      className={cn(
        'flex justify-end  w-full pr-2',
        // !hasSelectedRow && 'pr-5'
      )}
    >
      <div className="w-80">{filterFields}</div>
    </div>
  );
}

function subscribeToNothing() {
  return () => {};
}
