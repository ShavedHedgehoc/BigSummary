import { Button } from "@headlessui/react";
import clsx from "clsx";
import FilterIcon from "../../shared/components/icons/filter-icon";
import FilterOffIcon from "../../shared/components/icons/filter-off-icon";
import { useCansFilterModalStore } from "./store/use-cans-filter-modal-store";
import { useShallow } from "zustand/react/shallow";
import { initCansFilterValue, useCansFilterStore } from "./store/use-cans-filter-store";

export default function CansTopMenu() {
  const setOpen = useCansFilterModalStore(useShallow((state) => state.setOpen));
  const clearFilter = useCansFilterStore(useShallow((state) => state.clearFilter));
  const filter = useCansFilterStore(useShallow((state) => state.filter));

  return (
    <div className="flex flex-row gap-2 h-full py-4 items-center justify-center">
      <Button
        className={clsx(
          "rounded-md  py-2 px-4 w-32 h-full",
          "flex flex-col gap-1 items-center justify-center",
          "text-lg font-semibold",
          "data-[disabled]:text-slate-400 data-[disabled]:bg-slate-700",
          "data-[active]:text-slate-900 data-[active]:bg-slate-400",
          "text-slate-200 bg-slate-700"
        )}
        onClick={() => setOpen(true)}
        // disabled={true}
      >
        <FilterIcon size={8} />
        Фильтр
      </Button>

      <Button
        className={clsx(
          "rounded-md  py-2 px-4 w-32 h-full",
          "flex flex-col gap-1 items-center justify-center",
          "text-lg font-semibold",
          "data-[disabled]:text-slate-400 data-[disabled]:bg-slate-700",
          "data-[active]:text-slate-900 data-[active]:bg-slate-400",
          "text-slate-200 bg-slate-700"
        )}
        disabled={JSON.stringify(filter) === JSON.stringify(initCansFilterValue)}
        onClick={() => clearFilter()}
      >
        <FilterOffIcon size={8} />
        Сброс
      </Button>
    </div>
  );
}
