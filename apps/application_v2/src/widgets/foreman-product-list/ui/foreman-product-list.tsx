import { foremanProductListParamsCache } from '@/entities/record';
import ForemanProductListView from './foreman-product-list-view';

type ForemanProductListProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function ForemanProductList({ searchParams }: ForemanProductListProps) {
  await foremanProductListParamsCache.parse(searchParams);
  return <ForemanProductListView />;
}
