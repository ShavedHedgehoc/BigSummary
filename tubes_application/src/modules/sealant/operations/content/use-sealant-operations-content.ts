import type { ISummary } from "@/shared/api/services/summary-service";
import { useSealantOperationStore } from "../../store/use-sealant-operation-store";

import { useShallow } from "zustand/shallow";
import { useSealantEmployeeStore } from "../../store/use-sealant-employee-store";

export default function useSealantOperationsContent({ summaryData }: { summaryData: ISummary | null }) {
  const items = summaryData && summaryData.sealantOperations.length > 0 ? summaryData.sealantOperations : [];
  const selectedOperation = useSealantOperationStore(useShallow((state) => state.selectedOperation));
  const setSelectedOperation = useSealantOperationStore(useShallow((state) => state.setSelectedOperation));
  const employee = useSealantEmployeeStore(useShallow((state) => state.sealantEmployee));

  return { items, selectedOperation, setSelectedOperation, employee };
}
