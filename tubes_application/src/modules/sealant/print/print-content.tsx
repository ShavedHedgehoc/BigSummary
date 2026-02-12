import type { ISummary } from "@/shared/api/services/summary-service";
import { useProductionBoxes } from "../use-production-boxes";
import Loader from "@/shared/components/info/loader";
import { AppMessages } from "@/shared/resources/app-messages";
import { Box, Center, HStack, Icon, Stack, Table, Text, VStack } from "@chakra-ui/react";
import { formatDateToString, formatTimeToString } from "@/shared/helpers/date-time-formatters";
import type { IPrinter } from "@/shared/api/services/printer-service";
import { IoWarningOutline } from "react-icons/io5";

export default function PrintContent({
  summaryData,
  printerData,
}: {
  summaryData: ISummary | null;
  printerData: IPrinter | null;
}) {
  const { data, isPending, isSuccess } = useProductionBoxes(summaryData?.data.batch_id ?? null);
  if (isPending) return <Loader />;
  if (isSuccess && data && data.length === 0)
    return (
      <Box w="full" h="full">
        <Stack w="full" h="full" gap={6} align="center">
          <Center h="full" w="full">
            <VStack justify="center" h="full">
              <Icon size="2xl" color="tomato">
                <IoWarningOutline />
              </Icon>
              <Text color="fg.subtle">{AppMessages.RECORDS_NOT_FOUND}</Text>
            </VStack>
          </Center>

          <HStack w="3/4">
            <Text color="fg.subtle">Принтер: </Text>
            <Text animation={printerData ? "none" : "colorCycle"}>
              {printerData ? `${printerData.ip}:${printerData.port}` : "Не установлен"}
            </Text>
          </HStack>
        </Stack>
      </Box>
    );

  return (
    <Box w="full">
      <Center>
        <Stack w="3/4" gap={6}>
          <Table.ScrollArea height="600px">
            <Table.Root size="lg" variant="outline" color="fg.subtle">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader textAlign="center">№</Table.ColumnHeader>
                  <Table.ColumnHeader>UUID</Table.ColumnHeader>
                  <Table.ColumnHeader>Наименование</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center">Партия</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center">В коробе, шт</Table.ColumnHeader>
                  <Table.ColumnHeader>Сотрудник</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center">Дата</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center">Время</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {isSuccess &&
                  data &&
                  data.map((item) => (
                    <Table.Row
                      key={item.id}
                      animation={
                        new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 * 2
                          ? "colorCycleWhiteSubtle"
                          : ""
                      }
                    >
                      <Table.Cell textAlign="center">{item.box_number}</Table.Cell>
                      <Table.Cell>{item.uuid}</Table.Cell>
                      <Table.Cell>{item.summary.product.name}</Table.Cell>
                      <Table.Cell textAlign="center">{item.summary.batch.name}</Table.Cell>
                      <Table.Cell textAlign="center">{item.quantity}</Table.Cell>
                      <Table.Cell>{item.employee.name}</Table.Cell>
                      <Table.Cell textAlign="center">{formatDateToString(item.createdAt)}</Table.Cell>
                      <Table.Cell textAlign="center">{formatTimeToString(item.createdAt)}</Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
          <HStack justify="space-between" paddingTop={8}>
            <HStack>
              <Text color="fg.subtle">Принтер: </Text>
              <Text animation={printerData ? "none" : "colorCycle"}>
                {printerData ? `${printerData.ip}:${printerData.port}` : "Не установлен"}
              </Text>
            </HStack>
            <HStack gap={16}>
              <HStack>
                <Text color="fg.subtle">Произведено коробов: </Text>
                <Text>{data?.length}</Text>
              </HStack>
              <HStack>
                <Text color="fg.subtle">Произведено всего: </Text>
                <Text>{data?.reduce((acc, current) => acc + current.quantity, 0)}</Text>
              </HStack>
            </HStack>
          </HStack>
        </Stack>
      </Center>
    </Box>
  );
}
