import {
  TubeExtrusionTresholdResponse,
  TubeOffsetTresholdResponse,
  TubeSealantTresholdResponse,
  TubeVarnishTresholdResponse,
} from "../../shared/api/services/tube-tresholds-service";
import TableLoaderComponent from "../../shared/components/table-loader";
import TableNotFoundComponent from "../../shared/components/table-not-found";
import TableLayout from "../../shared/layouts/table-layout";
import TubeTresholdsRow from "./tube-tresholds-row";

const commonThead: TheadProperties[] = [
  { width: 30, value: "" },
  { width: 64, value: "Код 1С" },
  { width: 80, value: "Артикул", align: "left" },
  { width: 120, value: "Наименование", align: "left" },
  { width: 64, value: "Конвейер" },
  { width: 50, value: "Записей" },
  { width: 80, value: "Действия" },
];

export default function TubeTresholdsTable({
  data,
  isPending,
  isSuccess,
}: {
  data:
    | TubeExtrusionTresholdResponse
    | TubeVarnishTresholdResponse
    | TubeOffsetTresholdResponse
    | TubeSealantTresholdResponse
    | undefined;
  isPending: boolean;
  isSuccess: boolean;
}) {
  if (isPending) {
    return <TableLoaderComponent />;
  }

  if (isSuccess && data && data.total === 0) {
    return <TableNotFoundComponent />;
  }

  return (
    <TableLayout thead={commonThead}>
      {isSuccess &&
        data &&
        data.rows.map((row) => <TubeTresholdsRow row={row} key={`row_${row.conveyor_id}_${row.product_id}`} />)}
    </TableLayout>
  );
}
