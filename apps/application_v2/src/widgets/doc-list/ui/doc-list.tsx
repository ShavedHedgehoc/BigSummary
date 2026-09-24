import { docListParamsCache } from '@/entities/doc';
import DocListView from './doc-list-view';

type DocListProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function DocList({ searchParams }: DocListProps) {
  await docListParamsCache.parse(searchParams);
  return <DocListView />;
}
