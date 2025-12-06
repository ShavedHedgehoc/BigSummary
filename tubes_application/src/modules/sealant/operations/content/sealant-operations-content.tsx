import type { ISummary } from "@/shared/api/services/summary-service";
import Info from "@/shared/components/info/info";
import NotFound from "@/shared/components/info/not-found-full-screen";
import { formatTimeToString } from "@/shared/helpers/date-time-formatters";
import { AppMessages } from "@/shared/resources/app-messages";
import { Box, Heading, ScrollArea, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import useSealantOperationsContent from "./use-sealant-operations-content";
import OperationCard from "@/shared/components/cards/operation-card";

export default function SealantOperationsContent({ summaryData }: { summaryData: ISummary | null }) {
  const { items, setSelectedOperation, employee, selectedOperation } = useSealantOperationsContent({
    summaryData: summaryData,
  });

  if (!employee) return <NotFound message={AppMessages.NOT_AUTHORIZED} />;
  if (!summaryData) return <NotFound message={AppMessages.ACTIVE_SUMMARY_NOT_FOUND} />;
  if (!summaryData.sealantOperations.length) return <Info message={AppMessages.OPERATIONS_LIST_NOT_FOUND} />;

  const content = {
    idle: (
      <VStack gap={12} h="full" justify="center">
        <Heading fontSize="3xl" color="fg.subtle">
          Статус поста - простой
        </Heading>
        <Heading fontSize="3xl" color="fg.subtle">
          Выполняемая операция: {summaryData.sealantStatus.operation_description}
        </Heading>
        <Heading fontSize="3xl" color="fg.subtle">
          Время начала: {formatTimeToString(summaryData.sealantStatus.createdAt)}
        </Heading>
      </VStack>
    ),
    working: (
      <VStack h="full" gap={12}>
        <Heading fontSize="3xl" color="fg.subtle">
          Статус поста - работает
        </Heading>
        <Text color="fg.subtle" textStyle="xl">
          {selectedOperation ? `Выбранная операция: ${selectedOperation.description}` : "Выберите операцию"}
        </Text>
        <ScrollArea.Root height="full" variant={"always"}>
          <ScrollArea.Viewport>
            <ScrollArea.Content paddingEnd="3" textStyle="sm">
              <SimpleGrid columns={4} gap={2}>
                {items.map((item) => (
                  <OperationCard
                    operation={item}
                    onClick={() => setSelectedOperation(item)}
                    selected={selectedOperation !== null && selectedOperation.id === item.id}
                    disabled={!employee || !employee.rank || employee.rank.val < item.min_rank}
                  />
                ))}
              </SimpleGrid>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar />
        </ScrollArea.Root>
      </VStack>
    ),

    finished: <></>,
  }[summaryData.sealantStatus.state];

  return (
    <Box h="full" w="full" px={16}>
      {content}
    </Box>
  );
}
