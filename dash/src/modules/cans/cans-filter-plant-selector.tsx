import { useShallow } from "zustand/react/shallow";
import TracePlantService, { ITracePlant } from "../../shared/api/services/trace-plant-service";
import { useCansFilterStore } from "./store/use-cans-filter-store";
import { useQuery } from "@tanstack/react-query";
import { CansFilterParams } from "./cans-filter-params";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import clsx from "clsx";
import DownIcon from "../../shared/components/icons/down-icon";

export default function CansFilterPlantSelector() {
  const changeFilter = useCansFilterStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useCansFilterStore(useShallow((state) => state.selectedPlant));
  const setSelectedPlant = useCansFilterStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useCansFilterStore(useShallow((state) => state.plantSelectorOptions));
  const fillPlantSelectorOptions = useCansFilterStore(useShallow((state) => state.fillPlantSelectorOptions));

  useQuery({
    queryKey: ["trace_plants_options", "cans"],
    queryFn: async () => {
      const data = await TracePlantService.getAllPlants();
      if (data) {
        fillPlantSelectorOptions(data);
        return data;
      }
    },
  });

  const handleChange = (item: ITracePlant) => {
    setSelectedPlant(item);
    changeFilter({ key: CansFilterParams.PLANTS, value: "", values: item.PlantPK === 999999 ? [] : [item.PlantPK] });
  };

  return (
    <div className="flex w-52  ">
      <Listbox value={selectedPlant} onChange={handleChange}>
        <ListboxButton
          className={clsx(
            "relative block w-full rounded-lg bg-gray-900 py-3 pr-8 pl-3 text-left text-xl text-slate-200",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
        >
          {selectedPlant.PlantName}
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
          {plantSelectorOptions.map((plant) => (
            <ListboxOption
              key={plant.PlantPK}
              value={plant}
              className="group flex cursor-default items-center gap-2 rounded-lg py-3 px-3 select-none data-[focus]:bg-white/10 "
            >
              <div className="text-xl text-slate-200 ">{plant.PlantName}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
