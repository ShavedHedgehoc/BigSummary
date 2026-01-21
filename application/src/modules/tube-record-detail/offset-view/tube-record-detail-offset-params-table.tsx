import { Stack, Typography } from "@mui/joy";
import { TubeRecordDetailDataOffsetParam } from "../../../shared/api/services/tube-records-service";
import TableFullHeightLayout from "../../../shared/layouts/table-full-height-layout";
import TubeRecordsDetailOffsetParamsRow from "./tube-records-detail-offset-params-row";

export default function TubeRecordDetailOffsetParamsTable({
  paramsData,
}: {
  paramsData: TubeRecordDetailDataOffsetParam[] | [];
}) {
  const commonThead: TheadFullHeightProperties[] = [
    { width: 10, value: "№", align: "center", padding: "12px 24px" },
    { width: 120, value: "Дата", align: "center", padding: "12px 24px" },
    { width: 120, value: "Время", align: "center", padding: "12px 24px" },
    { width: 200, value: "Оператор" },
    { width: 120, value: "Показания счетчика", align: "center", padding: "12px 24px" },

    { width: 120, value: "Скорость принтовальной машины", align: "center", padding: "12px 24px" },
    { width: 120, value: "Давление воздуха общее", align: "center", padding: "12px 24px" },
    { width: 120, value: "Температура печи (грунтование)", align: "center", padding: "12px 24px" },
    { width: 120, value: "Температура печи (печать)", align: "center", padding: "12px 24px" },
    { width: 120, value: "Мотор принтера", align: "center", padding: "12px 24px" },
    { width: 120, value: "Мотор держателей баз. покрытий", align: "center", padding: "12px 24px" },
    { width: 120, value: "1 печатный ящик (отпечатков)", align: "center", padding: "12px 24px" },
    { width: 120, value: "2 печатный ящик (отпечатков)", align: "center", padding: "12px 24px" },
    { width: 120, value: "3 печатный ящик (отпечатков)", align: "center", padding: "12px 24px" },
    { width: 120, value: "4 печатный ящик (отпечатков)", align: "center", padding: "12px 24px" },
    { width: 120, value: "5 печатный ящик (отпечатков)", align: "center", padding: "12px 24px" },
    { width: 120, value: "6 печатный ящик (отпечатков)", align: "center", padding: "12px 24px" },

    { width: 120, value: "Мотор станции баз. покрытия", align: "center", padding: "12px 24px" },
    { width: 120, value: "Время подачи чернил", align: "center", padding: "12px 24px" },
    { width: 120, value: "Соответсвие дизайну и контрольному образцу", align: "center", padding: "12px 24px" },
    {
      width: 120,
      value: "Внешний вид тубы (разнотон, нечеткий текст, двоение печати)",
      align: "center",
      padding: "12px 24px",
    },
    { width: 120, value: "Отсутствие деформации края тубы", align: "center", padding: "12px 24px" },
    { width: 120, value: "Отсутствие просветов алюминия", align: "center", padding: "12px 24px" },
    { width: 120, value: "Отсутствие марашек", align: "center", padding: "12px 24px" },
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
            <TubeRecordsDetailOffsetParamsRow row={row} key={row.id} index={index} />
          ))}
        </TableFullHeightLayout>
      )}
    </Stack>
  );
}
