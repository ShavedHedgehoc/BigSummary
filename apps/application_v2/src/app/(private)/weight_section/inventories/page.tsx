'use server';

import { InventoryList } from '@/widgets/inventory-list';

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function WeightSectionInventoriesPage({ searchParams }: PageProps) {
  return <InventoryList searchParams={searchParams} />;
}
