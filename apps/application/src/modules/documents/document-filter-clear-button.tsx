import { useShallow } from "zustand/react/shallow";
import { useDocumentsFilterStore } from "./store/use-documents-filter-store";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterButton, { FilterButtonProps } from "../../shared/ui/filter-button";
import { getFirstDayOfCurrentMonth, getLastDayOfCurrentMonth } from "../../shared/helpers/date-time-formatters";

export default function DocumentsFilterClearButton() {
  const clearFilter = useDocumentsFilterStore(useShallow((state) => state.clearFilter));
  const filter = useDocumentsFilterStore(useShallow((state) => state.filter));

  const disableDocumentFilterClearButton =
    filter.startDate === getFirstDayOfCurrentMonth().toJSON().slice(0, 10) &&
    filter.endDate === getLastDayOfCurrentMonth().toJSON().slice(0, 10) &&
    filter.plants.length === 0;

  const clearButtonProps: FilterButtonProps = {
    label: "Сбросить",
    disabled: disableDocumentFilterClearButton,
    startDecorator: <DeleteOutlineIcon />,
    onClick: () => clearFilter(),
  };

  return <FilterButton {...clearButtonProps} />;
}
