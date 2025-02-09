import { useShallow } from "zustand/shallow";
import FilterSwitcher, { FilterSwitcherProps } from "../../shared/ui/filter-switcher";
import { useConveyorsFilterStore } from "./store/use-conveyors-filter-store";
import { ConveyorsFilterParams } from "./conveyors-filter-params";

export default function ConveyorsFilterEmptyBarcodeSwitcher() {
  const filter = useConveyorsFilterStore(useShallow((state) => state.filter));
  const changeFilter = useConveyorsFilterStore(useShallow((state) => state.changeFilter));
  const switcherProps: FilterSwitcherProps = {
    id: ConveyorsFilterParams.ONLY_EMPTY_BARCODE,
    label: "Штрихкоды",
    condition: filter.onlyEmptyBarcode,
    values: ["Только без штрихкода", "Все"],
    setCondition: (val) => changeFilter({ key: ConveyorsFilterParams.ONLY_EMPTY_BARCODE, value: val.toString() }),
  };
  return <FilterSwitcher {...switcherProps} />;
}
