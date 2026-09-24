'use server';

import { ForemanProductList } from '@/widgets/foreman-product-list';

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ForemanPage({ searchParams }: PageProps) {
  return <ForemanProductList searchParams={searchParams} />;
}
