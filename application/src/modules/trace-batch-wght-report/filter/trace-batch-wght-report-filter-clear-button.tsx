import { useShallow } from "zustand/shallow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";
import { getTomorrowDate } from "../../../shared/helpers/date-time-formatters";
import { useTraceBatchWghtReportFilterStore } from "../store/use-trace-batch-wght-report-filter-store";

export default function TraceBatchWghtReportFilterClearButton() {
  const clearFilter = useTraceBatchWghtReportFilterStore(useShallow((state) => state.clearFilter));
  const filter = useTraceBatchWghtReportFilterStore(useShallow((state) => state.filter));

  const disableDocumentFilterClearButton =
    filter.batchDate === getTomorrowDate() &&
    filter.batchName === "" &&
    filter.productId === "" &&
    filter.plants.length === 0 &&
    filter.compare;

  const clearButtonProps: FilterButtonProps = {
    label: "Сбросить",
    disabled: disableDocumentFilterClearButton,
    startDecorator: <DeleteOutlineIcon />,
    onClick: () => clearFilter(),
  };

  return <FilterButton {...clearButtonProps} />;
}
