import { traceBoilWghtReportParamsCache } from '@/entities/trace-boil';
import WghtReportView from './wght-report-view';

type WghtReportProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function WghtReport({ searchParams }: WghtReportProps) {
  await traceBoilWghtReportParamsCache.parse(searchParams);
  return <WghtReportView />;
}
