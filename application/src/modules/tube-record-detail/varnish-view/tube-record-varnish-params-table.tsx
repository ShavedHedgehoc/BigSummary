import { Stack, Typography } from "@mui/joy";
import { TubeRecordDetailDataVarnishParam } from "../../../shared/api/services/tube-records-service";
import TableFullHeightLayout from "../../../shared/layouts/table-full-height-layout";
import TubeRecordsDetailVarnishParamsRow from "./tube-record-detail-varnish-row";

export default function TubeRecordDetailVarnishParamsTable({
  paramsData,
}: {
  paramsData: TubeRecordDetailDataVarnishParam[] | [];
}) {
  const commonThead: TheadFullHeightProperties[] = [
    { width: 10, value: "№", align: "center", padding: "12px 24px" },
    { width: 120, value: "Дата", align: "center", padding: "12px 24px" },
    { width: 120, value: "Время", align: "center", padding: "12px 24px" },
    { width: 200, value: "Оператор" },
    { width: 120, value: "Показания счетчика", align: "center", padding: "12px 24px" },
    { width: 120, value: "Скорость лаковой машины", align: "center", padding: "12px 24px" },
    { width: 120, value: "Давление воздуха общее", align: "center", padding: "12px 24px" },
    { width: 120, value: "Давление воздуха в загрузочной емкости", align: "center", padding: "12px 24px" },
    { width: 120, value: "Давление воздуха на регуляторах форсунок", align: "center", padding: "12px 24px" },
    { width: 120, value: "Скорость ячеек", align: "center", padding: "12px 24px" },
    { width: 120, value: "Впрыск A,B начальное положение", align: "center", padding: "12px 24px" },
    { width: 120, value: "Впрыск C,D начальное положение", align: "center", padding: "12px 24px" },
    { width: 120, value: "Впрыск A,B конечное положение", align: "center", padding: "12px 24px" },
    { width: 120, value: "Впрыск C,D конечное положение", align: "center", padding: "12px 24px" },
    { width: 120, value: "Вдув тубы начальное положение", align: "center", padding: "12px 24px" },
    { width: 120, value: "Вдув тубы конечное положение", align: "center", padding: "12px 24px" },
    { width: 120, value: "Температура печи полимеризации", align: "center", padding: "12px 24px" },
    { width: 120, value: "Пористость вн. лакового покрытия", align: "center", padding: "12px 24px" },
    { width: 120, value: "Внутренний вид тубы в разрезе", align: "center", padding: "12px 24px" },
    { width: 120, value: "Отсутствие просветов алюминия", align: "center", padding: "12px 24px" },
    { width: 120, value: "Отсутствие непрокрасов и пятен", align: "center", padding: "12px 24px" },
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
            <TubeRecordsDetailVarnishParamsRow row={row} key={row.id} index={index} />
          ))}
        </TableFullHeightLayout>
      )}
    </Stack>
  );
}
