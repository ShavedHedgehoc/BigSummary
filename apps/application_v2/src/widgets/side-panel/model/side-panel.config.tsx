import { TSidePanelProps } from '../ui/side-panel';

interface ISidePanelTab {
  id: 'action' | 'history';
  label: string;
}

const TABS = {
  UPLOAD: { id: 'action', label: 'Загрузка данных' },
  USER: { id: 'action', label: 'Пользователь' },
  HISTORY: { id: 'history', label: 'История статусов' },
  EDIT: { id: 'action', label: 'Редактирование' },
} as const;

interface IModeStrategy {
  requiresRow: boolean;
  getTabs: (status: string | null | undefined, isMobile: boolean) => ISidePanelTab[];
  hasHistory: boolean;
  showCloseButtonOnDesktop: boolean;
}

export const SIDE_PANEL_MODE_CONFIG: Record<TSidePanelProps['mode'], IModeStrategy> = {
  dash: {
    requiresRow: true,
    hasHistory: true,
    getTabs: () => [TABS.HISTORY],
    showCloseButtonOnDesktop: true,
  },
  upload_doc: {
    requiresRow: false,
    hasHistory: false,
    getTabs: () => [TABS.UPLOAD],
    showCloseButtonOnDesktop: false,
  },
  admin_users: {
    requiresRow: false,
    hasHistory: false,
    getTabs: () => [TABS.USER],
    showCloseButtonOnDesktop: false,
  },
  planner: {
    requiresRow: true,
    hasHistory: true,
    getTabs: () => [TABS.EDIT, TABS.HISTORY],
    showCloseButtonOnDesktop: false,
  },
  laboratory_products: {
    requiresRow: true,
    hasHistory: true,
    getTabs: (status, isMobile) => {
      if (status === 'product_fail' || !status || status === '-') return [TABS.HISTORY];
      return [{ id: 'action', label: isMobile ? 'Решение' : 'Решение лаборатории' }, TABS.HISTORY];
    },
    showCloseButtonOnDesktop: false,
  },
  laboratory_boils: {
    requiresRow: true,
    hasHistory: true,
    getTabs: (status, isMobile) => {
      if (status === 'base_fail' || !status || status === '-') return [TABS.HISTORY];
      return [{ id: 'action', label: isMobile ? 'Решение' : 'Решение лаборатории' }, TABS.HISTORY];
    },
    showCloseButtonOnDesktop: false,
  },
  foreman: {
    requiresRow: true,
    hasHistory: true,
    getTabs: (status) => {
      if (!status || status === '-') return [TABS.HISTORY];
      return [{ id: 'action', label: 'Фасовка' }, TABS.HISTORY];
    },
    showCloseButtonOnDesktop: false,
  },
};
