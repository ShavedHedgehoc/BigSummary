'use client';

import { useMemo } from 'react';
import { SidebarPanelLayout } from '@/shared/ui';
import { HistoryPanel } from './history-panel';
import { ActionPanel } from './action-panel';
import { THistorySidePanelContext } from '@/entities/history';

export type TSidePanelProps = THistorySidePanelContext & {
  className?: string;
};

export function SidePanel(props: TSidePanelProps) {
  const { mode, row, onClose, className = '' } = props;

  const currentStatus = row?.stateValue;
  const tabs = useMemo(() => {
    const uploadTab = { id: 'action', label: 'Загрузка данных' } as const;
    const historyTab = { id: 'history', label: 'История статусов' } as const;
    if (mode === 'upload_doc') {
      return [uploadTab];
    }
    if (!currentStatus || currentStatus === '-') {
      return [historyTab];
    }
    if (mode === 'laboratory_products' && currentStatus === 'product_fail') {
      return [historyTab];
    }
    if (mode === 'planner') {
      return [{ id: 'action', label: 'Редактирование' }, historyTab] as const;
    }
    const actionLabel = mode === 'foreman' ? 'Фасовка' : 'Решение лаборатории';
    return [{ id: 'action', label: actionLabel }, historyTab] as const;
  }, [currentStatus, mode]);

  if (mode !== 'upload_doc' && !row) return null;

  const defaultTab = tabs[0].id;

  const renderContent: Record<string, React.ReactNode> = {
    action: <ActionPanel {...props} />,
  };

  if (mode !== 'upload_doc') {
    renderContent.history = <HistoryPanel {...props} />;
  }

  return (
    <SidebarPanelLayout
      tabs={tabs}
      defaultTab={defaultTab}
      className={className}
      onClose={onClose}
      renderContent={renderContent}
    />
  );
}
