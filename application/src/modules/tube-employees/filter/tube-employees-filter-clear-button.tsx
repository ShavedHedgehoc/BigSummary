import { useShallow } from "zustand/react/shallow";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";
import { useTubeEmployeesFilterStore } from "../store/use-tube-employees-filter-store";

export default function TubeEmployeesFilterClearButton() {
  const clearFilter = useTubeEmployeesFilterStore(useShallow((state) => state.clearFilter));
  const filter = useTubeEmployeesFilterStore(useShallow((state) => state.filter));

  const disableClearButtonCondition = filter.name === "" && filter.ranks.length === 0 && filter.banned.length === 0;

  const clearButtonProps: FilterButtonProps = {
    label: "Сбросить",
    disabled: disableClearButtonCondition,
    startDecorator: <DeleteOutlineIcon />,
    onClick: () => clearFilter(),
  };

  return <FilterButton {...clearButtonProps} />;
}
