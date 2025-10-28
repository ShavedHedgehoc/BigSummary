import { useQuery } from "@tanstack/react-query";
import HistoryTypeService from "./services/history-types-service";
import { useDocumentDetailFilterStore } from "../../modules/document-detail/store/use-document-detail-filter-store";
import { useForemanFilterStore } from "../../modules/foreman/store/use-foreman-filter-store";
import { useRecordsFilterStore } from "../../modules/records/store/use-record-filter-store";

export const useProductsHistoryTypes = () => {
  const { fillStateSelectorOptions: fillDocumentDetailOptions } = useDocumentDetailFilterStore();
  const { fillStateSelectorOptions: fillForemanOptions } = useForemanFilterStore();
  const { fillStateSelectorOptions: fillRecordsOptions } = useRecordsFilterStore();
  useQuery({
    queryKey: ["products_history_types"],
    queryFn: async () => {
      const data = await HistoryTypeService.getProductsHistoryTypes();
      if (data) {
        fillDocumentDetailOptions(data);
        fillForemanOptions(data);
        fillRecordsOptions(data);
      }

      return data;
    },
  });
};
