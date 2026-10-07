import { useAuth } from './use-auth';

export function useUserSettings() {
  const { user } = useAuth();
  const settings = user?.settings || { plant: '-', plant_id: null };
  const defaultPlant = settings.plant;
  const defaultPlantId = settings.plant_id;
  const hasDefaultPlant = defaultPlantId !== null;

  return {
    settings,
    defaultPlant,
    defaultPlantId,
    hasDefaultPlant,
  };
}
