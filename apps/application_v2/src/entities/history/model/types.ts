import {
  TApplicationBoilItem,
  TApplicationDocDetailRowItem,
  TApplicationUserItem,
} from '@repo/schemas';

type TBoilHistoryType = 'base_continue' | 'base_correct' | 'plug_pass' | 'base_fail' | 'base_check';
type TProductHistoryType = 'product_pass' | 'product_fail' | 'product_check';
type TForemanHistoryType = 'product_in_progress' | 'product_finished';
type TPlannerHistoryType = 'product_in_progress' | 'product_finished';

export type THistoryMutationContextProps =
  | {
      mode: 'dash';
      row: TApplicationDocDetailRowItem | undefined;
      onChange?: never;
    }
  | {
      mode: 'planner';
      row: TApplicationDocDetailRowItem | undefined;
      onChange?: (value: TPlannerHistoryType) => void;
    }
  | {
      mode: 'upload_doc';
      row?: never;
      onChange?: never;
    }
  | {
      mode: 'admin_users';
      row: TApplicationUserItem | undefined;
      onChange?: never;
    }
  | {
      mode: 'laboratory_boils';
      row: TApplicationBoilItem | undefined;
      onChange?: (value: TBoilHistoryType) => void;
    }
  | {
      mode: 'laboratory_products';
      row: TApplicationDocDetailRowItem | undefined;
      onChange?: (value: TProductHistoryType) => void;
    }
  | {
      mode: 'foreman';
      row: TApplicationDocDetailRowItem | undefined;
      onChange?: (value: TForemanHistoryType) => void;
    };
