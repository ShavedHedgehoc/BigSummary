'use server';

import { WghtReport } from '@/widgets/wght-report';

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function WeightSectionWeightReportsPage({ searchParams }: PageProps) {
  return <WghtReport searchParams={searchParams} />;
}
