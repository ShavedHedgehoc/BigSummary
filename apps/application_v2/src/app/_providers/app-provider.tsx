'use client';

import React from 'react';

import { TRPCProvider } from '@/shared/api';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Toaster } from 'sonner';
import { AppSessionProvider } from '@/entities/user';
import { ApiGuard } from '@/widgets/api-guard';
import { ThemeProvider } from './theme-provider';
import { NuqsProvider } from './nuqs-provider';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <TRPCProvider>
      <ApiGuard>
        <AppSessionProvider>
          <NuqsProvider>
            <ThemeProvider>
              {children}
              <Toaster position="top-right" richColors />
              <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
          </NuqsProvider>
        </AppSessionProvider>
      </ApiGuard>
    </TRPCProvider>
  );
}
