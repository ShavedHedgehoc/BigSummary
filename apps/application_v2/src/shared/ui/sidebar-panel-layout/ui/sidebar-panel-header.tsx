import { Button } from '@/shared/ui';
import { X } from 'lucide-react';

export interface IPanelTab<T extends string = string> {
  id: T;
  label: string;
}

interface SideBarPanelHeaderProps<T extends string = string> {
  tabs: readonly IPanelTab<T>[];
  activeTab: T;
  onTabChange: (tabId: T) => void;
  onClose?: () => void;
}

export function SidebarPanelHeader<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  onClose,
}: SideBarPanelHeaderProps<T>) {
  return (
    <div className="flex border-b bg-muted/20 p-1 gap-1 shrink-0 items-center w-full px-4 md:px-6 py-2 md:py-4">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? 'secondary' : 'ghost'}
          size="sm"
          className="flex-1 text-xs h-8 font-medium"
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </Button>
      ))}
      {onClose && (
        <Button
          variant="ghost"
          size="sm"
          className="text-xs h-8 font-medium text-destructive hover:bg-destructive/10 px-3 @min-6xl/main:hidden flex items-center shrink-0"
          onClick={onClose}
        >
          <X className="w-3.5 h-3.5" />
        </Button>
      )}
    </div>
  );
}
