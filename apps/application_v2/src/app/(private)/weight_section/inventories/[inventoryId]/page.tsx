'use server';

import { InventoryDetail } from '@/widgets/inventory-detail';

type PageProps = {
  params: Promise<{ inventoryId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function WeightSectionInventoryDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { inventoryId } = await params;
  return <InventoryDetail inventoryId={Number(inventoryId)} searchParams={searchParams} />;
}
