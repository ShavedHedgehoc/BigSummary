import { useShallow } from "zustand/react/shallow";
import { useCansFilterModalStore } from "./store/use-cans-filter-modal-store";
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import CansFilterPlantSelector from "./cans-filter-plant-selector";
import clsx from "clsx";
import { initCansFilterValue, useCansFilterStore } from "./store/use-cans-filter-store";
import CansFilterVolumeSelector from "./cans-filter-volume-selector";
import CansFilterStateSelector from "./cans-filter-state-selector";

export default function CansFilterModal() {
  const open = useCansFilterModalStore(useShallow((state) => state.open));
  const setOpen = useCansFilterModalStore(useShallow((state) => state.setOpen));
  const clearFilter = useCansFilterStore(useShallow((state) => state.clearFilter));
  const filter = useCansFilterStore(useShallow((state) => state.filter));
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
                <CansFilterPlantSelector />
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-slate-300 text-xl px-2">Объем:</div>
                <CansFilterVolumeSelector />
              </div>
              <div className="flex flex-col gap-2 ">
                <div className="text-slate-300 text-xl px-2">Статус:</div>
                <CansFilterStateSelector />
              </div>
            </div>
            <div className="flex w-full justify-end gap-4">
              <Button
                className={clsx(
                  "rounded-md  py-3 px-4 w-32 h-full",
                  "flex flex-col gap-1 items-center justify-center",
                  "text-xl font-semibold",
                  "data-[disabled]:text-slate-400 data-[disabled]:bg-slate-700",
                  "data-[active]:text-slate-900 data-[active]:bg-slate-100",
                  "text-slate-200 bg-gray-900"
                )}
                onClick={() => clearFilter()}
                disabled={JSON.stringify(filter) === JSON.stringify(initCansFilterValue)}
              >
                Сброс
              </Button>
              <Button
                className={clsx(
                  "rounded-md  py-3 px-4 w-32 h-full",
                  "flex flex-col gap-1 items-center justify-center",
                  "text-xl font-semibold",
                  "data-[disabled]:text-slate-400 data-[disabled]:bg-slate-700",
                  "data-[active]:text-slate-900 data-[active]:bg-slate-100",
                  "text-slate-200 bg-gray-900"
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
