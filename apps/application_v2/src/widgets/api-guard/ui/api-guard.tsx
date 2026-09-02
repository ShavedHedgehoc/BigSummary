'use client';

import React from 'react';
import { trpc } from '@/shared/api';
import { Loader2 } from 'lucide-react';

import { ServerFalldown } from '@/features/health-check';

export function ApiGuard({ children }: { children: React.ReactNode }) {
  const { isLoading, isError } = trpc.health.check.useQuery(undefined, {
    retry: 1,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm font-medium animate-pulse">Соединение с сервером ...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return <ServerFalldown />;
  }
  return <>{children}</>;
}
