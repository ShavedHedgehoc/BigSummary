import { conveyorListParamsCache } from '@/entities/conveyor';
import ConveyorListView from './conveyor-list-view';

type ConveyorListProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function ConveyorList({ searchParams }: ConveyorListProps) {
  await conveyorListParamsCache.parse(searchParams);
  return <ConveyorListView />;
}
