import { useShallow } from 'zustand/react/shallow';
import { trpc } from '@/shared/api';
import { useEffect } from 'react';
import { ITracePlant } from '@repo/schemas';
import { useCanFilterStore } from './use-can-filter-store';
import { CanFilterParams } from './can-filter-params';

export function usePlantSelector() {
  const changeFilter = useCanFilterStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useCanFilterStore(useShallow((state) => state.selectedPlant));
  const setSelectedPlant = useCanFilterStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useCanFilterStore(useShallow((state) => state.plantSelectorOptions));
  const fillPlantSelectorOptions = useCanFilterStore(
    useShallow((state) => state.fillPlantSelectorOptions),
  );

  const { data } = trpc.dash.trace.plant.getAllPlants.useQuery();
  useEffect(() => {
    if (data) {
      fillPlantSelectorOptions(data);
    }
  }, [data, fillPlantSelectorOptions]);

  const handleChange = (item: ITracePlant) => {
    setSelectedPlant(item);
    changeFilter({
      key: CanFilterParams.PLANTS,
      value: '',
      values: item.PlantPK === 999999 ? [] : [item.PlantPK],
    });
  };
  return {
    selectedPlant,
    plantSelectorOptions,
    handleChange,
  };
}
