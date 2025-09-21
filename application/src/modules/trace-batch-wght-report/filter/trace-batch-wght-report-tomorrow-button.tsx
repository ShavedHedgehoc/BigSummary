import { useShallow } from "zustand/shallow";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";
import { getTomorrowDate } from "../../../shared/helpers/date-time-formatters";
import { useTraceBatchWghtReportFilterStore } from "../store/use-trace-batch-wght-report-filter-store";

export default function TraceBatchWghtReportFilterTomorrowButton() {
  const setDayToTomorrow = useTraceBatchWghtReportFilterStore(useShallow((state) => state.setDayToTomorrow));
  const filter = useTraceBatchWghtReportFilterStore(useShallow((state) => state.filter));

  const disableDocumentFilterTodayButton = filter.batchDate === getTomorrowDate();

  const clearButtonProps: FilterButtonProps = {
    label: "Завтра",
    disabled: disableDocumentFilterTodayButton,
    startDecorator: <CalendarMonthOutlinedIcon />,
    onClick: () => setDayToTomorrow(),
  };

  return <FilterButton {...clearButtonProps} />;
}
