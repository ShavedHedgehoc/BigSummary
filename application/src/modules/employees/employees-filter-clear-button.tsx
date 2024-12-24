import { useShallow } from "zustand/shallow";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterButton, { FilterButtonProps } from "../../shared/ui/filter-button";
import { useEmployeesFilterStore } from "./store/use-employees-filter-store";

export default function EmployeesFilterClearButton() {
  const clearFilter = useEmployeesFilterStore(useShallow((state) => state.clearFilter));
  const filter = useEmployeesFilterStore(useShallow((state) => state.filter));

  const disableClearButtonCondition = filter.name === "" && filter.occupations.length === 0;

  const clearButtonProps: FilterButtonProps = {
    label: "Сбросить",
    disabled: disableClearButtonCondition,
    startDecorator: <DeleteOutlineIcon />,
    onClick: () => clearFilter(),
  };

  return <FilterButton {...clearButtonProps} />;
}
