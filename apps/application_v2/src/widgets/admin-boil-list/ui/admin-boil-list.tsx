import { boilListParamsCache } from '@/entities/boil';
import AdminBoilListView from './admin-boil-list-view';

type AdminBoilListProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function AdminBoilList({ searchParams }: AdminBoilListProps) {
  await boilListParamsCache.parse(searchParams);
  return <AdminBoilListView />;
}
