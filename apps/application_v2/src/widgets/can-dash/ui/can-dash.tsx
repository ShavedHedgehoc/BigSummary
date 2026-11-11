import { recordListParamsCache } from '@/entities/record';
import CanDashView from './can-dash-view';

type CanDashProps = {
  searchParams:
    | Promise<{ [key: string]: string | string[] | undefined }>
    | { [key: string]: string | string[] | undefined };
};

export async function CanDash({ searchParams }: CanDashProps) {
  const resolvedParams = await searchParams;
  recordListParamsCache.parse(resolvedParams);

  return <CanDashView />;
}
