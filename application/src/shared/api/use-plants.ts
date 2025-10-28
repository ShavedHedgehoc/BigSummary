import { useQuery } from "@tanstack/react-query";
import PlantService from "./services/plant-service";
import { useDashFilterStore } from "../../modules/dash/store/dash-filter-store";
import { useForemanFilterStore } from "../../modules/foreman/store/use-foreman-filter-store";
import { useRecordsFilterStore } from "../../modules/records/store/use-record-filter-store";
import { useBoilsFilterStore } from "../../modules/boils/store/use-boils-filter-store";
import { useBoilsReportFilterStore } from "../../modules/boils-report/store/use-boils-report-filter-store";
import { useDocsUploadFormStore } from "../../modules/docs-upload/store/use-docs-upload-form-store";
import { useDocumentsFilterStore } from "../../modules/documents/store/use-documents-filter-store";
import { useTimeReportFilterStore } from "../../modules/time-report.tsx/store/use-time-report-filter-store";

export const usePlants = () => {
  const { fillPlantSelectorOptions: fillDashOptions } = useDashFilterStore();
  const { fillPlantSelectorOptions: fillForemanOptions } = useForemanFilterStore();
  const { fillPlantSelectorOptions: fillRecordsOptions } = useRecordsFilterStore();
  const { fillPlantSelectorOptions: fillBoilsOptions } = useBoilsFilterStore();
  const { fillPlantSelectorOptions: fillBoilsReportOptions } = useBoilsReportFilterStore();
  const { fillPlantSelectorOptions: fillDocsUploadOptions } = useDocsUploadFormStore();
  const { fillPlantSelectorOptions: fillDocumentsOptions } = useDocumentsFilterStore();
  const { fillPlantSelectorOptions: fillTimeReportOptions } = useTimeReportFilterStore();

  console.log("execusePlants");
  return useQuery({
    queryKey: ["plants"],
    queryFn: async () => {
      const data = await PlantService.getAllPlants();
      if (data) {
        fillDashOptions(data);
        fillForemanOptions(data);
        fillRecordsOptions(data);
        fillBoilsOptions(data);
        fillBoilsReportOptions(data);
        fillDocsUploadOptions(data);
        fillDocumentsOptions(data);
        fillTimeReportOptions(data);
      }
      return data;
    },
  });
};
