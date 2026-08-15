import { useShallow } from "zustand/react/shallow";
import { useForemanFilterStore } from "../store/use-foreman-filter-store";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";

export default function ForemanFilterClearButton() {
  const clearFilter = useForemanFilterStore(useShallow((state) => state.clearFilter));
  const filter = useForemanFilterStore(useShallow((state) => state.filter));

  const disableClearButtonCondition =
    filter.boil === "" &&
    filter.marking === "" &&
    filter.conveyor === "" &&
    filter.productCode === "" &&
    filter.states.length === 0;

  const clearButtonProps: FilterButtonProps = {
    label: "Сбросить",
    disabled: disableClearButtonCondition,
    startDecorator: <DeleteOutlineIcon />,
    onClick: () => clearFilter(),
  };

  return <FilterButton {...clearButtonProps} />;
}
