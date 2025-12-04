// import type { ISummary } from "@/shared/api/services/summary-service";
import { useExtrusionOperationStore } from "../../store/use-extrusion-operation-store";
import { createListCollection } from "@chakra-ui/react";
import { useShallow } from "zustand/shallow";
import type { IEmployee } from "@/shared/api/services/employee-service";
import { useExtrusionOperations } from "../../use-extrusion-operations";

export default function useExtrusionOperationsContent({
  // summaryData,
  employee,
}: {
  // summaryData: ISummary | null;
  employee: IEmployee | null;
}) {
  const { data } = useExtrusionOperations(employee?.rank?.val ?? null);
  const items =
    // summaryData && summaryData.extrusionOperations.length > 0
    //   ? summaryData.extrusionOperations.map((item) => ({
    //       label: item.value,
    //       value: item.id,
    //       description: item.description,
    //     }))
    data && data.length > 0
      ? data.map((item) => ({
          label: item.value,
          value: item.id,
          description: item.description,
        }))
      : [];
  const listData = createListCollection({ items: items });
  const selectedOperation = useExtrusionOperationStore(useShallow((state) => state.selectedOperation));
  const setSelectedOperation = useExtrusionOperationStore(useShallow((state) => state.setSelectedOperation));

  return { listData, selectedOperation, setSelectedOperation };
}
