'use server';

import { LabBoilList } from '@/widgets/lab-boils-list';

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function LaboratoryBoilsPage({ searchParams }: PageProps) {
  return <LabBoilList searchParams={searchParams} />;
}
