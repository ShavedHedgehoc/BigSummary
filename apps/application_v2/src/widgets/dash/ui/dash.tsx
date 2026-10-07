import { recordListParamsCache } from '@/entities/record';
import DashView from './dash-view';

type DashProps = {
  searchParams:
    | Promise<{ [key: string]: string | string[] | undefined }>
    | { [key: string]: string | string[] | undefined };
};

export async function Dash({ searchParams }: DashProps) {
  const resolvedParams = await searchParams;
  recordListParamsCache.parse(resolvedParams);

  return <DashView />;
}
