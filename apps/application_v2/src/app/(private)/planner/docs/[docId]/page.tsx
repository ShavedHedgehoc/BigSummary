'use server';

import { DocDetail } from '@/widgets/doc-detail';

type PageProps = {
  params: Promise<{ docId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function PlannerDocDetailPage({ params, searchParams }: PageProps) {
  const { docId } = await params;
  return <DocDetail docId={Number(docId)} searchParams={searchParams} />;
}
