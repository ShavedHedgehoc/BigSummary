import { labProductListParamsCache } from '@/entities/record';
import LabProductListView from './lab-product-list-view';

type LabProductListProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function LabProductList({ searchParams }: LabProductListProps) {
  await labProductListParamsCache.parse(searchParams);
  return <LabProductListView />;
}
