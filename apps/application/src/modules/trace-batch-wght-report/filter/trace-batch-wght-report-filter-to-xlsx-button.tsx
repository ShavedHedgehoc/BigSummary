import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";
import { useShallow } from "zustand/react/shallow";
import { useTraceBatchWghtReportFilterStore } from "../store/use-trace-batch-wght-report-filter-store";
import { useTraceBatchWghtReport } from "../use-trace-batch-wght-report";
import { useTraceBatchWghtReportPaginationStore } from "../store/use-trace-batch-wght-report-pagination-store";
import makeXLSXFile from "../make-xlsx";

export default function TraceBatchWghtReportFilterToXlsxButton() {
  const filter = useTraceBatchWghtReportFilterStore(useShallow((state) => state.filter));
  const page = useTraceBatchWghtReportPaginationStore(useShallow((state) => state.page));
  const limit = useTraceBatchWghtReportPaginationStore(useShallow((state) => state.limit));
  const { data } = useTraceBatchWghtReport({ filter: filter, limit: limit, page: page });

  const handleClick = () => {
    if (data && data.rows.length) {
      const title = `Отчет_по_взвешиваниям_${filter.startDate}_${filter.endDate}`;
      makeXLSXFile(data.rows, title);
    }
  };

  const disableButtonCondition = !(data && data.rows.length);

  const clearButtonProps: FilterButtonProps = {
    label: "Скачать",
    disabled: disableButtonCondition,
    startDecorator: <FileDownloadOutlinedIcon />,
    onClick: () => handleClick(),
  };

  return <FilterButton {...clearButtonProps} />;
}
