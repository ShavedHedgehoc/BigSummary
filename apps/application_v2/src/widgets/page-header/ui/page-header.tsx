import { useRouteTitle } from '@/shared/lib';

export function PageHeader() {
  const titles = useRouteTitle();
  return (
    <div className="space-y-1 mb-2">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        {titles[titles.length - 1]}
      </h2>
    </div>
  );
}
