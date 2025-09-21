import { useShallow } from "zustand/shallow";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";
import { getCurrentDay } from "../../../shared/helpers/date-time-formatters";
import { useTraceBatchWghtReportFilterStore } from "../store/use-trace-batch-wght-report-filter-store";

export default function TraceBatchWghtReportFilterTodayButton() {
  const setDayToToday = useTraceBatchWghtReportFilterStore(useShallow((state) => state.setDayToToday));
  const filter = useTraceBatchWghtReportFilterStore(useShallow((state) => state.filter));

  const disableDocumentFilterTodayButton = filter.batchDate === getCurrentDay().toJSON().slice(0, 10);

  const clearButtonProps: FilterButtonProps = {
    label: "Сегодня",
    disabled: disableDocumentFilterTodayButton,
    startDecorator: <CalendarMonthOutlinedIcon />,
    onClick: () => setDayToToday(),
  };

  return <FilterButton {...clearButtonProps} />;
}
