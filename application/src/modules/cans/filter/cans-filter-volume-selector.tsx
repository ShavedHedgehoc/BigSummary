import { useShallow } from "zustand/shallow";
import { useQuery } from "@tanstack/react-query";

import { useCansFilterStore } from "./store/use-cans-filter-store";
import { CansFilterParams } from "./cans-filter-params";
import FilterMultiSelector, {
  FilterMultiSelectorOption,
  FilterMultiSelectorProps,
} from "../../../shared/ui/filter-multi-selector";

import TraceCansService from "../../../shared/api/services/trace-cans-service";

export default function CansFilterVolumeSelector() {
  const filter = useCansFilterStore(useShallow((state) => state.filter));
  const changeFilter = useCansFilterStore(useShallow((state) => state.changeFilter));
  const volumeSelectorOptions = useCansFilterStore(useShallow((state) => state.volumeSelectorOptions));
  const fillVolumeSelectorOptions = useCansFilterStore(useShallow((state) => state.fillVolumeSelectorOptions));

  useQuery({
    queryKey: ["cans_volumes_options"],
    queryFn: async () => {
      const data = await TraceCansService.getCanVolumes();
      if (data) {
        fillVolumeSelectorOptions(data);
        return data;
      }
    },
  });

  const volumeOptions = volumeSelectorOptions.map((item) => (
    <FilterMultiSelectorOption
      key={`volume_option_${item.volume}`}
      id={item.volume}
      value={`${item.volume} куб.м.`}
      options={[...filter.volumes]}
    />
  ));

  const stateSelectorProps: FilterMultiSelectorProps = {
    id: CansFilterParams.VOLUMES,
    selectedOptions: filter.volumes,
    placeholder: "Выберите объем",
    label: "Поиск по объему",
    options: volumeOptions,
    changeFilter: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) =>
      changeFilter({ key, value, values }),
  };

  return <FilterMultiSelector {...stateSelectorProps} />;
}
