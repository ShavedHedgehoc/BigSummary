import { Stack, Typography } from "@mui/joy";
import { TubeRecordDetailDataExtrusionParam } from "../../../shared/api/services/tube-records-service";
import TableFullHeightLayout from "../../../shared/layouts/table-full-height-layout";
import TubeRecordsDetailExtrusionParamsRow from "./tube-records-detail-extrusion-params-row";

export default function TubeRecordDetailExtrusionParamsTable({
  paramsData,
}: {
  paramsData: TubeRecordDetailDataExtrusionParam[] | [];
}) {
  const commonThead: TheadFullHeightProperties[] = [
    { width: 10, value: "№", align: "center", padding: "12px 24px" },
    { width: 40, value: "Дата", align: "center", padding: "12px 24px" },
    { width: 40, value: "Время", align: "center", padding: "12px 24px" },
    { width: 100, value: "Оператор" },
    { width: 40, value: "Показания счетчика", rotate: true },
    { width: 40, value: "Скорость пресса", rotate: true },
    { width: 40, value: "Время выдува", rotate: true },
    { width: 40, value: "Скорость токарного автомата", rotate: true },
    { width: 40, value: "Температура печи отжига", rotate: true },
    { width: 40, value: "Тип рондоли", rotate: true },
    { width: 40, value: "Длина цилиндрической части тубы", rotate: true },
    { width: 40, value: "Толщина мембраны", rotate: true },
    { width: 40, value: "Диаметр тубы", rotate: true },
    { width: 40, value: "Толщина цилиндрической части тубы", rotate: true },
    { width: 40, value: "Жесткость тубы", rotate: true },
    { width: 40, value: "Качество обрезки тубы", rotate: true },
    { width: 40, value: "Герметичнось", rotate: true },
    { width: 40, value: "Внешняя резьба", rotate: true },
    { width: 40, value: "Материалы", rotate: true, padding: "12px 24px" },
  ];
  return (
    <Stack gap={2}>
      <Typography level="h4">Параметры</Typography>
      {paramsData.length === 0 ? (
        <Typography>Записей не найдено</Typography>
      ) : (
        <TableFullHeightLayout thead={commonThead}>
          {paramsData.map((row, index) => (
            <TubeRecordsDetailExtrusionParamsRow row={row} key={row.id} index={index} />
          ))}
        </TableFullHeightLayout>
      )}
    </Stack>
  );
}
