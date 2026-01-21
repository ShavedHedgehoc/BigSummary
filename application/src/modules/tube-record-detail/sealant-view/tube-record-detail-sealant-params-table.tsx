import { Stack, Typography } from "@mui/joy";
import { TubeRecordDetailDataSealantParam } from "../../../shared/api/services/tube-records-service";
import TableFullHeightLayout from "../../../shared/layouts/table-full-height-layout";
import TubeRecordsDetailSealantParamsRow from "./tube-records-detail-sealant-params-row";

export default function TubeRecordDetailSealantParamsTable({
  paramsData,
}: {
  paramsData: TubeRecordDetailDataSealantParam[] | [];
}) {
  const commonThead: TheadFullHeightProperties[] = [
    { width: 10, value: "№", align: "center", padding: "12px 24px" },
    { width: 120, value: "Дата", align: "center", padding: "12px 24px" },
    { width: 120, value: "Время", align: "center", padding: "12px 24px" },
    { width: 200, value: "Оператор" },
    { width: 120, value: "Показания счетчика", align: "center", padding: "12px 24px" },
    { width: 120, value: "Скорость колпачковой машины", align: "center", padding: "12px 24px" },
    { width: 120, value: "Давление воздуха общее", align: "center", padding: "12px 24px" },
    { width: 120, value: "Захваты вперед", align: "center", padding: "12px 24px" },
    { width: 120, value: "Открытие захваты (лев)", align: "center", padding: "12px 24px" },
    { width: 120, value: "Открытие захваты (прав)", align: "center", padding: "12px 24px" },
    { width: 120, value: "Закрытие захвата", align: "center", padding: "12px 24px" },
    { width: 120, value: "Начало впрыска А,B", align: "center", padding: "12px 24px" },
    { width: 120, value: "Конец впрыска А,B", align: "center", padding: "12px 24px" },
    { width: 120, value: "Положение тубы для впрыска (начало)", align: "center", padding: "12px 24px" },
    { width: 120, value: "Положение тубы для впрыска (конец)", align: "center", padding: "12px 24px" },
    { width: 120, value: "Поверхность колпачка гладкая, без царапин", align: "center", padding: "12px 24px" },
    { width: 120, value: "Отступ латексного кольца от края тубы", align: "center", padding: "12px 24px" },
    { width: 120, value: "Ширина латексного кольца", align: "center", padding: "12px 24px" },
    { width: 120, value: "Жесткость готовой тубы", align: "center", padding: "12px 24px" },
    { width: 120, value: "Измерение крутящего момента откручивания колпачка", align: "center", padding: "12px 24px" },
    { width: 120, value: "Материалы", align: "center", padding: "12px 24px" },
  ];
  return (
    <Stack gap={2}>
      <Typography level="h4">Параметры</Typography>
      {paramsData.length === 0 ? (
        <Typography>Записей не найдено</Typography>
      ) : (
        <TableFullHeightLayout thead={commonThead}>
          {paramsData.map((row, index) => (
            <TubeRecordsDetailSealantParamsRow row={row} key={row.id} index={index} />
          ))}
        </TableFullHeightLayout>
      )}
    </Stack>
  );
}
