'use server';

import { ConveyorList } from '@/widgets/conveyor-list';

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function PlannerConveyorsPage({ searchParams }: PageProps) {
  return <ConveyorList searchParams={searchParams} />;
}
