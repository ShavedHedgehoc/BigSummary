'use client';

import { useMemo } from 'react';
import { SidebarPanelLayout } from '@/shared/ui';
import { HistoryPanel } from './history-panel';
import { ActionPanel } from './action-panel';
import { THistoryMutationContextProps } from '@/entities/history';
import { useIsMobile } from '@/shared/lib';
import { SIDE_PANEL_MODE_CONFIG } from '../model/side-panel.config';

export type TSidePanelContext = THistoryMutationContextProps & {
  onClose?: () => void;
  clearSelected?: () => void;
};

export type TSidePanelProps = TSidePanelContext & {
  className?: string;
};

export function SidePanel(props: TSidePanelProps) {
  const isMobile = useIsMobile();
  const { mode, row, onClose, className = '' } = props;
  const config = SIDE_PANEL_MODE_CONFIG[mode];
  const currentStatus = mode === 'admin_users' ? '' : row?.stateValue;

  const tabs = useMemo(() => {
    return config.getTabs(currentStatus, isMobile);
  }, [config, currentStatus, isMobile]);

  const renderContent = useMemo(() => {
    const content: Record<string, React.ReactNode> = {
      action: <ActionPanel {...props} />,
    };

    if (config.hasHistory) {
      content.history = <HistoryPanel {...props} />;
    }
    return content;
  }, [config.hasHistory, props]);

  const showCloseButtonOnDesktop = useMemo(() => config.showCloseButtonOnDesktop, [config]);

  if (config.requiresRow && !row) return null;

  const defaultTab = tabs[0]?.id;

  return (
    <SidebarPanelLayout
      tabs={tabs}
      defaultTab={defaultTab}
      className={className}
      onClose={onClose}
      renderContent={renderContent}
      showCloseButtonOnDesktop={showCloseButtonOnDesktop}
    />
  );
}
