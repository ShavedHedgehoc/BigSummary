import { useShallow } from "zustand/shallow";
import FilterSwitcher, { FilterSwitcherProps } from "../../../shared/ui/filter-switcher";
import { useCansFilterStore } from "./store/use-cans-filter-store";
import { CansFilterParams } from "./cans-filter-params";

export default function CansFilterTransitSwitcher() {
  const filter = useCansFilterStore(useShallow((state) => state.filter));
  const changeFilter = useCansFilterStore(useShallow((state) => state.changeFilter));
  const switcherProps: FilterSwitcherProps = {
    id: CansFilterParams.TRANSIT,
    label: "Транзит",
    condition: filter.transit,
    values: ["В транзите", "На площадке"],
    setCondition: (val) => changeFilter({ key: CansFilterParams.TRANSIT, value: val.toString() }),
  };
  return <FilterSwitcher {...switcherProps} />;
}
