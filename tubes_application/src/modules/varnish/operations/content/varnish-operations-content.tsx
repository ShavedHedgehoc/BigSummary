import type { ISummary } from "@/shared/api/services/summary-service";
import Info from "@/shared/components/info/info";
import NotFound from "@/shared/components/info/not-found-full-screen";
import { formatTimeToString } from "@/shared/helpers/date-time-formatters";
import { AppMessages } from "@/shared/resources/app-messages";
import { Box, Heading, HStack, Listbox, Text, VStack } from "@chakra-ui/react";
import useVarnishOperationsContent from "./use-varnish-operations-content";

export default function VarnishOperationsContent({ summaryData }: { summaryData: ISummary | null }) {
  const { listData, selectedOperation, setSelectedOperation } = useVarnishOperationsContent({
    summaryData: summaryData,
  });

  if (!summaryData) return <NotFound message={AppMessages.ACTIVE_SUMMARY_NOT_FOUND} />;
  if (!summaryData.varnishOperations.length) return <Info message={AppMessages.OPERATIONS_LIST_NOT_FOUND} />;

  const OperationsListbox = () => (
    <Listbox.Root
      collection={listData}
      value={selectedOperation}
      maxW="1/3"
      onValueChange={(details) => setSelectedOperation(details.value)}
    >
      <Listbox.Content backgroundColor="bg">
        {listData.items.map((item) => (
          <Listbox.Item
            item={item}
            key={item.value}
            px={4}
            py={6}
            flex="1"
            justifyContent="space-between"
            alignItems="center"
          >
            <HStack gap={4}>
              <Text fontSize="xl" color="fg.subtle">
                {item.label}
              </Text>
              <Text fontSize="xl" color="fg.subtle">
                {item.description}
              </Text>
            </HStack>
            <Listbox.ItemIndicator color="fg.muted" />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  );

  const content = {
    idle: (
      <VStack gap={16} h="full" justify="center">
        <Heading fontSize="3xl" color="fg.subtle">
          Статус поста - простой
        </Heading>
        <Heading fontSize="3xl" color="fg.subtle">
          Выполняемая операция: {summaryData.varnishStatus.operation_description}
        </Heading>
        <Heading fontSize="3xl" color="fg.subtle">
          Время начала: {formatTimeToString(summaryData.varnishStatus.createdAt)}
        </Heading>
      </VStack>
    ),
    working: (
      <VStack h="full" gap={16}>
        <Heading fontSize="3xl" color="fg.subtle">
          Статус поста - работает
        </Heading>
        <Text color="fg.subtle" textStyle="xl">
          {selectedOperation.length
            ? `Выбранная операция: ${
                summaryData.varnishOperations.filter((x) => x.id === Number(selectedOperation[0]))[0].description
              }`
            : "Выберите операцию"}
        </Text>
        <OperationsListbox />
      </VStack>
    ),
    finished: <></>,
  }[summaryData.varnishStatus.state];

  return (
    <Box h="full" w="full" px={16}>
      {content}
    </Box>
  );
}
