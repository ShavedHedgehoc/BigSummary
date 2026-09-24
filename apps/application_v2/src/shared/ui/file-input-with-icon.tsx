'use client';
import * as React from 'react';
import { Folder } from 'lucide-react'; // Добавили иконку файла
import { Input } from '@/shared/ui';
import { cn } from '@/shared/lib';

export interface FileInputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  accept?: string;
}

export const FileInputWithIcon = React.forwardRef<HTMLInputElement, FileInputWithIconProps>(
  ({ className, onChange, ...props }, ref) => {
    const internalRef = React.useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = React.useState<string | null>(null);

    React.useImperativeHandle(ref, () => ({
      ...internalRef.current!,
      set value(v: string) {
        if (v === '') setFileName(null);
        if (internalRef.current) internalRef.current.value = v;
      },
      get value() {
        return internalRef.current?.value || '';
      },
      click: () => internalRef.current?.click(),
    }));

    const handleIconClick = () => internalRef.current?.click();
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      setFileName(file ? file.name : null);
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className={cn('flex flex-col gap-3', className)}>
        <div className="flex flex-col items-left gap-3">
          <div
            onClick={handleIconClick}
            className={cn(
              'h-8 w-full flex items-center justify-between pl-3 pr-2 rounded-md transition-colors border border-input bg-background! cursor-pointer shadow-none select-none',
              'hover:bg-accent hover:text-accent-foreground',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            )}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleIconClick()}
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Folder className="h-4 w-4 shrink-0 opacity-60 text-muted-foreground" />
              <span className="text-muted-foreground font-medium shrink-0 text-xs"></span>

              <div className="h-4 w-px bg-border shrink-0 mx-0.5" />

              <div className="flex items-center min-w-0 flex-1">
                {!fileName ? (
                  <span className="text-muted-foreground/40 font-normal truncate text-xs">
                    Не выбрано
                  </span>
                ) : (
                  <span className="text-foreground font-normal truncate text-xs">{fileName}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <Input
          {...props}
          type="file"
          ref={internalRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    );
  },
);
FileInputWithIcon.displayName = 'FileInputWithIcon';
