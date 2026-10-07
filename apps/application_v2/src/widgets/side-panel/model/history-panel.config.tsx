import { AddHistoryButton, AddHistoryForm } from '@/features/add-history-godmode';
import { CancelHistoryButton } from '@/features/history-cancellation';
import { TApplicationDocDetailRowItem } from '@repo/schemas';
import { TSidePanelContext } from '../ui/side-panel';

interface IHistoryModeConfig {
  getTitle: (isAction: boolean) => string;
  hasSubheader: boolean;
  getActionButton: (
    props: TSidePanelContext,
    isAction: boolean,
    setIsAction: (v: boolean) => void,
  ) => React.ReactNode;
  getActionForm: (props: TSidePanelContext, setIsAction: (v: boolean) => void) => React.ReactNode;
}

export const HISTORY_PANEL_CONFIG: Record<
  Exclude<TSidePanelContext['mode'], 'upload_doc' | 'admin_users'>,
  IHistoryModeConfig
> = {
  planner: {
    getTitle: (isAction) => (isAction ? 'Добавление статуса' : 'История статусов'),
    hasSubheader: true,
    getActionButton: (props, isAction, setIsAction) => (
      <AddHistoryButton {...props} isAction={isAction} setIsAction={setIsAction} />
    ),
    getActionForm: (props, setIsAction) => (
      <AddHistoryForm
        row={props.row as TApplicationDocDetailRowItem}
        onSuccess={() => {
          setIsAction(false);
          props.clearSelected?.();
        }}
      />
    ),
  },
  laboratory_boils: {
    getTitle: () => 'История статусов',
    hasSubheader: true,
    getActionButton: (props) => <CancelHistoryButton {...props} />,
    getActionForm: () => null,
  },
  laboratory_products: {
    getTitle: () => 'История статусов',
    hasSubheader: true,
    getActionButton: (props) => <CancelHistoryButton {...props} />,
    getActionForm: () => null,
  },
  foreman: {
    getTitle: () => 'История статусов',
    hasSubheader: false,
    getActionButton: (props) => <CancelHistoryButton {...props} />,
    getActionForm: () => null,
  },
  dash: {
    getTitle: () => 'История статусов',
    hasSubheader: true,
    getActionButton: (props, isAction, setIsAction) => (
      <AddHistoryButton {...props} isAction={isAction} setIsAction={setIsAction} />
    ),
    getActionForm: (props, setIsAction) => (
      <AddHistoryForm
        row={props.row as TApplicationDocDetailRowItem}
        onSuccess={() => {
          setIsAction(false);
          props.clearSelected?.();
        }}
      />
    ),
  },
};
