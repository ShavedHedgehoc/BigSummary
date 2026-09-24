import { Skeleton } from '../../skeleton';

export function PaginationSkeleton() {
  return (
    <div className="flex items-center justify-between px-4">
      <div className="hidden flex-1 text-sm text-muted-foreground 2xl:flex">
        <Skeleton className="h-8 w-32" />
      </div>
      <div className="flex flex-1 text-sm text-muted-foreground 2xl:hidden"></div>
      <div className="flex w-full items-center gap-8 lg:w-fit">
        <div className="hidden items-center gap-2 md:flex">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-20" />
        </div>
        <div className="md:hidden flex w-fit items-center justify-center text-sm font-medium">
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Skeleton className="hidden md:flex h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="hidden md:flex h-8 w-8 rounded-md" />
        </div>
      </div>
    </div>
  );
}
