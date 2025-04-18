import { useShallow } from "zustand/react/shallow";
import { useCansFilterStore } from "../store/use-cans-filter-store";
import { useQuery } from "@tanstack/react-query";
import { CansFilterParams } from "./cans-filter-params";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import clsx from "clsx";
import DownIcon from "../../../shared/components/icons/down-icon";
import TraceCansService from "../../../shared/api/services/trace-can-service";
import ListCheckIcon from "../../../shared/components/icons/list-check-icon";

export default function CansFilterVolumeSelector() {
  const filter = useCansFilterStore(useShallow((state) => state.filter));
  const changeFilter = useCansFilterStore(useShallow((state) => state.changeFilter));
  const volumeSelectorOptions = useCansFilterStore(useShallow((state) => state.volumeSelectorOptions));
  const fillVolumeSelectorOptions = useCansFilterStore(useShallow((state) => state.fillVolumeSelectorOptions));

  useQuery({
    queryKey: ["trace_volume_options", "cans"],
    queryFn: async () => {
      const data = await TraceCansService.getCanVolumes();
      if (data) {
        fillVolumeSelectorOptions(data);
        return data;
      }
    },
  });

  const handleChange = (items: number[]) => {
    changeFilter({ key: CansFilterParams.VOLUMES, value: "", values: items });
  };

  return (
    <div className="flex w-52  ">
      <Listbox value={filter.volumes} multiple={true} onChange={handleChange}>
        <ListboxButton
          className={clsx(
            "relative block w-full rounded-lg bg-gray-900 py-3 pr-8 pl-3 text-left text-xl text-slate-200",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 "
          )}
        >
          {filter.volumes.length === 0 ? "Не выбрано" : "Отфильтровано"}
          <div className="group pointer-events-none absolute top-2.5 right-4 size-5 " aria-hidden="true">
            <DownIcon size={8} />
          </div>
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--button-width)] rounded-xl border border-white/5 bg-gray-900 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {volumeSelectorOptions.map((volume) => (
            <ListboxOption
              key={volume.volume}
              value={volume.volume}
              className="group flex cursor-default items-center gap-2 rounded-lg py-3 px-3 select-none data-[focus]:bg-white/10 "
            >
              <div className=" flex flex-row text-xl text-slate-200 items-center justify-between w-full gap-3">
                {`${volume.volume} куб.м.`}
                {[...filter.volumes].includes(volume.volume) && <ListCheckIcon size={6} />}
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
