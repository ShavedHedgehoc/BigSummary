import { boilListParamsCache } from '@/entities/boil';
import LabBoilListView from './lab-boil-list-view';

type LabBoilListProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function LabBoilList({ searchParams }: LabBoilListProps) {
  await boilListParamsCache.parse(searchParams);
  return <LabBoilListView />;
}
