import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';
import type { TPaginationParams } from '../model';
import { useIsMobile } from '@/shared/lib';

export interface ITablePaginationProps<T extends TPaginationParams> {
  total: number;
  totalPages: number;
  params: T;
  setParams: (
    state: Partial<T> | ((prev: T) => Partial<T> | null) | null,
  ) => Promise<URLSearchParams>;
  onClearSelection?: () => void;
}

export function TablePagination<T extends TPaginationParams>({
  total,
  totalPages,
  params,
  setParams,
  onClearSelection,
}: ITablePaginationProps<T>) {
  const handlePageChange = (page: number) => {
    onClearSelection?.();
    setParams({ page } as Partial<T>);
  };
  const isMobile = useIsMobile();
  const handleLimitChange = (limit: string) => {
    const nextLimit = Number(limit);
    const nextTotalPages = Math.ceil(total / nextLimit);
    const nextPage = params.page > nextTotalPages ? 1 : params.page;
    onClearSelection?.();
    setParams({
      limit: nextLimit,
      page: nextPage,
    } as Partial<T>);
  };

  const isFirstPage = params.page <= 1;
  const isLastPage = params.page >= totalPages;
  if (isMobile) {
    return (
      <div className="@container flex items-center justify-between px-4">
        {totalPages > 0 ? (
          <div className="flex w-fit items-center justify-center text-[11px] font-medium">
            Страница: {params.page} из {totalPages}
          </div>
        ) : null}
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0 flex bg-background"
            onClick={() => {
              if (!isFirstPage) handlePageChange(1);
            }}
            disabled={isFirstPage}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeftIcon />
          </Button>
          <Button
            variant="outline"
            className="size-8 bg-background"
            size="icon"
            onClick={() => {
              if (!isFirstPage) handlePageChange(params.page - 1);
            }}
            disabled={isFirstPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outline"
            className="size-8 bg-background"
            size="icon"
            onClick={() => {
              if (!isLastPage) handlePageChange(params.page + 1);
            }}
            disabled={isLastPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon />
          </Button>
          <Button
            variant="outline"
            className="size-8 flex bg-background"
            size="icon"
            onClick={() => {
              if (!isLastPage) handlePageChange(totalPages);
            }}
            disabled={isLastPage}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRightIcon />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="@container flex items-center justify-between px-4">
      <div className="flex flex-1 text-sm text-muted-foreground @max-4xl:hidden">
        Всего записей: {total}
      </div>
      <div className="flex flex-1 text-sm text-muted-foreground "></div>
      <div className="flex items-center gap-8 w-fit">
        <div className="hidden items-center gap-2 md:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            На странице:
          </Label>
          <Select value={params.limit.toString()} onValueChange={handleLimitChange}>
            <SelectTrigger size="sm" className="w-20 bg-background" id="rows-per-page">
              <SelectValue placeholder={params.limit.toString()} />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectGroup>
                {[10, 20, 50, 100].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {totalPages > 0 ? (
          <div className="@max-4xl:hidden flex w-fit items-center justify-center text-sm font-medium">
            Страница: {params.page} из {totalPages}
          </div>
        ) : null}
        <div className="flex items-center gap-2 ml-0">
          <Button
            variant="outline"
            className="h-8 w-8 p-0 flex bg-background"
            onClick={() => {
              if (!isFirstPage) handlePageChange(1);
            }}
            disabled={isFirstPage}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeftIcon />
          </Button>
          <Button
            variant="outline"
            className="size-8 bg-background"
            size="icon"
            onClick={() => {
              if (!isFirstPage) handlePageChange(params.page - 1);
            }}
            disabled={isFirstPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outline"
            className="size-8 bg-background"
            size="icon"
            onClick={() => {
              if (!isLastPage) handlePageChange(params.page + 1);
            }}
            disabled={isLastPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon />
          </Button>
          <Button
            variant="outline"
            className="size-8 flex bg-background"
            size="icon"
            onClick={() => {
              if (!isLastPage) handlePageChange(totalPages);
            }}
            disabled={isLastPage}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
