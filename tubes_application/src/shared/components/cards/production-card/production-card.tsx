import type { ISummary } from "@/shared/api/services/summary-service";
import { Box, DataList, HStack, Stack, Text } from "@chakra-ui/react";
import InputTimer from "./input-timer";
import { CheckIntervals } from "@/shared/helpers/check-intervals";
import useProductionCardData from "./use-production-card-data";
import { formatTimeToString } from "@/shared/helpers/date-time-formatters";

export default function ProductionCard({ summaryData, postId }: { summaryData: ISummary | null; postId: number }) {
  const { note, production, lastCheckDate, operationStatus, idleTime, today } = useProductionCardData(
    postId,
    summaryData
  );
  const locale = "ru";

  const inputTimer =
    operationStatus &&
    {
      idle: (
        <Stack>
          <Text color="fg.a" textStyle="lg" animation="colorCycle">
            {operationStatus.operation_description}
          </Text>
          <Text color="fg.a" textStyle="sm">
            {`Время начала: ${formatTimeToString(operationStatus.createdAt)}`}
          </Text>
          <Text color="fg.a" textStyle="sm">
            {`Длительность:  ${new Date(
              new Date(today).getTime() - new Date(operationStatus.createdAt).getTime() - 3 * 3600 * 1000
            ).toLocaleTimeString(locale, {
              hour: "numeric",
              hour12: false,
              minute: "numeric",
              second: "numeric",
            })}`}
          </Text>
        </Stack>
      ),
      working: <InputTimer checkInterval={CheckIntervals.HARDWARE} date={lastCheckDate} idleTime={idleTime} />,
      finished: (
        <Stack>
          <Text color="fg.a" textStyle="xl" animation="colorCycle">
            Работа поста закончена
          </Text>
          <Text color="fg.a" textStyle="sm">
            {`Время окончания: ${formatTimeToString(operationStatus.createdAt)}`}
          </Text>
        </Stack>
      ),
    }[operationStatus.state];

  if (!summaryData?.extrusionTresholds && postId === 1) return;
  if (summaryData && !summaryData.varnishTresholds && postId === 2) return;
  if (!summaryData?.offsetTresholds && postId === 3) return;
  if (!summaryData?.sealantTresholds && postId === 4) return;

  return (
    <Box backgroundColor="bg.panel" w="full" h="full" rounded="lg" p={8} alignItems="center" justifyContent="center">
      <Stack justify="space-between" h="full" w="full">
        <Stack gap="4">
          <DataList.Root size="lg">
            <DataList.Item>
              <DataList.ItemLabel>Продукт</DataList.ItemLabel>
              <DataList.ItemValue>{`${summaryData?.data.product_code} ${summaryData?.data.product_name}`}</DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>
          <HStack gap={6}>
            <DataList.Root size="lg">
              <DataList.Item alignItems={"center"}>
                <DataList.ItemLabel>Смена</DataList.ItemLabel>
                <DataList.ItemValue>{`${summaryData?.data.shift}`}</DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
            <DataList.Root size="lg">
              <DataList.Item alignItems={"center"}>
                <DataList.ItemLabel>Партия</DataList.ItemLabel>
                <DataList.ItemValue>{`${summaryData?.data.batch_name}`}</DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
            <DataList.Root size="lg">
              <DataList.Item alignItems={"center"}>
                <DataList.ItemLabel>План</DataList.ItemLabel>
                <DataList.ItemValue>{`${summaryData?.data.plan}`}</DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
          </HStack>
          <DataList.Root size="lg">
            <DataList.Item>
              <DataList.ItemLabel>{note.header}</DataList.ItemLabel>
              <DataList.ItemLabel>{note.note}</DataList.ItemLabel>
            </DataList.Item>
          </DataList.Root>
        </Stack>

        <HStack justify={"space-between"}>
          {inputTimer}
          <HStack justify="end" alignItems="end" h="full">
            <Text color="fg.subtle" textStyle="md">
              Выработка поста:
            </Text>
            <Text color="fg.a" textStyle="2xl">
              {production}
            </Text>
          </HStack>
        </HStack>
      </Stack>
    </Box>
  );
}
