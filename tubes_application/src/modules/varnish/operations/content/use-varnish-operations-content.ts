import type { ISummary } from "@/shared/api/services/summary-service";
import { useVarnishOperationStore } from "../../store/use-varnish-operation-store";
import { createListCollection } from "@chakra-ui/react";
import { useShallow } from "zustand/shallow";

export default function useVarnishOperationsContent({ summaryData }: { summaryData: ISummary | null }) {
  const items =
    summaryData && summaryData.varnishOperations.length > 0
      ? summaryData.varnishOperations.map((item) => ({
          label: item.value,
          value: item.id,
          description: item.description,
        }))
      : [];
  const listData = createListCollection({ items: items });
  const selectedOperation = useVarnishOperationStore(useShallow((state) => state.selectedOperation));
  const setSelectedOperation = useVarnishOperationStore(useShallow((state) => state.setSelectedOperation));

  return { listData, selectedOperation, setSelectedOperation };
}
