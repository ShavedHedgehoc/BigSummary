import { useDocListSearchParams, type DocListParams } from '@/entities/doc';
import { getMonthBounds, getToday, useIsMobile } from '@/shared/lib';
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
import { format } from 'date-fns';
import { Calendar, Search, SlidersHorizontal, Trash } from 'lucide-react';
import { useId, useMemo, useState, useSyncExternalStore } from 'react';

interface TDocListFilterProps {
  plantData: TApplicationPlantListResponse;
}

const formatDateToString = (date: Date) => format(date, 'yyyy-MM-dd');

export function DocListFilter({ plantData = [] }: TDocListFilterProps) {
  const isMobile = useIsMobile();
  const { params, setParams } = useDocListSearchParams();
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

  const currentBounds = getMonthBounds();
  const isDirty =
    params.startDate.toISOString() !== currentBounds.start.toISOString() ||
    params.endDate.toISOString() !== currentBounds.end.toISOString() ||
    (params.plants && params.plants.length > 0);

  const todayStr = formatDateToString(getToday());
  const isNotToday =
    formatDateToString(params.startDate) !== todayStr ||
    formatDateToString(params.endDate) !== todayStr;

  const handleSetToday = () => {
    const freshToday = getToday();
    setParams({ startDate: freshToday, endDate: freshToday, page: 1 }, { shallow: false });
  };

  const handleDateChange = (type: 'start' | 'end', val: Date | undefined) => {
    if (!val) {
      setParams(
        { [type === 'start' ? 'startDate' : 'endDate']: null, page: 1 },
        { shallow: false },
      );
      return;
    }

    const normalizedDate = new Date(val);
    normalizedDate.setHours(12, 0, 0, 0);
    const updates: Partial<DocListParams> = { page: 1 };

    if (type === 'start') {
      updates.startDate = normalizedDate;
      if (params.endDate && normalizedDate > params.endDate) {
        updates.endDate = normalizedDate;
      }
    } else {
      updates.endDate = normalizedDate;
      if (params.startDate && normalizedDate < params.startDate) {
        updates.startDate = normalizedDate;
      }
    }
    setParams(updates, { shallow: false });
  };

  const filterFields = (
    <>
      <FilterDatePicker
        className="w-full"
        value={params.startDate}
        onChange={(val) => handleDateChange('start', val)}
      />
      <FilterDatePicker
        className="w-full"
        value={params.endDate}
        onChange={(val) => handleDateChange('end', val)}
      />

      <FilterSelector
        id={selectorId}
        className="w-full"
        items={plantListItems}
        value={params.plants ?? []}
        onChange={(val) => {
          setParams(
            {
              plants: val || null,
              page: 1,
            },
            { shallow: false },
          );
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
                onClick={handleSetToday}
                isDirty={isNotToday}
                icon={<Calendar className="h-4 w-4" />}
                label="Сегодня"
                className="h-9 w-full"
              />
              <FilterResetButton
                mobile
                isDirty={isDirty}
                onClick={() => setParams(null)}
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
    <div className="grid grid-cols-[1fr_1fr_1fr_auto_auto] @max-6xl:grid-cols-3 @max-4xl:grid-cols-2 gap-3 w-full items-end max-w-6xl">
      {filterFields}
      <FilterResetButton
        mobile={isMobile}

        className="w-auto! @max-6xl:w-full!  px-5 h-8! flex items-center justify-center text-xs transition-all"
        onClick={handleSetToday}
        isDirty={isNotToday}
        icon={<Calendar className="h-4 w-4" />}
        label="Сегодня"
      />
      <FilterResetButton
        mobile={isMobile}
        className="w-auto! @max-6xl:w-full!  px-5 h-8! flex items-center justify-center text-xs transition-all"
        onClick={() => setParams(null)}
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
