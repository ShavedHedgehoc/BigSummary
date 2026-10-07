import { recordListParamsCache } from '@/entities/record';
import ForemanProductListView from './foreman-product-list-view';

type ForemanProductListProps = {
  searchParams:
    | Promise<{ [key: string]: string | string[] | undefined }>
    | { [key: string]: string | string[] | undefined };
};

export async function ForemanProductList({ searchParams }: ForemanProductListProps) {
  const resolvedParams = await searchParams;
  recordListParamsCache.parse(resolvedParams);

  return <ForemanProductListView />;
}
