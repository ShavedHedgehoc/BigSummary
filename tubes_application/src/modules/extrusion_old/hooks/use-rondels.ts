import RondelTypeService from "@/shared/api/services/rondel-type-service";
import { useQuery } from "@tanstack/react-query";

export const useRondelTypes = () =>
  useQuery({
    queryKey: ["rondels"],
    queryFn: () => RondelTypeService.getAllRondelTypes(),
  });
