'use client';

import { cn } from '@/shared/lib';
import { Dialog, DialogDescription, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui';

interface ModalLayoutProps {
  title: string;
  description: string;
  isOpen: boolean;
  onOpenChange: (val: boolean) => void;
  className?: string;
  children: React.ReactNode;
  showClose?: boolean;
}

export function ModalLayout({
  title,
  description,
  isOpen,
  onOpenChange,
  className,
  children,
  showClose = false,
}: ModalLayoutProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'sm:max-w-lg',
          'p-0 border-none bg-transparent shadow-none overflow-hidden',
          className,
        )}
        showCloseButton={showClose}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
