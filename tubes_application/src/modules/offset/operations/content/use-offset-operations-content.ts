import type { ISummary } from "@/shared/api/services/summary-service";
import { useOffsetOperationStore } from "../../store/use-offset-operation-store";
import { useShallow } from "zustand/shallow";
import { useOffsetEmployeeStore } from "../../store/use-offset-employee-store";

export default function useOffsetOperationContent({ summaryData }: { summaryData: ISummary | null }) {
  const items = summaryData && summaryData.offsetOperations.length > 0 ? summaryData.offsetOperations : [];
  const selectedOperation = useOffsetOperationStore(useShallow((state) => state.selectedOperation));
  const setSelectedOperation = useOffsetOperationStore(useShallow((state) => state.setSelectedOperation));
  const employee = useOffsetEmployeeStore(useShallow((state) => state.offsetEmployee));

  return { items, selectedOperation, setSelectedOperation, employee };
}
