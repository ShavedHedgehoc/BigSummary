import { docDetailParamsCache } from '@/entities/record';
import DocDetailView from './doc-detail-view';

type DocDetailProps = {
  docId: number;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function DocDetail({ docId, searchParams }: DocDetailProps) {
  await docDetailParamsCache.parse(searchParams);
  return <DocDetailView docId={docId} />;
}
