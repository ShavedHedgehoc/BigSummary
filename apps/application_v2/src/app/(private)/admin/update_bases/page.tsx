'use server';

import { AdminBoilList } from '@/widgets/admin-boil-list';

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AdminUpdateBasesPage({ searchParams }: PageProps) {
  return <AdminBoilList searchParams={searchParams} />;
}
