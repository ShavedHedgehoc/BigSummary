'use server';

// import { UnderConstructionCard } from '@/shared/ui';
import { UserList } from '@/widgets/user-list';

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AdminUserListPage({ searchParams }: PageProps) {
  return <UserList searchParams={searchParams} />;
  // return <UnderConstructionCard />;
}
