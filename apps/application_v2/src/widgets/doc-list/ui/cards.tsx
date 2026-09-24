import { useDocListSearchParams } from '@/entities/doc';
import { trpc } from '@/shared/api';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, Skeleton } from '@/shared/ui';
import { keepPreviousData } from '@tanstack/react-query';

function DocStatsCardSkeleton() {
  return (
    <Card className="@container/card animate-pulse">
      <CardHeader className="gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-28 mt-1" />
      </CardHeader>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-3 w-8/12" />
      </CardFooter>
    </Card>
  );
}

export function DocStatsCards() {
  const { params } = useDocListSearchParams();
  const { data, isLoading } = trpc.application.main.doc.getStats.useQuery(params, {
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <DocStatsCardSkeleton />
        <DocStatsCardSkeleton />
        <DocStatsCardSkeleton />
        <DocStatsCardSkeleton />
      </div>
    );
  }

  const CARDS_CONFIG = [
    {
      id: 'rows-psk',
      title: 'Пискаревка',
      value: data?.totalRowsPsk,
      label: 'Количество строк',
      description: 'Общее количество за период',
    },
    {
      id: 'rows-klp',
      title: 'Колпино',
      value: data?.totalRowsKlp,
      label: 'Количество строк',
      description: 'Общее количество за период',
    },
    {
      id: 'plan-psk',
      title: 'Пискаревка',
      value: data?.totalPlanPsk,
      label: 'Запланировано единиц продукции',
      description: 'Общее количество за период',
    },
    {
      id: 'plan-klp',
      title: 'Колпино',
      value: data?.totalPlanKlp,
      label: 'Запланировано единиц продукции',
      description: 'Общее количество за период',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {CARDS_CONFIG.map(({ id, title, value, label, description }) => (
        <Card key={id} className="@container/card">
          <CardHeader>
            <CardDescription>{title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                (value?.toLocaleString('ru-RU') ?? '—')
              )}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">{label}</div>
            <div className="text-muted-foreground">{description}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
