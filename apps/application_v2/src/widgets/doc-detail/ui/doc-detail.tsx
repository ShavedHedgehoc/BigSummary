import { docRecordListParamsCache } from '@/entities/doc';
import DocDetailView from './doc-detail-view';

type DocDetailProps = {
  docId: number;
  searchParams:
    | Promise<{ [key: string]: string | string[] | undefined }>
    | { [key: string]: string | string[] | undefined };
};
export async function DocDetail({ docId, searchParams }: DocDetailProps) {
  const resolvedParams = await searchParams;
  docRecordListParamsCache.parse(resolvedParams);
  return <DocDetailView docId={docId} />;
}
