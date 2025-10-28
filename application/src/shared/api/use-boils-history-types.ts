import { useQuery } from "@tanstack/react-query";
import HistoryTypeService from "./services/history-types-service";
import { useBoilsReportFilterStore } from "../../modules/boils-report/store/use-boils-report-filter-store";
import { useBoilsFilterStore } from "../../modules/boils/store/use-boils-filter-store";

export const useBoilsHistoryTypes = () => {
  const { fillStateSelectorOptions: fillBoilsReportOptions } = useBoilsReportFilterStore();
  const { fillStateSelectorOptions: fillBoilsOptions } = useBoilsFilterStore();
  useQuery({
    queryKey: ["boils_history_types"],
    queryFn: async () => {
      const data = await HistoryTypeService.getBoilsHistoryTypes();
      if (data) {
        fillBoilsReportOptions(data);
        fillBoilsOptions(data);
      }

      return data;
    },
  });
};
