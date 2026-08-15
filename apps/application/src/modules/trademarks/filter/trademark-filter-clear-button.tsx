import { useShallow } from "zustand/react/shallow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";
import { useTrademarksFilterStore } from "../store/use-trademarks-filter-store";

export default function TrademarkFilterClearButton() {
  const clearFilter = useTrademarksFilterStore(useShallow((state) => state.clearFilter));
  const filter = useTrademarksFilterStore(useShallow((state) => state.filter));

  const disableDocumentFilterClearButton =
    filter.product_code === "" && filter.product_name === "" && filter.trademark === "";
  const clearButtonProps: FilterButtonProps = {
    label: "Сбросить",
    disabled: disableDocumentFilterClearButton,
    startDecorator: <DeleteOutlineIcon />,
    onClick: () => clearFilter(),
  };

  return <FilterButton {...clearButtonProps} />;
}
