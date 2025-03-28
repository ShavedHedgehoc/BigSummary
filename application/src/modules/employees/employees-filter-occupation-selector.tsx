import { useShallow } from "zustand/shallow";

import { useQuery } from "@tanstack/react-query";

import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../shared/ui/filter-selector";
import { useEmployeesFilterStore } from "./store/use-employees-filter-store";
import { EmployeesFilterParams } from "./employees-filter-params";
import OccupationService from "../../shared/api/services/occupation-service";

export default function EmployeesFilterOcupationSelector() {
  const changeFilter = useEmployeesFilterStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useEmployeesFilterStore(useShallow((state) => state.selectedOccupation));
  const setSelectedOccupation = useEmployeesFilterStore(useShallow((state) => state.setSelectedOccupation));
  const occupationSelectorOptions = useEmployeesFilterStore(useShallow((state) => state.occupationSelectorOptions));
  const fillOccupationSelectorOptions = useEmployeesFilterStore(
    useShallow((state) => state.fillOccupationSelectorOptions)
  );

  useQuery({
    queryKey: ["occupations_options", "employees"],
    queryFn: async () => {
      const data = await OccupationService.getOccupations();
      if (data) {
        fillOccupationSelectorOptions(data);

        return data;
      }
    },
  });

  const occupationOptions = occupationSelectorOptions.map((occupation) => (
    <FilterSelectorOption
      key={`occupation_option_${occupation.id}`}
      id={occupation.id}
      value={occupation.description}
    />
  ));

  const occupationSelectorProps: FilterSelectorProps = {
    id: EmployeesFilterParams.OCCUPATIONS,
    selectedOption: selectedPlant,
    placeholder: "Выберите роль",
    label: "Поиск по роли",
    options: occupationOptions,
    setSelectedOption: (id: number) => setSelectedOccupation(id),
    changeFilter: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) =>
      changeFilter({ key, value, values }),
  };

  return <FilterSelector {...occupationSelectorProps} />;
}
