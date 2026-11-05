'use client';

import { useIsMobile } from '@/shared/lib';
import {
  Button,
  FilterInput,
  FilterResetButton,
  FilterSelector,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui';
import { BARCODE_MODES, HAVE_RECORDS_MODES } from '@repo/schemas';

import { Search, SlidersHorizontal, Trash } from 'lucide-react';
import { useId, useState, useSyncExternalStore } from 'react';

interface TConveyorListFilterProps {
  value: string;
  selectedBarcodes: string[] | undefined;
  selectedRecords: string[] | undefined;
  onFilterChangeThrottle: (newFilters: { value?: string | null }) => void;
  onFilterChange: (newFilters: { barcodes?: string[] | null; records?: string[] | null }) => void;
  handleResetAll: () => void;
}

const BARCODE_LIST_ITEMS = [
  { value: 'All', description: 'Все записи' },
  { value: BARCODE_MODES.FILLED, description: 'Со штрихкодами' },
  { value: BARCODE_MODES.EMPTY, description: 'Без штрихкодов' },
];
const RECORDS_LIST_ITEMS = [
  { value: 'All', description: 'Все записи' },
  { value: HAVE_RECORDS_MODES.WITH_RECORDS, description: 'С записями' },
  { value: HAVE_RECORDS_MODES.WITHOUT_RECORDS, description: 'Без записей' },
];

export function ConveyorListFilter({
  value,
  selectedBarcodes,
  selectedRecords,
  onFilterChangeThrottle,
  onFilterChange,
  handleResetAll,
}: TConveyorListFilterProps) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const barcodeSelectorId = useId();
  const recordSelectorId = useId();

  const isMounted = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  const isDirty = Boolean(
    value !== '' ||
    (selectedBarcodes && selectedBarcodes.length > 0) ||
    (selectedRecords && selectedRecords.length > 0),
  );

  const filterFields = (
    <>
      <FilterInput
        id={'value'}
        className="w-full"
        placeholder="Поиск по конвейеру"
        value={value ?? ''}
        onChange={(value) => onFilterChangeThrottle({ value: value })}
      />

      <FilterSelector
        id={barcodeSelectorId}
        className="w-full"
        placeholder="Штрихкод"
        items={BARCODE_LIST_ITEMS}
        value={selectedBarcodes ?? []}
        onChange={(value) => onFilterChange({ barcodes: value })}
      />
      <FilterSelector
        id={recordSelectorId}
        className="w-full"
        placeholder="Записи"
        items={RECORDS_LIST_ITEMS}
        value={selectedRecords ?? []}
        onChange={(value) => onFilterChange({ records: value })}
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
            <SheetDescription className="sr-only">Фильтрация конвейеров</SheetDescription>
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
    <div className="grid grid-cols-[1fr_1fr_1fr_auto] @max-4xl:grid-cols-2 @max-6xl:grid-cols-3 gap-3 w-full items-end max-w-6xl">
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
