import type { ISummary } from "@/shared/api/services/summary-service";
import { useVarnishOperationStore } from "../../store/use-varnish-operation-store";
import { useShallow } from "zustand/shallow";
import { useVarnishEmployeeStore } from "../../store/use-varnish-employee-store";

export default function useVarnishOperationsContent({ summaryData }: { summaryData: ISummary | null }) {
  const items = summaryData && summaryData.varnishOperations.length > 0 ? summaryData.varnishOperations : [];
  const selectedOperation = useVarnishOperationStore(useShallow((state) => state.selectedOperation));
  const setSelectedOperation = useVarnishOperationStore(useShallow((state) => state.setSelectedOperation));
  const employee = useVarnishEmployeeStore(useShallow((state) => state.varnishEmployee));

  return { items, selectedOperation, setSelectedOperation, employee };
}
