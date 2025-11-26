import type { ISummary } from "@/shared/api/services/summary-service";
import { Box, DataList, HStack, Stack, Text } from "@chakra-ui/react";
import InputTimer from "./input-timer";
import { CheckIntervals } from "@/shared/helpers/check-intervals";
import useProductionCardData from "./use-production-card-data";

export default function ProductionCard({ summaryData, postId }: { summaryData: ISummary | null; postId: number }) {
  const { note, production, lastCheckDate, operationStatus } = useProductionCardData(postId, summaryData);
  const inputTimer =
    operationStatus &&
    {
      idle: (
        <Stack>
          <Text color="fg.a" textStyle="xl" animation="colorCycle">
            {operationStatus.operation_description}
          </Text>
        </Stack>
      ),
      working: <InputTimer checkInterval={CheckIntervals.HARDWARE} date={lastCheckDate} />,
      finished: (
        <Text color="fg.a" textStyle="xl" animation="colorCycle">
          Работа поста закончена
        </Text>
      ),
    }[operationStatus.state];
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
          <HStack>
            <DataList.Root size="lg">
              <DataList.Item>
                <DataList.ItemLabel>Партия</DataList.ItemLabel>
                <DataList.ItemValue>{`${summaryData?.data.batch_name}`}</DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
            <DataList.Root size="lg">
              <DataList.Item>
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
          {/* {operationStatus && operationStatus.idle ? (
            <Stack>
              <Text color="fg.a" textStyle="xl" animation="colorCycle">
                {operationStatus.operation_description}
              </Text>
            </Stack>
          ) : (
            <InputTimer checkInterval={CheckIntervals.HARDWARE} date={lastCheckDate} />
          )} */}

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
