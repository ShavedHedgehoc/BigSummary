import { useShallow } from "zustand/react/shallow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";

import { expDaysValues, useInventoryDetailFilterStore } from "../store/inventory-detail-filter-store";

export default function InventoryDetailFilterClearButton() {
  const clearFilter = useInventoryDetailFilterStore(useShallow((state) => state.clearFilter));
  const filter = useInventoryDetailFilterStore(useShallow((state) => state.filter));

  const disableInventoriesDetailFilterClearButton =
    filter.productCode === "" && filter.dayToExpire === expDaysValues[0] && !filter.toFilter;

  const clearButtonProps: FilterButtonProps = {
    label: "Сбросить",
    disabled: disableInventoriesDetailFilterClearButton,
    startDecorator: <DeleteOutlineIcon />,
    onClick: () => clearFilter(),
  };

  return <FilterButton {...clearButtonProps} />;
}
