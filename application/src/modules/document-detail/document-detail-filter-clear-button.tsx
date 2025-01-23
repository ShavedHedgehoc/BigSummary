import { useShallow } from "zustand/shallow";
import { useDocumentDetailFilterStore } from "./store/use-document-detail-filter-store";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterButton, { FilterButtonProps } from "../../shared/ui/filter-button";

export default function DocumentDetailFilterClearButton() {
  const clearFilter = useDocumentDetailFilterStore(useShallow((state) => state.clearFilter));
  const filter = useDocumentDetailFilterStore(useShallow((state) => state.filter));

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
