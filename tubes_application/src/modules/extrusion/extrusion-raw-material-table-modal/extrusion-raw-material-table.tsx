import { useRawMaterialsList } from "../use-raw-materials-list";
import type { GetSummaryRawMaterialCurrentDto } from "@/shared/api/services/summary-raw-materials-current-service";
import Loader from "@/shared/components/loader";
import { Table } from "@chakra-ui/react";
import { formatTimeToString } from "@/shared/helpers/date-time-formatters";

export default function ExtrusionRawMaterialTable({ summary_id }: { summary_id: number | undefined }) {
  const dto: GetSummaryRawMaterialCurrentDto | null = summary_id
    ? {
        summary_id: summary_id,
        post_id: 1,
        page: 1,
        limit: 10,
      }
    : null;
  const { isPending, data, isSuccess } = useRawMaterialsList(dto);
  if (isPending) {
    return <Loader />;
  }
  return (
    <Table.ScrollArea borderWidth="1px" rounded="md" height="900px">
      <Table.Root size="lg" stickyHeader variant="outline">
        <Table.Header>
          <Table.Row bg="bg.subtle">
            <Table.ColumnHeader>Время</Table.ColumnHeader>
            <Table.ColumnHeader>Код 1С</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="start">Наименование</Table.ColumnHeader>
            <Table.ColumnHeader>Партия</Table.ColumnHeader>
            <Table.ColumnHeader>Сотрудник</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {isSuccess &&
            data.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{formatTimeToString(item.createdAt)}</Table.Cell>
                <Table.Cell>{item.raw_material.code}</Table.Cell>
                <Table.Cell textAlign="start">{item.raw_material.name}</Table.Cell>
                <Table.Cell>{item.lot}</Table.Cell>
                <Table.Cell>{item.employee.name}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}
