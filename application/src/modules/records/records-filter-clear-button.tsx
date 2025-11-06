import { useShallow } from "zustand/react/shallow";
import { useRecordsFilterStore } from "./store/use-record-filter-store";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterButton, { FilterButtonProps } from "../../shared/ui/filter-button";

export default function RecordsFilterClearButton() {
  const clearFilter = useRecordsFilterStore(useShallow((state) => state.clearFilter));
  const filter = useRecordsFilterStore(useShallow((state) => state.filter));

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
