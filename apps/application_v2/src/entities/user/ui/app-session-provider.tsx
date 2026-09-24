'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../model/use-auth';

export function AppSessionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, isAuthenticated } = useAuth();

  const isPublicPage = pathname === '/login' || pathname === '/register';

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isPublicPage) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, isPublicPage, router]);

  if (isLoading && !isPublicPage) {
    return (
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-background/70 backdrop-blur-sm">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
