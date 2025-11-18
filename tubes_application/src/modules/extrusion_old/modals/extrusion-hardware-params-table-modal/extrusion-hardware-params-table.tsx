import Loader from "@/shared/components/loader";
import { Table } from "@chakra-ui/react";
import { formatDateToString, formatTimeToString } from "@/shared/helpers/date-time-formatters";
import { useExtrusionHardwareAllParams } from "../../hooks/use-extrusion-hardware-all-params";
import { useExtrusionHardwareTresholds } from "../../hooks/use-extrusion-hardware-tresholds";

export default function ExtrusionHardwareParamsTable({ summary_id }: { summary_id: number | undefined }) {
  const { data: tresholdsData } = useExtrusionHardwareTresholds(summary_id ?? null);
  const { isPending, data, isSuccess } = useExtrusionHardwareAllParams(summary_id ?? null);
  if (isPending) {
    return <Loader />;
  }
  return (
    <Table.ScrollArea borderWidth="1px" rounded="md" height="900px">
      <Table.Root size="lg" stickyHeader variant="outline">
        <Table.Header>
          <Table.Row bg="bg.subtle">
            <Table.ColumnHeader textAlign="center">Дата</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Время</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Счетчик</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Скорость пресса, шт/мин</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Время выдува, мс</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Скорость токарного автомата, шт/мин</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Температура печи отжига, С</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Тип рондоли</Table.ColumnHeader>
            <Table.ColumnHeader>Сотрудник</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isSuccess &&
            data.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell textAlign="center">{formatDateToString(item.createdAt)}</Table.Cell>
                <Table.Cell textAlign="center">{formatTimeToString(item.createdAt)}</Table.Cell>
                <Table.Cell textAlign="center">{item.counter_value}</Table.Cell>
                <Table.Cell
                  textAlign="center"
                  color={
                    (tresholdsData && item.press_speed > tresholdsData?.press_speed_max) ||
                    (tresholdsData && item.press_speed < tresholdsData?.press_speed_min)
                      ? "red"
                      : "green"
                  }
                >
                  {item.press_speed}
                </Table.Cell>
                <Table.Cell textAlign="center">{item.blow_time}</Table.Cell>
                <Table.Cell textAlign="center">{item.turning_machine_speed}</Table.Cell>
                <Table.Cell textAlign="center">{item.annealing_furnace_temp}</Table.Cell>
                <Table.Cell textAlign="center">{item.rondel_type.value}</Table.Cell>
                <Table.Cell>{item.employee.name}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}
