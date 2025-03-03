import { useShallow } from "zustand/shallow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterButton, { FilterButtonProps } from "../../shared/ui/filter-button";
import { useCansListFilterStore } from "./store/use-cans-list-filter-store";

export default function CansListFilterClearButton() {
  const clearFilter = useCansListFilterStore(useShallow((state) => state.clearFilter));
  const filter = useCansListFilterStore(useShallow((state) => state.filter));

  const disableClearButtonCondition =
    filter.value === "" && filter.valueAsc === true && filter.onlyEmptyBarcode === false;

  const clearButtonProps: FilterButtonProps = {
    label: "Сбросить",
    disabled: disableClearButtonCondition,
    startDecorator: <DeleteOutlineIcon />,
    onClick: () => clearFilter(),
  };

  return <FilterButton {...clearButtonProps} />;
}
