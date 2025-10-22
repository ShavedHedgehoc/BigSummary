import { useShallow } from "zustand/shallow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";
import { getCurrentDay } from "../../../shared/helpers/date-time-formatters";
import { useTraceBatchWeightingsSummaryFilterStore } from "../store/use-trace-batch-weightings-summary-filter-store";

export default function TraceBatchWeightingsSummaryFilterClearButton() {
  const clearFilter = useTraceBatchWeightingsSummaryFilterStore(useShallow((state) => state.clearFilter));
  const filter = useTraceBatchWeightingsSummaryFilterStore(useShallow((state) => state.filter));

  const disableDocumentFilterClearButton =
    filter.startDate === getCurrentDay().toJSON().slice(0, 10) &&
    filter.endDate === getCurrentDay().toJSON().slice(0, 10) &&
    filter.author === "" &&
    filter.plants.length === 0;

  const clearButtonProps: FilterButtonProps = {
    label: "Сбросить",
    disabled: disableDocumentFilterClearButton,
    startDecorator: <DeleteOutlineIcon />,
    onClick: () => clearFilter(),
  };

  return <FilterButton {...clearButtonProps} />;
}
