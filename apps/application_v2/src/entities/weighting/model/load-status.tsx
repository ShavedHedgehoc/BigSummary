'use client';

import { cn, useIsMobile } from '@/shared/lib';
import { TApplicationTraceWeightingDetailItem } from '@repo/schemas';

import { PackageCheck, PackageX } from 'lucide-react';

interface TLoadStatusProps {
  item: TApplicationTraceWeightingDetailItem;
}

export function LoadStatus({ item }: TLoadStatusProps) {
  const isMobile = useIsMobile();

  const isNotLoading = !item.loadingDate;

  let statusConfig = {
    bg: 'text-status-success/50',
    iconColor: 'text-status-success',
    icon: PackageCheck,
  };

  if (isNotLoading) {
    statusConfig = {
      bg: 'text-status-fail/50',
      iconColor: 'text-status-fail',
      icon: PackageX,
    };
  }

  const Icon = statusConfig.icon;

  return (
    <div className="flex justify-center">
      <Icon className={cn(isMobile ? 'h-4 w-4' : 'h-3.5 w-3.5', statusConfig.iconColor)} />
    </div>
  );
}
