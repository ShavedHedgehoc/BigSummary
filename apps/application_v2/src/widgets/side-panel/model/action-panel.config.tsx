import { FormSubheader } from '@/entities/history';
import {
  TApplicationDocDetailRowItem,
  TApplicationBoilItem,
  TApplicationPlantListResponse,
  TApplicationUserItem,
} from '@repo/schemas';
import { EditDocRowForm } from '@/features/edit-doc-row';
import { UploadDocForm } from '@/features/upload-doc';
import { ChangeStateForm } from '@/features/change-state-form';
import { DeleteDocRowButton } from '@/features/delete-doc-row';
import { CancelHistoryButton } from '@/features/history-cancellation';
import { TSidePanelContext } from '../ui/side-panel';
import { DeleteUserButton } from '@/features/delete-user';

interface IActionModeConfig {
  requiresRow: boolean;
  headerTitle: string | null;
  getSubheader: (props: TSidePanelContext) => React.ReactNode;
  renderForm: (
    props: TSidePanelContext,
    plantData: TApplicationPlantListResponse,
  ) => React.ReactNode;
  renderButton: (props: TSidePanelContext) => React.ReactNode;
}

export const ACTION_PANEL_CONFIG: Record<TSidePanelContext['mode'], IActionModeConfig> = {
  upload_doc: {
    requiresRow: false,
    headerTitle: null,
    getSubheader: () => null,
    renderForm: (_, plantData) => <UploadDocForm plantData={plantData} />,
    renderButton: () => null,
  },
  admin_users: {
    requiresRow: true,
    headerTitle: null,
    getSubheader: () => null,
    renderForm: () => <></>,
    renderButton: (props) => (
      <DeleteUserButton row={props.row as TApplicationUserItem} onSuccess={props.clearSelected} />
    ),
  },
  planner: {
    requiresRow: true,
    headerTitle: 'Редактирование строки',
    getSubheader: (props) =>
      props.row ? <FormSubheader row={props.row as TApplicationDocDetailRowItem} /> : null,
    renderForm: (props) => <EditDocRowForm row={props.row as TApplicationDocDetailRowItem} />,
    renderButton: (props) => (
      <DeleteDocRowButton
        row={props.row as TApplicationDocDetailRowItem}
        onSuccess={props.clearSelected}
      />
    ),
  },
  foreman: {
    requiresRow: true,
    headerTitle: 'Управление фасовкой',
    getSubheader: (props) =>
      props.row ? <FormSubheader row={props.row as TApplicationDocDetailRowItem} /> : null,
    renderForm: (props) => <ChangeStateForm {...props} />,
    renderButton: (props) => <CancelHistoryButton {...props} />,
  },
  laboratory_boils: {
    requiresRow: true,
    headerTitle: 'Решение лаборатории',
    getSubheader: (props) =>
      props.row ? <FormSubheader row={props.row as TApplicationBoilItem} /> : null,
    renderForm: (props) => <ChangeStateForm {...props} />,
    renderButton: (props) => <CancelHistoryButton {...props} />,
  },
  laboratory_products: {
    requiresRow: true,
    headerTitle: 'Решение лаборатории',
    getSubheader: (props) =>
      props.row ? <FormSubheader row={props.row as TApplicationDocDetailRowItem} /> : null,
    renderForm: (props) => <ChangeStateForm {...props} />,
    renderButton: (props) => <CancelHistoryButton {...props} />,
  },
  dash: {
    requiresRow: false,
    headerTitle: null,
    getSubheader: () => null,
    renderForm: () => null,
    renderButton: () => null,
  },
};
