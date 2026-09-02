'use client';

import { TriangleAlert } from 'lucide-react';

export function ServerFalldown() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <TriangleAlert className="h-10 w-10 animate-pulse text-primary" />
        <p className="text-sm font-medium ">Сервер недоступен</p>
      </div>
    </div>
  );
}
