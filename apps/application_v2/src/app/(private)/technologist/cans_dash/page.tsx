'use server';

import { CanDash } from '@/widgets/can-dash';

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function TechnologistCansDashPage({ searchParams }: PageProps) {
  return <CanDash searchParams={searchParams} />;
}
