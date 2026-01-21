import { Stack, Typography } from "@mui/joy";
import TubeRecordsDetailOperationRow from "./tube-record-detail-operation-row";
import { TubeRecordDetailOperation } from "../../../shared/api/services/tube-records-service";
import TableFullHeightLayout from "../../../shared/layouts/table-full-height-layout";

export default function TubeRecordDetailOperationsTable({
  operationsData,
}: {
  operationsData: TubeRecordDetailOperation[] | [];
}) {
  const commonThead: TheadFullHeightProperties[] = [
    { width: 10, value: "№", align: "center", padding: "12px 24px" },
    { width: 40, value: "Дата", align: "center", padding: "12px 24px" },
    { width: 40, value: "Время", align: "center", padding: "12px 24px" },
    { width: 40, value: "Код операции", padding: "12px 24px" },
    { width: 200, value: "Операция", align: "left", padding: "12px 24px" },
    { width: 100, value: "Длительность", align: "center", padding: "12px 24px" },
    { width: 80, value: "Оператор", align: "left", padding: "12px 24px" },
  ];
  return (
    <Stack gap={2}>
      <Typography level="h4">Отчет оператора</Typography>
      {operationsData.length === 0 ? (
        <Typography>Записей не найдено</Typography>
      ) : (
        <TableFullHeightLayout thead={commonThead}>
          {operationsData.map((row, index) => (
            <TubeRecordsDetailOperationRow row={row} key={row.id} index={index} />
          ))}
        </TableFullHeightLayout>
      )}
    </Stack>
  );
}
