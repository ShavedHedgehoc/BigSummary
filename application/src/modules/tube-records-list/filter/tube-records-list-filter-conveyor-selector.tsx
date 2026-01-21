import { useShallow } from "zustand/react/shallow";
import { useTubeRecordsListFilterStore } from "../store/use-tube-records-list-filter-store";
import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../../shared/ui/filter-selector";
import { TubeRecordsListFilterParams } from "./tube-records-list-filter-params";

export default function TubeRecordsListFilterConveyorSelector() {
  const changeFilter = useTubeRecordsListFilterStore(useShallow((state) => state.changeFilter));
  const selectedConveyorOption = useTubeRecordsListFilterStore(useShallow((state) => state.selectedConveyorOption));
  const setSelectedConveyorOption = useTubeRecordsListFilterStore(
    useShallow((state) => state.setSelectedConveyorOption)
  );
  const conveyorSelectorOptions = useTubeRecordsListFilterStore(useShallow((state) => state.conveyorSelectorOptions));

  const conveyorOptions = conveyorSelectorOptions.map((item) => (
    <FilterSelectorOption key={`state_option_${item.id}`} id={item.id} value={item.name} />
  ));

  const plantSelectorProps: FilterSelectorProps = {
    id: TubeRecordsListFilterParams.CONVEYORS,
    selectedOption: selectedConveyorOption,
    placeholder: "Выберите конвейер",
    label: "Выбор конвейера",
    options: conveyorOptions,
    setSelectedOption: (id: number) => setSelectedConveyorOption(id),
    changeFilter: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) =>
      changeFilter({ key, value, values }),
  };

  return <FilterSelector {...plantSelectorProps} />;
}
