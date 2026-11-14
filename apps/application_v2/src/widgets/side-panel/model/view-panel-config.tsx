import { TSidePanelContext } from '../ui/side-panel';

interface IViewModeConfig {
  getTitle: (isAction: boolean) => string | null;
  hasSubheader: boolean;
  getActionButton: (
    props: TSidePanelContext,
    isAction: boolean,
    setIsAction: (v: boolean) => void,
  ) => React.ReactNode;
  getActionForm: (props: TSidePanelContext, setIsAction: (v: boolean) => void) => React.ReactNode;
}

export const VIEW_PANEL_CONFIG: Record<
  Exclude<
    TSidePanelContext['mode'],
    | 'admin_users'
    | 'conveyors'
    | 'planner'
    | 'foreman'
    | 'laboratory_boils'
    | 'laboratory_products'
    | 'dash'
    | 'can_dash'
    | 'upload_doc'
  >,
  IViewModeConfig
> = {
  wght_report: {
    getTitle: () => null,
    hasSubheader: true,
    getActionButton: () => null,
    getActionForm: () => null,
  },
};
