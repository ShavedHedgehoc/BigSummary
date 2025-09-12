import { useShallow } from "zustand/shallow";

import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../../shared/ui/filter-selector";
import { expDaysValues, useInventoryDetailFilterStore } from "../store/inventory-detail-filter-store";
import { InventoryDetailFilterParams } from "../store/inventory-detail-filter-params";

export default function InventoryDetailFilterExpDaysSelector() {
  const changeFilter = useInventoryDetailFilterStore(useShallow((state) => state.changeFilter));
  const selectedDays = useInventoryDetailFilterStore(useShallow((state) => state.selectedDays));
  const setSelectedDays = useInventoryDetailFilterStore(useShallow((state) => state.setSelectedDays));

  const expDaysOptions = expDaysValues.map((val) => (
    <FilterSelectorOption key={`plant_option_${val}`} id={val} value={val.toString()} />
  ));

  const expDaysSelectorProps: FilterSelectorProps = {
    id: InventoryDetailFilterParams.DAY_TO_EXPIRE,
    selectedOption: selectedDays,
    placeholder: "Выберите кол-во дней",
    label: "Выбор остатка срока годности",
    options: expDaysOptions,
    setSelectedOption: (id: number) => setSelectedDays(id),
    changeFilter: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) =>
      changeFilter({ key, value, values }),
  };

  return <FilterSelector {...expDaysSelectorProps} />;
}
