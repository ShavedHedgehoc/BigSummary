'use server';

import { WeightingList } from '@/widgets/weighting-list';

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function WeightSectionWeightingListPage({ searchParams }: PageProps) {
  return <WeightingList searchParams={searchParams} />;
}
