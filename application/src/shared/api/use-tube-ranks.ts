import { useQuery } from "@tanstack/react-query";

import { useTubeEmployeesFilterStore } from "../../modules/tube-employees/store/use-tube-employees-filter-store";
import TubeRanksService from "./services/tube-ranks-service";
import { useTubeEmployeesAddModalStore } from "../../modules/tube-employees/store/use-tube-employees-add-modal-store";
import { useTubeEmployeesEditModalStore } from "../../modules/tube-employees/store/use-tube-employees-edit-modal-store";

export const useTubeRanks = () => {
  const { fillRankSelectorOptions } = useTubeEmployeesFilterStore();
  const { fillRankOptions, setRank } = useTubeEmployeesAddModalStore();
  const { fillRanksOptions } = useTubeEmployeesEditModalStore();

  return useQuery({
    queryKey: ["tube_ranks"],
    queryFn: async () => {
      const data = await TubeRanksService.getRanks();
      if (data) {
        fillRankSelectorOptions(data.ranks);
        fillRankOptions(data.ranks);
        fillRanksOptions(data.ranks);
        if (data.ranks.length) {
          setRank(data.ranks[0].id);
        }
      }
      return data;
    },
  });
};
