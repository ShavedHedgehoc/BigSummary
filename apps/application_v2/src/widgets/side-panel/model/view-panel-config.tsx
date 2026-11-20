import {
  ClearExcludedProductsButton,
  ExcludedProductsTable,
} from '@/features/view-excluded-products';
import { TSidePanelContext } from '../ui/side-panel';
import { EmployeeForm } from '@/features/process-employee';

interface IViewModeConfig {
  getTitle: () => string | null;
  hasSubheader: boolean;
  isHasPadding: boolean;
  renderContent: (props: TSidePanelContext) => React.ReactNode;
  renderButton: () => React.ReactNode;
}

export const VIEW_PANEL_CONFIG: Partial<Record<TSidePanelContext['mode'], IViewModeConfig>> = {
  wght_report: {
    getTitle: () => null,
    hasSubheader: true,
    isHasPadding: false,
    renderContent: () => <ExcludedProductsTable />,
    renderButton: () => <ClearExcludedProductsButton />,
  },
  employees: {
    getTitle: () => null,
    hasSubheader: false,
    isHasPadding: true,
    renderContent: () => <EmployeeForm mode={'create'} />,
    renderButton: () => null,
  },
};
