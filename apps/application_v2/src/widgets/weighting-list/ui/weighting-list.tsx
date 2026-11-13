import { TraceWeightingListParamsCache } from '@/entities/weighting';
import Weightinglist from './weighting-list-view';

type WeightingListProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function WeightingList({ searchParams }: WeightingListProps) {
  await TraceWeightingListParamsCache.parse(searchParams);
  return <Weightinglist />;
}
