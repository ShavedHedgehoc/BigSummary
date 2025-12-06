import PrinterService from "@/shared/api/services/printer-service";
import { useQuery } from "@tanstack/react-query";

export const usePrinter = (conveyor_id: number | null) => {
  return useQuery({
    queryKey: ["printer"],
    queryFn: () => PrinterService.getPrinter(conveyor_id),
    enabled: !!conveyor_id,
  });
};
