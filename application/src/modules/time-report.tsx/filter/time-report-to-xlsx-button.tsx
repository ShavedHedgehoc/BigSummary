import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";
import makeXLSXFile from "../make-xlsx";
import { useTimeReportFilterStore } from "../store/use-time-report-filter-store";
import { useShallow } from "zustand/shallow";
import { useTimeReport } from "../use-time-report";

export default function TimeReportToXLSXButton() {
  const filter = useTimeReportFilterStore(useShallow((state) => state.filter));
  const plantSelectorOption = useTimeReportFilterStore(useShallow((state) => state.plantSelectorOptions));
  const selectedPlant = useTimeReportFilterStore(useShallow((state) => state.selectedPlant));
  const { data } = useTimeReport({ filter: filter });

  const handleClick = () => {
    if (data && data.length && selectedPlant && plantSelectorOption) {
      const plantName = plantSelectorOption.filter((x) => x.id === selectedPlant)[0].value;
      const title = `Отчет_по_сводке_${plantName}_${filter.date}`;
      makeXLSXFile(data, title);
    }
  };

  const disableButtonCondition = !(data && data.length);

  const clearButtonProps: FilterButtonProps = {
    label: "Скачать",
    disabled: disableButtonCondition,
    startDecorator: <FileDownloadOutlinedIcon />,
    onClick: () => handleClick(),
  };

  return <FilterButton {...clearButtonProps} />;
}
