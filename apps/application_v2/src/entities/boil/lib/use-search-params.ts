import { useQueryStates } from 'nuqs';
import { labBoilsListParamsSchema } from '../model';

export function useLabBoilListSearchParams() {
  const [params, setParams] = useQueryStates(labBoilsListParamsSchema, {
    shallow: false,
    history: 'replace',
    clearOnDefault: true,
  });
  return { params, setParams };
}

// import { useQueryStates } from 'nuqs';
// import { docListParamsSchema } from './schema';
// import { useAuth } from '@/shared/hooks'; // ваш хук авторизации на клиенте

// export function useDocListSearchParams() {
//   const { user } = useAuth();
//   const [params, setParams] = useQueryStates(docListParamsSchema);

//   // Если в URL нет выбранных площадок, подставляем дефолтную из профиля
//   const activePlants = params.plants.length > 0
//     ? params.plants
//     : [user?.settings?.defaultPlantId || 'All'];

//   return {
//     params: {
//       ...params,
//       plants: activePlants
//     },
//     setParams
//   };
// }
