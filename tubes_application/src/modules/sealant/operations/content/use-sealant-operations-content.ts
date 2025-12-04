import type { ISummary } from "@/shared/api/services/summary-service";
import { useSealantOperationStore } from "../../store/use-sealant-operation-store";
import { createListCollection } from "@chakra-ui/react";
import { useShallow } from "zustand/shallow";

export default function useSealantOperationsContent({ summaryData }: { summaryData: ISummary | null }) {
  const items =
    summaryData && summaryData.sealantOperations.length > 0
      ? summaryData.sealantOperations.map((item) => ({
          label: item.value,
          value: item.id,
          description: item.description,
        }))
      : [];
  const listData = createListCollection({ items: items });
  const selectedOperation = useSealantOperationStore(useShallow((state) => state.selectedOperation));
  const setSelectedOperation = useSealantOperationStore(useShallow((state) => state.setSelectedOperation));

  return { listData, selectedOperation, setSelectedOperation };
}
