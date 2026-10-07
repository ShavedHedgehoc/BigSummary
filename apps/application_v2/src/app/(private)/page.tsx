'use server';

import { Dash } from '@/widgets/dash';

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function DashPage({ searchParams }: PageProps) {
  return <Dash searchParams={searchParams} />;
}
