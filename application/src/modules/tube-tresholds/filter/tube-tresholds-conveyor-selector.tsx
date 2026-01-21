import { useShallow } from "zustand/react/shallow";
import { useTubeTresholdsFilterStore } from "../store/use-tube-tresholds-filter-store";
import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../../shared/ui/filter-selector";
import { TubeTresholdsFilterParams } from "./tube-tresholds-filter-params";

export default function TubeTresholdsFilterConveyorSelector() {
  const changeFilter = useTubeTresholdsFilterStore(useShallow((state) => state.changeFilter));
  const selectedConveyor = useTubeTresholdsFilterStore(useShallow((state) => state.selectedConveyorOption));
  const setSelectedConveyor = useTubeTresholdsFilterStore(useShallow((state) => state.setSelectedConveyorOption));
  const conveyorSelectorOptions = useTubeTresholdsFilterStore(useShallow((state) => state.conveyorSelectorOptions));
  const conveyorOptions = conveyorSelectorOptions.map((conveyor) => (
    <FilterSelectorOption key={`conveyor_option_${conveyor.id}`} id={conveyor.id} value={conveyor.name} />
  ));

  const conveyorSelectorProps: FilterSelectorProps = {
    id: TubeTresholdsFilterParams.CONVEYORS,
    selectedOption: selectedConveyor,
    placeholder: "Выберите конвейер",
    label: "Выбор конвейера",
    options: conveyorOptions,
    setSelectedOption: (id: number) => setSelectedConveyor(id),
    changeFilter: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) =>
      changeFilter({ key, value, values }),
  };

  return <FilterSelector {...conveyorSelectorProps} />;
}
