import { useShallow } from "zustand/shallow";
import { useDocumentsFilterStore } from "./store/use-documents-filter-store";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FilterButton, { FilterButtonProps } from "../../shared/ui/filter-button";
import { getCurrentDay } from "../../shared/helpers/date-time-formatters";

export default function DocumentsFilterTodayButton() {
  const setDayToToday = useDocumentsFilterStore(useShallow((state) => state.setDayToToday));
  const filter = useDocumentsFilterStore(useShallow((state) => state.filter));

  const disableDocumentFilterTodayButton =
    filter.startDate === getCurrentDay().toJSON().slice(0, 10) &&
    filter.endDate === getCurrentDay().toJSON().slice(0, 10);

  const clearButtonProps: FilterButtonProps = {
    label: "Сегодня",

    disabled: disableDocumentFilterTodayButton,
    startDecorator: <CalendarMonthOutlinedIcon />,
    onClick: () => setDayToToday(),
  };

  return <FilterButton {...clearButtonProps} />;
}
