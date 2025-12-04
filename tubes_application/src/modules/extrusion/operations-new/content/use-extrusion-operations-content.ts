import type { ISummary } from "@/shared/api/services/summary-service";

// import { createListCollection } from "@chakra-ui/react";
import { useShallow } from "zustand/shallow";
import { useExtrusionEmployeeStore } from "../../store/use-extrusion-employee-store";
import { useExtrusionOperationStoreNew } from "../../store/use-extrusion-operation-new-store";

export default function useExtrusionOperationsContent({ summaryData }: { summaryData: ISummary | null }) {
  const items = summaryData && summaryData.extrusionOperations.length > 0 ? summaryData.extrusionOperations : [];
  // const listData = createListCollection({ items: items });
  const selectedOperation = useExtrusionOperationStoreNew(useShallow((state) => state.selectedOperation));
  const setSelectedOperation = useExtrusionOperationStoreNew(useShallow((state) => state.setSelectedOperation));
  const employee = useExtrusionEmployeeStore(useShallow((state) => state.extrusionEmployee));
  return { items, selectedOperation, setSelectedOperation, employee };
}
