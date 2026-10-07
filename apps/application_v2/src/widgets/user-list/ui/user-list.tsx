import { userListParamsCache } from '@/entities/user/index.server';
import UserListView from './user-list-view';

type UserListProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function UserList({ searchParams }: UserListProps) {
  await userListParamsCache.parse(searchParams);
  return <UserListView />;
}
