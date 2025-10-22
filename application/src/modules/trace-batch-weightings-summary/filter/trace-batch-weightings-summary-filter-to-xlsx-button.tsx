import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";
import makeXLSXFile from "../make-xlsx";

import { useShallow } from "zustand/shallow";
import { useTraceBatchWeightingsSummaryFilterStore } from "../store/use-trace-batch-weightings-summary-filter-store";
import { useTraceBatchWeightingsSummary } from "../use-trace-batch-weightings-summary";

export default function TraceBatchWeightingsSummaryFilterToXLSXButton() {
  const filter = useTraceBatchWeightingsSummaryFilterStore(useShallow((state) => state.filter));
  const plantSelectorOption = useTraceBatchWeightingsSummaryFilterStore(
    useShallow((state) => state.plantSelectorOptions)
  );
  const selectedPlant = useTraceBatchWeightingsSummaryFilterStore(useShallow((state) => state.selectedPlant));
  const { data } = useTraceBatchWeightingsSummary({ filter: filter });

  const handleClick = () => {
    if (data && data.length && selectedPlant && plantSelectorOption) {
      const plantName = plantSelectorOption.filter((x) => x.abb[0] === selectedPlant)[0].value;
      const title = `Отчет_по_выработке_${plantName}_${filter.startDate}_${filter.endDate}`;
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
