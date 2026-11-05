import InventoryListView from './inventory-list-view';
import { inventoryListParamsCache } from '@/entities/inventory';

type InventoryListProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function InventoryList({ searchParams }: InventoryListProps) {
  await inventoryListParamsCache.parse(searchParams);
  return <InventoryListView />;
}
