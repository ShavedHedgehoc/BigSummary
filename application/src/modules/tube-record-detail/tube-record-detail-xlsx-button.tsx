import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import { useTubeRecordDetail } from "./use-tube-record-detail";
import FilterButton, { FilterButtonProps } from "../../shared/ui/filter-button";
import makeXLSXFile from "./make-xlsx";

export default function TubeRecordDetailXLSXButton({ summary_id }: { summary_id: string | undefined }) {
  const { data } = useTubeRecordDetail(summary_id);

  const handleClick = () => {
    if (data) {
      makeXLSXFile(data);
    }
  };

  const disableButtonCondition = !data;

  const xlsxButtonProps: FilterButtonProps = {
    label: "Скачать",
    disabled: disableButtonCondition,
    startDecorator: <FileDownloadOutlinedIcon />,
    onClick: () => handleClick(),
  };

  return <FilterButton {...xlsxButtonProps} />;
}
