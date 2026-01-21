import { useQuery } from "@tanstack/react-query";
import TubeRecordsService, { FetchTubeRecordsListDto } from "../../shared/api/services/tube-records-service";

export const useTubeRecordsList = (dto: FetchTubeRecordsListDto) =>
  useQuery({
    queryKey: ["tuberecords_list", dto],
    queryFn: () => TubeRecordsService.getRecordsList(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 10,
  });
