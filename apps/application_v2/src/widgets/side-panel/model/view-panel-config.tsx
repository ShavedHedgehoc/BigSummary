import {
  ClearExcludedProductsButton,
  ExcludedProductsTable,
} from '@/features/view-excluded-products';
import { TSidePanelContext } from '../ui/side-panel';

interface IViewModeConfig {
  getTitle: (isAction: boolean) => string | null;
  hasSubheader: boolean;
  renderContent: (props: TSidePanelContext) => React.ReactNode;
  renderButton: () => React.ReactNode;
  getActionForm: (props: TSidePanelContext, setIsAction: (v: boolean) => void) => React.ReactNode;
}

export const VIEW_PANEL_CONFIG: Partial<Record<TSidePanelContext['mode'], IViewModeConfig>> = {
  wght_report: {
    getTitle: () => null,
    hasSubheader: true,
    renderContent: () => <ExcludedProductsTable />,
    renderButton: () => <ClearExcludedProductsButton />,
    getActionForm: () => null,
  },
};
