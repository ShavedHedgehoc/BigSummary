import type { ISummary } from "@/shared/api/services/summary-service";
import { useOffsetOperationStore } from "../../store/use-offset-operation-store";
import { createListCollection } from "@chakra-ui/react";
import { useShallow } from "zustand/shallow";

export default function useOffsetOperationContent({ summaryData }: { summaryData: ISummary | null }) {
  const items =
    summaryData && summaryData.offsetOperations.length > 0
      ? summaryData.offsetOperations.map((item) => ({
          label: item.value,
          value: item.id,
          description: item.description,
        }))
      : [];
  const listData = createListCollection({ items: items });
  const selectedOperation = useOffsetOperationStore(useShallow((state) => state.selectedOperation));
  const setSelectedOperation = useOffsetOperationStore(useShallow((state) => state.setSelectedOperation));

  return { listData, selectedOperation, setSelectedOperation };
}
