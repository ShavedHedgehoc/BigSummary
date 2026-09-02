import { useShallow } from 'zustand/react/shallow';
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

import clsx from 'clsx';
import { initCanFilterValue, useCanFilterModalStore, useCanFilterStore } from '../model';
import { CanFilterPlantSelector } from './can-filter-plant-selector';
import { CanFilterVolumeSelector } from './can-filter-volume-selector';
import { CanFilterStateSelector } from './can-filter-state-selector';
import { CanFilterTransitSwitch } from './can-filter-transit-switch';

export function CanFilterModal() {
  const open = useCanFilterModalStore(useShallow((state) => state.open));
  const setOpen = useCanFilterModalStore(useShallow((state) => state.setOpen));
  const clearFilter = useCanFilterStore(useShallow((state) => state.clearFilter));
  const filter = useCanFilterStore(useShallow((state) => state.filter));
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/60 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className=" space-y-4  bg-gray-950 p-2 rounded-lg ">
          <div className=" flex flex-col gap-6 px-4 py-4 ">
            <div>
              <DialogTitle as="h3" className="text-2xl font-semibold text-slate-100 ">
                Выберите параметры:
              </DialogTitle>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-slate-300 text-xl px-2">Площадка:</div>
                <CanFilterPlantSelector />
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-slate-300 text-xl px-2">Объем:</div>
                <CanFilterVolumeSelector />
              </div>
              <div className="flex flex-col gap-2 ">
                <div className="text-slate-300 text-xl px-2">Статус:</div>
                <CanFilterStateSelector />
              </div>
            </div>
            <div className="flex flex-col gap-2 self-end">
              <div className="text-slate-300 text-xl px-2">Транзит</div>
              <CanFilterTransitSwitch />
            </div>
            <div className="flex w-full justify-end gap-4">
              <Button
                className={clsx(
                  'rounded-md  py-3 px-4 w-32 h-full',
                  'flex flex-col gap-1 items-center justify-center',
                  'text-xl font-semibold',
                  'data-[disabled]:text-slate-400 data-[disabled]:bg-slate-700',
                  'data-[active]:text-slate-900 data-[active]:bg-slate-100',
                  'text-slate-200 bg-gray-900',
                )}
                onClick={() => clearFilter()}
                disabled={JSON.stringify(filter) === JSON.stringify(initCanFilterValue)}
              >
                Сброс
              </Button>
              <Button
                className={clsx(
                  'rounded-md  py-3 px-4 w-32 h-full',
                  'flex flex-col gap-1 items-center justify-center',
                  'text-xl font-semibold',
                  'data-[disabled]:text-slate-400 data-[disabled]:bg-slate-700',
                  'data-[active]:text-slate-900 data-[active]:bg-slate-100',
                  'text-slate-200 bg-gray-900',
                )}
                onClick={() => setOpen(false)}
              >
                Закрыть
              </Button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
