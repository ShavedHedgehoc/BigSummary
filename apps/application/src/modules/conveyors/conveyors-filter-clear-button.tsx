import { useShallow } from "zustand/react/shallow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterButton, { FilterButtonProps } from "../../shared/ui/filter-button";
import { useConveyorsFilterStore } from "./store/use-conveyors-filter-store";

export default function ConveyorsFilterClearButton() {
  const clearFilter = useConveyorsFilterStore(useShallow((state) => state.clearFilter));
  const filter = useConveyorsFilterStore(useShallow((state) => state.filter));

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
