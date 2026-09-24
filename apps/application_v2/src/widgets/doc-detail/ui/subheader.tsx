import { Button, Skeleton } from '@/shared/ui';
import { TApplicationDocDetailResponse } from '@repo/schemas';
import { format } from 'date-fns';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ISubheaderProps {
  data?: TApplicationDocDetailResponse | null;
  isLoading: boolean;
}

function DocDetailSubHeaderSkeleton() {
  return (
    <div className="flex items-center gap-4 mb-8 animate-pulse">
      <Button variant="outline" size="icon" disabled className="shrink-0">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="space-y-2">
        <Skeleton className="h-5 w-48 rounded-md" />
        <Skeleton className="h-4 w-32 rounded-md" />
      </div>
    </div>
  );
}

export function DocDetailSubHeader({ data, isLoading }: ISubheaderProps) {
  const dateObj = data?.header?.date ? new Date(data?.header?.date) : null;
  const dateValue = dateObj ? format(dateObj, 'dd-MM-yyyy') : '-';
  const plantValue = data?.header?.plant ?? '-';
  const router = useRouter();

  if (isLoading) return <DocDetailSubHeaderSkeleton />;
  return (
    <div className="flex items-center gap-4 mb-4">
      <Button variant="outline" size="icon" onClick={() => router.back()} className="shrink-0">
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex flex-col ">
        <h1 className="text-md font-semibold tracking-tight">{`Площадка: ${plantValue}`}</h1>
        <h3 className="text-sm text-muted-foreground font-normal tracking-tight">
          {`Дата сводки: ${dateValue}`}
        </h3>
      </div>
    </div>
  );
}

interface ISubheaderProps {
  data?: TApplicationDocDetailResponse | null;
  isLoading: boolean;
}

function DocDetailMobileSubHeaderSkeleton() {
  return (
    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4 animate-pulse">
      <Skeleton className="h-7 w-7 md:h-9 md:w-9 rounded-md shrink-0" />
      <div className="space-y-1.5">
        <Skeleton className="h-4 md:h-5 w-40 md:w-48 rounded-md" />
        <Skeleton className="h-3 md:h-4 w-28 md:w-32 rounded-md" />
      </div>
    </div>
  );
}

export function DocDetailMobileSubHeader({ data, isLoading }: ISubheaderProps) {
  const dateObj = data?.header?.date ? new Date(data?.header?.date) : null;
  const dateValue = dateObj ? format(dateObj, 'dd-MM-yyyy') : '-';
  const plantValue = data?.header?.plant ?? '-';
  const router = useRouter();

  if (isLoading) return <DocDetailMobileSubHeaderSkeleton />;

  return (
    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => router.back()}
        className="h-7 w-7 md:h-9 md:w-9 shrink-0"
      >
        <ChevronLeft className="h-3.5 w-3.5 md:h-4 md:w-4" />
      </Button>
      <div className="flex flex-col">
        <h1 className="text-sm md:text-md font-semibold tracking-tight leading-none md:leading-normal">
          {`Площадка: ${plantValue}`}
        </h1>
        <h3 className="text-[11px] md:text-sm text-muted-foreground font-normal tracking-tight mt-0.5">
          {`Дата сводки: ${dateValue}`}
        </h3>
      </div>
    </div>
  );
}
