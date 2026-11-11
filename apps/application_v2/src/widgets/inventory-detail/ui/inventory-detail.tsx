import { docRecordListParamsCache } from '@/entities/doc';
import InventoryDetailView from './inventory-detail-view';

type InventoryDetailProps = {
  inventoryId: number;
  searchParams:
    | Promise<{ [key: string]: string | string[] | undefined }>
    | { [key: string]: string | string[] | undefined };
};
export async function InventoryDetail({ inventoryId, searchParams }: InventoryDetailProps) {
  const resolvedParams = await searchParams;
  docRecordListParamsCache.parse(resolvedParams);
  return <InventoryDetailView inventoryId={inventoryId} />;
}
