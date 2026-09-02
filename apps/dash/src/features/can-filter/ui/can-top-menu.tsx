import { Button } from '@headlessui/react';
import clsx from 'clsx';
import { useShallow } from 'zustand/react/shallow';
import { FilterIcon, FilterOffIcon } from '@/shared/ui';
import { initCanFilterValue, useCanFilterModalStore, useCanFilterStore } from '../model';

export function CanTopMenu() {
  const setOpen = useCanFilterModalStore(useShallow((state) => state.setOpen));
  const clearFilter = useCanFilterStore(useShallow((state) => state.clearFilter));
  const filter = useCanFilterStore(useShallow((state) => state.filter));

  return (
    <div className="flex flex-row gap-2 h-full py-4 items-center justify-center">
      <Button
        className={clsx(
          'rounded-md  py-2 px-4 w-32 h-full',
          'flex flex-col gap-1 items-center justify-center',
          'text-lg font-semibold',
          'data-[disabled]:text-slate-400 data-[disabled]:bg-slate-700',
          'data-[active]:text-slate-900 data-[active]:bg-slate-400',
          'text-slate-200 bg-slate-700',
        )}
        onClick={() => setOpen(true)}
      >
        <FilterIcon size={8} />
        Фильтр
      </Button>

      <Button
        className={clsx(
          'rounded-md  py-2 px-4 w-32 h-full',
          'flex flex-col gap-1 items-center justify-center',
          'text-lg font-semibold',
          'data-[disabled]:text-slate-400 data-[disabled]:bg-slate-700',
          'data-[active]:text-slate-900 data-[active]:bg-slate-400',
          'text-slate-200 bg-slate-700',
        )}
        disabled={JSON.stringify(filter) === JSON.stringify(initCanFilterValue)}
        onClick={() => clearFilter()}
      >
        <FilterOffIcon size={8} />
        Сброс
      </Button>
    </div>
  );
}
