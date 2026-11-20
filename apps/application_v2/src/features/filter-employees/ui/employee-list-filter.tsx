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
import { TApplicationOccupationListResponse } from '@repo/schemas';
import { Search, SlidersHorizontal, Trash } from 'lucide-react';

import { useId, useMemo, useState, useSyncExternalStore } from 'react';

interface TEmployeeListFilterProps {
  occupationData: TApplicationOccupationListResponse;
  name: string;
  selectedOccupations: string[] | undefined;
  onFilterChangeThrottle: (newFilters: { name?: string | null }) => void;
  onFilterChange: (newFilters: { occupations?: string[] | null }) => void;
  handleResetAll: () => void;
  handleReset: () => void;
}

export function EmployeeListFilter({
  occupationData = [],
  name,
  selectedOccupations,
  onFilterChangeThrottle,
  onFilterChange,
  handleReset,
  handleResetAll,
}: TEmployeeListFilterProps) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const occupationSelectorId = useId();

  const isMounted = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  const isDirty = Boolean(name !== '' || (selectedOccupations && selectedOccupations.length > 0));

  const occupationListItems = useMemo<IListItem[]>(() => {
    const baseItems: IListItem[] = [{ value: 'All', description: 'Все роли' }];
    if (Array.isArray(occupationData)) {
      baseItems.push(
        ...occupationData.map((occupation) => ({
          value: String(occupation.id),
          description: occupation.description,
        })),
      );
    }
    return baseItems;
  }, [occupationData]);

  const filterFields = (
    <>
      <FilterInput
        id={'name'}
        className="w-full"
        placeholder="Поиск по ФИО"
        value={name ?? ''}
        onChange={(value) => onFilterChangeThrottle({ name: value })}
      />

      <FilterSelector
        id={occupationSelectorId}
        className="w-full"
        placeholder="Роли"
        items={occupationListItems}
        value={selectedOccupations ?? []}
        onChange={(value) => onFilterChange({ occupations: value })}
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
            <SheetDescription className="sr-only">Фильтрация сотрудников</SheetDescription>
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
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] @max-4xl:grid-cols-2 @max-6xl:grid-cols-3 gap-3 w-full items-end max-w-6xl">
      {filterFields}
      <FilterResetButton
        mobile={false}
        className="w-auto! @max-6xl:w-full! px-5 h-8! flex items-center justify-center text-xs transition-all"
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
