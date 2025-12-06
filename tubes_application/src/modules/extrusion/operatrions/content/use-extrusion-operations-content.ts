import type { ISummary } from "@/shared/api/services/summary-service";
import { useShallow } from "zustand/shallow";
import { useExtrusionEmployeeStore } from "../../store/use-extrusion-employee-store";
import { useExtrusionOperationStore } from "../../store/use-extrusion-operation-store";

export default function useExtrusionOperationsContent({ summaryData }: { summaryData: ISummary | null }) {
  const items = summaryData && summaryData.extrusionOperations.length > 0 ? summaryData.extrusionOperations : [];
  const selectedOperation = useExtrusionOperationStore(useShallow((state) => state.selectedOperation));
  const setSelectedOperation = useExtrusionOperationStore(useShallow((state) => state.setSelectedOperation));
  const employee = useExtrusionEmployeeStore(useShallow((state) => state.extrusionEmployee));

  return { items, selectedOperation, setSelectedOperation, employee };
}
