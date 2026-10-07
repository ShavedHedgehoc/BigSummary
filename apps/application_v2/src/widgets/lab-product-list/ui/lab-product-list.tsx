import { recordListParamsCache } from '@/entities/record';
import LabProductListView from './lab-product-list-view';
type LabProductListProps = {
  searchParams:
    | Promise<{ [key: string]: string | string[] | undefined }>
    | { [key: string]: string | string[] | undefined };
};

export async function LabProductList({ searchParams }: LabProductListProps) {
  const resolvedParams = await searchParams;
  recordListParamsCache.parse(resolvedParams);

  return <LabProductListView />;
}
