'use server';

import { LabProductList } from '@/widgets/lab-product-list';

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function LaboratoryProductsPage({ searchParams }: PageProps) {
  return <LabProductList searchParams={searchParams} />;
}
