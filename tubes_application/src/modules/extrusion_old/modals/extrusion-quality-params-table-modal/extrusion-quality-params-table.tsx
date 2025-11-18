import Loader from "@/shared/components/loader";
import { Table } from "@chakra-ui/react";
import { formatDateToString, formatTimeToString } from "@/shared/helpers/date-time-formatters";
import { useExtrusionQualityAllParams } from "../../hooks/use-extrusion-quality-all-params";

export default function ExtrusionQualityParamsTable({ summary_id }: { summary_id: number | undefined }) {
  const { isPending, data, isSuccess } = useExtrusionQualityAllParams(summary_id ?? null);
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
            <Table.ColumnHeader textAlign="center">Длина цилиндрической части тубы, мм</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Толщина мембраны, мм</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Диаметр тубы, мм</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Толщина цилиндрической части тубы, мм</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Жесткость тубы, мм</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Качество обрезки тубы</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Герметичность</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Внешняя резьба</Table.ColumnHeader>
            <Table.ColumnHeader>Сотрудник</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {isSuccess &&
            data.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell textAlign="center">{formatDateToString(item.createdAt)}</Table.Cell>
                <Table.Cell textAlign="center">{formatTimeToString(item.createdAt)}</Table.Cell>
                <Table.Cell textAlign="center">{item.tube_cilindrical_section_length}</Table.Cell>
                <Table.Cell textAlign="center">{item.membrane_thickness}</Table.Cell>
                <Table.Cell textAlign="center">{item.tube_diameter}</Table.Cell>
                <Table.Cell textAlign="center">{item.tube_cilindrical_section_thickness}</Table.Cell>
                <Table.Cell textAlign="center">{item.tube_rigidity}</Table.Cell>
                <Table.Cell textAlign="center">{item.tube_cutting_quality ? "OK" : "NOK"}</Table.Cell>
                <Table.Cell textAlign="center">{item.tightness ? "OK" : "NOK"}</Table.Cell>
                <Table.Cell textAlign="center">{item.external_thread_quality ? "OK" : "NOK"}</Table.Cell>
                <Table.Cell>{item.laboratory_assistant.name}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}
