'use client';

import { useState, ReactNode } from 'react';
import { IPanelTab, SidebarPanelHeader } from './sidebar-panel-header';

interface SidebarPanelLayoutlProps<T extends string = string> {
  tabs: readonly IPanelTab<T>[];
  defaultTab: T;
  renderContent: Record<T, ReactNode>;
  onClose?: () => void;
  className?: string;
  showCloseButtonOnDesktop?: boolean;
}

export function SidebarPanelLayout<T extends string>({
  tabs,
  defaultTab,
  renderContent,
  onClose,
  className = '',
  showCloseButtonOnDesktop = false,
}: SidebarPanelLayoutlProps<T>) {
  const [activeTab, setActiveTab] = useState<T>(defaultTab);

  return (
    <div
      className={`flex flex-col h-full min-h-0 bg-card border rounded-xl overflow-hidden shadow-none ${className}`}
    >
      <SidebarPanelHeader
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onClose={onClose}
        showCloseButtonOnDesktop={showCloseButtonOnDesktop}
      />
      <div className="grow min-h-0 w-full flex flex-col overflow-y-auto">
        {renderContent[activeTab]}
      </div>
    </div>
  );
}
