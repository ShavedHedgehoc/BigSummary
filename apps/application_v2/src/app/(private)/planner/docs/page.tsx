'use server';
import { DocList } from '@/widgets/doc-list';

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function PlannerDocsPage({ searchParams }: PageProps) {
  return <DocList searchParams={searchParams} />;
}
