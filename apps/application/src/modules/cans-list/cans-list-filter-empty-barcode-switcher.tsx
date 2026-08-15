import { useShallow } from "zustand/react/shallow";
import FilterSwitcher, { FilterSwitcherProps } from "../../shared/ui/filter-switcher";
import { useCansListFilterStore } from "./store/use-cans-list-filter-store";
import { CansListFilterParams } from "./cans-list-filter-params";

export default function CansListFilterEmptyBarcodeSwitcher() {
  const filter = useCansListFilterStore(useShallow((state) => state.filter));
  const changeFilter = useCansListFilterStore(useShallow((state) => state.changeFilter));
  const switcherProps: FilterSwitcherProps = {
    id: CansListFilterParams.ONLY_EMPTY_BARCODE,
    label: "Штрихкоды",
    condition: filter.onlyEmptyBarcode,
    values: ["Только без штрихкода", "Все"],
    setCondition: (val) => changeFilter({ key: CansListFilterParams.ONLY_EMPTY_BARCODE, value: val.toString() }),
  };
  return <FilterSwitcher {...switcherProps} />;
}
